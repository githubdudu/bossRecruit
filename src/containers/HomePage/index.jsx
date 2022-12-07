import React, { useState } from "react";

import { TabBar } from "antd-mobile";

import Explore from "../home-explore/Explore";
import Messages from "../home-messages/Messages";
import Personal from "../home-personal/Personal";
import StyledContainer from "./StyledContainer";

export default function Home() {
  const [selectedTab, setSelectedTab] = useState("explore");
  const [messageBadgeNum, setMessageBadgeNum] = useState(0);

  const list = [
    { name: "Explore", component: <Explore />, },
    { name: "Messages", component: <Messages upLoadUnread={setMessageBadgeNum} />, badge: messageBadgeNum },
    { name: "Personal", component: <Personal /> }
  ];
  const ItemList = list.map(({ name, component, badge = 0 }) => {
    const lowerCase = name.toLowerCase();
    return (
      <TabBar.Item
        icon={{ uri: require(`../../assets/nav/${lowerCase}.png`).default }}
        selectedIcon={{
          uri: require(`../../assets/nav/${lowerCase}-selected.png`).default,
        }}
        badge={badge}
        title={name}
        key={lowerCase}
        selected={selectedTab === lowerCase}
        onPress={() => setSelectedTab(lowerCase)}
      >
        {component}
      </TabBar.Item>);
  });

  return (
    <StyledContainer>
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
        tabBarPosition="bottom"
      >
        {ItemList}
      </TabBar>
    </StyledContainer>
  );
}
