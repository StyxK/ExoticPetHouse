import React, { Component } from "react";
import { Footer, FooterTab, Button, Icon, Text } from "native-base";
import { Actions } from "react-native-router-flux";
import theme from "../theme";

export default class NavFooter extends Component {
  render() {
    return (
      <Footer>
        <FooterTab style={{ backgroundColor: theme.primaryColor }}>
          <Button Badge vertical onPress={this.goToHome}>
            <Icon name="search" style={{ color: theme.primaryTextColor }} />
            <Text style={{ fontSize: 8, color: theme.primaryTextColor }}>ค้นหาร้าน</Text>
          </Button>
          <Button Badge vertical onPress={this.goToMyPet}>
            <Icon name="paw" style={{ color: theme.primaryTextColor }} />
            <Text style={{ fontSize: 8, color: theme.primaryTextColor }}>สัตว์เลี้ยง</Text>
          </Button>
          <Button Badge vertical onPress={this.goToChat}>
            <Icon name="chatbubbles" style={{ color: theme.primaryTextColor }} />
            <Text style={{ fontSize: 8, color: theme.primaryTextColor }}>แชท</Text>
          </Button>
          <Button Badge vertical onPress={this.goToHistory}>
            <Icon name="list" style={{ color: theme.primaryTextColor }} />
            <Text style={{ fontSize: 8, color: theme.primaryTextColor }}>ประวัติ</Text>
          </Button>
          <Button Badge vertical onPress={this.goToProfile}>
            <Icon name="person" style={{ color: theme.primaryTextColor }} />
            <Text style={{ fontSize: 8, color: theme.primaryTextColor }}>โปรไฟล์</Text>
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
