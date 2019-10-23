import mqtt from "@taoqf/react-native-mqtt";
import { Container } from "native-base";
import React, { Component } from "react";
import { RTCPeerConnection } from "react-native-webrtc";
import { Image, StyleSheet, Dimensions,WebView } from "react-native";
import HTML from "react-native-render-html";
const mqttServer = "ws://mqtt.furyform.com:9001";
const rtcConfig = {
  iceServers: [
    { urls: "stun:stun1.l.google.com:19302" },
    { urls: "stun:stun2.l.google.com:19302" }
  ]
};
export default class Camera extends Component {
  state = {
    cameraUrl: undefined,
    htmlContent: ""
  };
  componentWillMount() {
    this.mqttClient = undefined;
    this.deviceId = "ssssss";
    this.selfTopic = "userDevice/" + this.deviceId;
    this.storeId = "9cfdb7e5-d47e-4a9b-9d2a-433169532dd4";
    this.storeTopic = "store/" + this.storeId;
    this.rtcConnection = undefined;
    this.dataChannel = undefined;
    this.initMqtt();
  }

  initMqtt = async () => {
    this.mqttClient = mqtt.connect(mqttServer, { clean: true });
    this.mqttClient.on("connect", this.onMqttConnected);
    this.mqttClient.on("message", this.onMqttMessage);
  };

  onMqttConnected = async () => {
    this.mqttClient.subscribe(this.selfTopic);
    this.mqttClient.publish(
      this.storeTopic,
      JSON.stringify({
        type: "hello",
        message: "Hello",
        deviceId: this.deviceId,
        storeId: this.storeId
      })
    );
  };

  onMqttMessage = async (topic, message) => {
    console.log(topic, message.toString());
    if (topic === this.selfTopic) {
      const body = JSON.parse(message.toString());
      if (body.type === "hello") {
        this.initWebRtc();
      } else if (body.type === "desc") {
        this.onRemoteDescription(body.data);
      } else if (body.type === "candidate") {
        this.onAnswerCandidate(body.data);
      }
    }
  };

  initWebRtc = async () => {
    console.log("init");
    if (this.rtcConnection) {
      this.rtcConnection.close();
    }
    console.log("1");
    this.rtcConnection = new RTCPeerConnection(rtcConfig);
    console.log("2");
    this.rtcConnection.addEventListener("icecandidate", this.onIceCandidate);
    this.dataChannel = this.rtcConnection.createDataChannel("data_channel");
    this.dataChannel.onopen = function(event) {
      console.log("dataChannel.onopen", event);
    };
    this.dataChannel.onmessage = event => {
      var bytes = new Uint8Array(event.data);
      const cameraUrl = "data:image/png;base64," + encode(bytes);
      // console.log(this.image);
      if (this.webView) {
        this.webView.setNativeProps({
          html:  "<img src='" + cameraUrl + "'/>"
        });
      }
      // this.setState({
      //   cameraUrl,
      //   htmlContent: "<img src='" + cameraUrl + "'/>"
      // });
    };
    const desc = await this.rtcConnection.createOffer();
    this.rtcConnection.setLocalDescription(desc);
    console.log("get local desc", desc);
    this.send(this.storeTopic, {
      type: "desc",
      data: desc
    });
  };

  send = async (topic, data) => {
    this.mqttClient.publish(
      topic,
      JSON.stringify({
        ...data,
        deviceId: this.deviceId,
        storeId: this.storeId
      })
    );
  };

  onRemoteDescription = async desc => {
    console.log("onRemoteDescription");
    try {
      await this.rtcConnection.setRemoteDescription(desc);
    } catch (e) {
      console.log("Failed to  setRemoteDescription: ", e);
    }
  };

  onIceCandidate = async event => {
    console.log("onIceCandidate");
    const candidate = event.candidate;
    if (candidate === null) {
      return;
    }
    this.send(this.storeTopic, {
      type: "candidate",
      data: candidate
    });
  };

  onAnswerCandidate = async candidate => {
    console.log("onAnswerCandidate");
    try {
      await this.rtcConnection.addIceCandidate(candidate);
    } catch (e) {
      console.error("Failed to add Ice Candidate: ", e);
    }
  };

  componentWillUnmount() {
    this.disconnect();
  }

  disconnect = () => {
    if (this.mqttClient) {
      this.mqttClient.end();
    }
  };
  render() {
    const { cameraUrl, htmlContent } = this.state;
    return (
      <Container>
        {/* <HTML
          html={htmlContent}
          imagesMaxWidth={Dimensions.get("window").width}
        /> */}
        <WebView
          ref={c => {
            this.webView = c;
          }}
         html={htmlContent}
        />
      </Container>
    );
  }
}

function encode(input) {
  var keyStr =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var output = "";
  var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
  var i = 0;

  while (i < input.length) {
    chr1 = input[i++];
    chr2 = i < input.length ? input[i++] : Number.NaN; // Not sure if the index
    chr3 = i < input.length ? input[i++] : Number.NaN; // checks are needed here

    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;

    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }
    output +=
      keyStr.charAt(enc1) +
      keyStr.charAt(enc2) +
      keyStr.charAt(enc3) +
      keyStr.charAt(enc4);
  }
  return output;
}
