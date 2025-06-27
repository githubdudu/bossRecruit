import React, { Component } from "react";

import {TabBar } from "antd-mobile";

import Explore from "../home-explore/Explore";
import Messages from "../home-messages/Messages";
import Personal from "../home-personal/Personal";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: "explore",
      messageBadgeNum: 0,
    };
  }

  getBadgeNumFromMessages=(totalUnread)=>{
    this.setState({
      messageBadgeNum:totalUnread,
    })
  }

  renderContent1() {
    // there are two options, one page for boss to show candi,
    // one page for candi to show boss
    return <Explore/>;
  }

  renderContent2() {
    return <Messages upLoadUnread = {this.getBadgeNumFromMessages}/>;
  }

  renderContent3() {
    return <Personal />;
  }



  render() {
    return (
      <div>
        <div
          style={{
            position: "fixed",
            height: "100%",
            width: "100%",
            top: 0,
            display: "block",
          }}
        >
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"
            tabBarPosition="bottom"
            //   hidden={this.state.hidden}
          >
            {/* Explore */}
            <TabBar.Item
              icon={{ uri: require("./nav/candi.png").default }}
              
              selectedIcon={{
                uri: require("./nav/candi-selected.png").default,
              }}
              title="Explore"
              key="explore"
              selected={this.state.selectedTab === "explore"}
              onPress={() => {
                this.setState({
                  selectedTab: "explore",
                });
              }}
            >
              {this.renderContent1()}
            </TabBar.Item>

            {/* Messages */}
            <TabBar.Item
              icon={{ uri: require("./nav/messages.png").default }}
              selectedIcon={{
                uri: require("./nav/messages-selected.png").default,
              }}
              badge={this.state.messageBadgeNum}
              title="Messages"
              key="messages"
              selected={this.state.selectedTab === "messages"}
              onPress={() => {
                this.setState({
                  selectedTab: "messages",
                });
              }}
            >
              {this.renderContent2()}
            </TabBar.Item>

            {/* Personal */}
            <TabBar.Item
              icon={{ uri: require("./nav/personal.png").default }}
              selectedIcon={{
                uri: require("./nav/personal-selected.png").default,
              }}
              title="Personal"
              key="personal"
              selected={this.state.selectedTab === "personal"}
              onPress={() => {
                this.setState({
                  selectedTab: "personal",
                });
              }}
            >
              {this.renderContent3()}
            </TabBar.Item>
          </TabBar>
        </div>
      </div>
    );
  }
}
