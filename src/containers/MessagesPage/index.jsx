import React from 'react';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, Badge } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

import WithNavBar from 'Components/WithNavBar';
import {
  selectID,
  selectUsers,
  makeSelectUnreadEach,
  makeSelectLastMsg,
} from './selectors';

function MessagesPage({ _id: from, users, unreadEach, lastMsg, history }) {
  if (Object.keys(users).length === 0) {
    return null;
  }

  const renderList = lastMsg.map((m) => {
    const to = from === m.from ? m.to : m.from;
    const { username, headPhoto } = users[to];
    const headPhotoUrl =
      require(`../../assets/heads/${headPhoto}.png`).default ?? null;
    //we use m.content, username, headPhoto,
    return (
      <List.Item
        key={m.chat_id}
        thumb={headPhotoUrl}
        className="null"
        arrow="horizontal"
        multipleLine
        extra={<Badge text={unreadEach[m.chat_id]} />}
        onClick={() => history.push(`/chat/${to}`)}
      >
        {m.content}
        <List.Item.Brief>{username}</List.Item.Brief>
      </List.Item>
    );
  });

  return (
    <div>
      <WithNavBar title="消息列表">
        <List>{renderList}</List>
      </WithNavBar>
    </div>
  );
}

MessagesPage.propTypes = {
  _id: PropTypes.string,
  users: PropTypes.shape({
    username: PropTypes.string,
    headPhoto: PropTypes.string,
  }),
  unreadEach: PropTypes.objectOf(PropTypes.number),
  lastMsg: PropTypes.arrayOf(
    PropTypes.shape({
      isRead: PropTypes.bool,
      _id: PropTypes.string,
      from: PropTypes.string,
      to: PropTypes.string,
      content: PropTypes.string,
      chat_id: PropTypes.string,
      created_time: PropTypes.number,
    }),
  ),
  history: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  _id: selectID,
  users: selectUsers,
  unreadEach: makeSelectUnreadEach(),
  lastMsg: makeSelectLastMsg(),
});

export default withRouter(connect(mapStateToProps, null)(MessagesPage));
