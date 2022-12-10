import React from 'react'
import PropTypes from 'prop-types'

import List from "./StyledList";
import MessageReceived from "./MessageReceived";
import MessageSent from "./MessageSent";

function ChatMsgList({ chatMsgs, from, talkToPhoto}) {
  const renderChatMsgList = chatMsgs.map((m) => {
    // judge who to who
    if (from === m.from) {
      // sent by myself
      return (
        <MessageSent
          key={m._id}
          content={m.content}
        />
      );
    } else {
      //sent by other
      return (
        <MessageReceived
          key={m._id}
          content={m.content}
          photoName={talkToPhoto}
        />
      );
    }
  });
  return (
    <List>
      {renderChatMsgList}
    </List>
  )
}

ChatMsgList.propTypes = {
  chatMsgs: PropTypes.arrayOf(
    PropTypes.shape({
      isRead: PropTypes.bool,
      _id: PropTypes.string,
      from: PropTypes.string,
      to: PropTypes.string,
      content: PropTypes.string,
    })),
  from: PropTypes.string,
  to: PropTypes.string,
  talkToPhoto: PropTypes.string,
}

export default ChatMsgList;
