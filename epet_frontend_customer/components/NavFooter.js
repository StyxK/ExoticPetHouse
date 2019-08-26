import React, { Component } from "react";
import { Footer, FooterTab, Button, Icon, Text } from "native-base";
import { Actions } from "react-native-router-flux";

export default class NavFooter extends Component {
  render() {
    return (
      <Footer>
        <FooterTab style={{ backgroundColor: "#7A5032" }}>
          <Button Badge vertical onPress={this.goToHome}>
            <Icon name="search" style={{ color: "white" }} />
            <Text style={{ fontSize: 8, color: "white" }}>ค้นหาร้าน</Text>
          </Button>
          <Button Badge vertical onPress={this.goToMyPet}>
            <Icon name="paw" style={{ color: "white" }} />
            <Text style={{ fontSize: 8, color: "white" }}>สัตว์เลี้ยง</Text>
          </Button>
          <Button Badge vertical onPress={this.goToChat}>
            <Icon name="chatbubbles" style={{ color: "white" }} />
            <Text style={{ fontSize: 8, color: "white" }}>แชท</Text>
          </Button>
          <Button Badge vertical onPress={this.goToHistory}>
            <Icon name="list" style={{ color: "white" }} />
            <Text style={{ fontSize: 8, color: "white" }}>ประวัติ</Text>
          </Button>
          <Button Badge vertical onPress={this.goToProfile}>
            <Icon name="person" style={{ color: "white" }} />
            <Text style={{ fontSize: 8, color: "white" }}>โปรไฟล์</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }

  goToHome = () => {
    Actions.home();
  };

  goToMyPet = () => {
    Actions.myPet();
  };
  goToProfile = () => {
    Actions.profile();
  };
  goToHistory = () => {
    Actions.history();
  };
  goToChat = () => {
    Actions.chat();
  };
}
