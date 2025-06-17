import React, { Component } from "react";
import { connect } from "react-redux";
import { NavBar, List, Badge } from "antd-mobile";
import { withRouter } from "react-router-dom";

class Messages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countUnread: {},
    };
  }

  counting() {
    const from = this.props._id;
    let { chatMsgs, users } = this.props.messages;
    if (Object.keys(users).length === 0) {
      return;
    }
    let totalUnreadCount = 0;
    // 先按照时间分组；再按照 chat_id 分组；每组只挑出最新的一个就可以
    // sort the chatMsg by time, bigger time put to ahead

    // do the unread count
    chatMsgs.reduce((sum, current) => {
      if (!current.isRead && from === current.to) {
        totalUnreadCount++;
      }
      return sum;
    }, {});
    this.props.upLoadUnread(totalUnreadCount);
  }

  componentDidMount() {
    this.counting();
  }

  componentDidUpdate() {
    this.counting();
  }

  render() {
    const from = this.props._id;

    const { chatMsgs, users } = this.props.messages;
    if (Object.keys(users).length === 0) {
      return null;
    }
    let chatMsgsLatest = {};
    // 先按照时间分组；再按照 chat_id 分组；每组只挑出最新的一个就可以
    // sort the chatMsg by time, bigger time put to ahead
    chatMsgs.sort((pre, next) => next.created_time - pre.created_time);

    // do the unread count
    let countUnread = chatMsgs.reduce((sum, current) => {
      if (!current.isRead && from === current.to) {
        sum[current.chat_id] = sum[current.chat_id]
          ? sum[current.chat_id] + 1
          : 1;
      }
      return sum;
    }, {});

    // console.log(countUnread);
    // a dynamic component for production
    const renderList2 = chatMsgs.map((m) => {
      if (!chatMsgsLatest[m.chat_id]) {
        chatMsgsLatest[m.chat_id] = m.chat_id;
        let to = from === m.from ? m.to : m.from;
        let { username, headPhoto } = users[to];
        let headPhotoUrl =
          require(`../../assets/heads/${headPhoto}.png`).default ?? null;
        //we use m.content, username, headPhoto,
        return (
          <List.Item
            key={m.chat_id}
            thumb={headPhotoUrl}
            className="null"
            arrow="horizontal"
            multipleLine
            extra={<Badge text={countUnread[m.chat_id]} />}
            onClick={() => this.props.history.push(`/chat/${to}`)}
          >
            {m.content}
            <List.Item.Brief>{username}</List.Item.Brief>
          </List.Item>
        );
      } else {
        return null;
      }
    });

    // a static component for test and deploy
    // const renderList = (
    //   <List.Item
    //     key="1"
    //     thumb={require(`../../assets/heads/头像1.png`).default}
    //     className="null"
    //     arrow="horizontal"
    //     multipleLine
    //     onClick={() => {}}
    //   >
    //     Latest content <List.Item.Brief>the guy you talked to</List.Item.Brief>
    //   </List.Item>
    // );
    return (
      <div>
        <NavBar
          type="primary"
          style={{
            position: "fixed",
            width: "100%",
            top: 0,
            zIndex: 5,
          }}
        >
          消息列表
        </NavBar>

        <List
          style={{
            marginBottom: "45px",
            marginTop: "45px",
          }}
        >
          {/* {renderList} */}
          {renderList2}
        </List>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  messages: state.messages,
  _id: state.userData._id,
});

const mapDispatchToProps = {};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Messages)
);
