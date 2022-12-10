import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Icon } from "antd-mobile";

import WithNavBar from "Components/WithNavBar";
import { reqReadMessage } from "../../redux/actions";
import InputBoard from "./InputBoard";
import ChatMsgList from "./ChatMsgList";

function ChatPage({ users, chatMsgs, from, match: { params: { userid: to } }, updateRead, history }) {
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);

    return () => {
      updateRead({ from, to });
    }
  })

  if (Object.keys(users).length === 0) {
    return null;
  }

  // chat_id, same created way as in socketIO in server
  const chat_id = [from, to].sort().join("_");
  const { username: talkTo, headPhoto: talkToPhoto } = users[to];
  // filter the chatMsgs bewtween two people from all the chatMsgs
  chatMsgs = chatMsgs.filter((m) => m.chat_id === chat_id).sort((a, b) => a.created_time - b.created_time);
  
  return (
    <div id="chat-page">
      <WithNavBar
        title={talkTo}
        icon={<Icon type="left" />}
        onLeftClick={() => history.goBack()}
      >
        <ChatMsgList chatMsgs={chatMsgs} from={from} talkToPhoto={talkToPhoto} />
        <InputBoard from={from} to={to} />
      </WithNavBar>
    </div>
  );
}

ChatPage.propTypes = {
  users: PropTypes.objectOf(PropTypes.shape({
    username: PropTypes.string,
    headPhoto: PropTypes.string,
    
  })),
  chatMsgs: PropTypes.arrayOf(
    PropTypes.shape({
      isRead: PropTypes.bool,
      _id: PropTypes.string,
      from: PropTypes.string,
      to: PropTypes.string,
      content: PropTypes.string,
    })),
  from: PropTypes.string,
  match: PropTypes.shape({
    params: PropTypes.shape({
      to: PropTypes.string
    })
  }),
  updateRead: PropTypes.func,
  history: PropTypes.object,
}

const mapStateToProps = (state) => ({
  users: state.messages.users,
  chatMsgs: state.messages.chatMsgs,
  from: state.userData._id,
});

const mapDispatchToProps = {
  updateRead: reqReadMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
