import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { TabBar } from 'antd-mobile';

import Explore from '../ExplorePage';
import Messages from '../MessagesPage';
import Personal from '../PersonalPage';
import StyledContainer from './StyledContainer';
import { makeSelectUnreadAll } from './selectors';

function Home({ messageBadgeNum }) {
  const [selectedTab, setSelectedTab] = useState('explore');
  const list = [
    { name: 'Explore', component: <Explore /> },
    { name: 'Messages', component: <Messages />, badge: messageBadgeNum },
    { name: 'Personal', component: <Personal /> },
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
      </TabBar.Item>
    );
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

Home.propTypes = {
  messageBadgeNum: PropTypes.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  messageBadgeNum: makeSelectUnreadAll(),
});

export default connect(mapStateToProps, null)(Home);
