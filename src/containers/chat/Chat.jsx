import React, { Component } from "react";
import { connect } from "react-redux";
import { NavBar, List, InputItem, Grid, Icon } from "antd-mobile";
import QueueAnim from "rc-queue-anim";

import { sendMsg, reqReadMessage } from "../../redux/actions";
import "./chat.css";

const emojis = [
  "😀",
  "😁",
  "🤣",
  "😀",
  "😁",
  "🤣",
  "😀",
  "😁",
  "🤣",
  "😀",
  "😁",
  "🤣",
  "😀",
  "😁",
  "🤣",
  "😀",
  "😁",
  "🤣",
  "😀",
  "😁",
  "🤣",
  "😀",
  "😁",
  "🤣",
  "😁",
  "🤣",
  "😀",
  "😁",
  "🤣",
  "😀",
  "😁",
  "🤣",
  "😀",
  "😁",
  "🤣",
  "😁",
  "🤣",
  "😀",
  "😁",
  "🤣",
  "😀",
  "😁",
  "🤣",
  "😀",
  "😁",
  "🤣",
].map((emoji) => ({
  text: emoji,
}));
export class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentToBeSent: "",
    };
  }

  componentDidMount() {
    window.scrollTo(0, document.body.scrollHeight);

    // now we have read the message after mount
  }

  componentDidUpdate() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  componentWillUnmount() {
    const tarId = this.props.match.params.userid;
    const meId = this.props._id;
    // console.log({tarId, meId});
    this.props.reqReadMessage({ from: tarId, to: meId });
  }

  handleInputChange = (value) => {
    this.setState({
      contentToBeSent: value,
      isEmojiShow: false,
    });
  };

  handleSendMsg = () => {
    // from
    const from = this.props._id;
    // to
    const to = this.props.match.params.userid;
    // content
    const content = this.state.contentToBeSent.trim();

    // send
    if (content) {
      this.props.sendMsg({
        from,
        to,
        content,
      });
      // clear the input
      // console.log({from, to, content});
    }
    this.setState({
      contentToBeSent: "",
    });
  };

  toggleEmoji = () => {
    this.setState({
      isEmojiShow: !this.state.isEmojiShow,
    });
    if (!this.state.isEmojiShow) {
      setTimeout(() => window.dispatchEvent(new Event("resize")), 100);
    }
  };
  render() {
    // prepare the message from messages,
    // here is the origin structure:
    // messsages = {
    //   users: {
    //     _id: {
    //       username: "1",
    //       headPhoto: "2",
    //     },
    //     _id2: {
    //       username: "",
    //       headPhoto: "",
    //     },
    //   },
    //   chatMsg: [   //Array
    //     {
    //       isRead: false,
    //       _id: "6089952f9e9a754abc143d50",
    //       from: "60851a1491825647d45177f1",
    //       to: "60851bc1b27b6108bc152bc2",
    //       content: "wo buzhidao",
    //       chat_id: "60851a1491825647d45177f1_60851bc1b27b6108bc152bc2",
    //       created_time: 1619629359993,
    //     },
    //     {
    //       isRead: false,
    //       _id: "6089952f9e9a754abc143d50",
    //       from: "60851a1491825647d45177f1",
    //       to: "60851bc1b27b6108bc152bc2",
    //       content: "wo buzhidao",
    //       chat_id: "60851a1491825647d45177f1_60851bc1b27b6108bc152bc2",
    //       created_time: 1619629359993,
    //     },
    //     {},
    //   ],
    // };
    let { users, chatMsgs } = this.props.messages;

    // we can't render when there is no users and chatMsgs
    // 空对象{} 为true
    if (Object.keys(users).length === 0) {
      return null;
    }
    // from
    const from = this.props._id;
    // to
    const to = this.props.match.params.userid;
    // chat_id, same created way as in socketIO in server
    const chat_id = [from, to].sort().join("_");
    // the man you are talk to,his name and photo
    let toName = users[to].username;
    let toPhoto = users[to].headPhoto;
    let toPhotoUrl = "";
    let classNameToMe = "";
    let extraContent = "";
    // filter the chatMsgs bewtween two people from all the chatMsgs
    chatMsgs = chatMsgs.filter((m) => m.chat_id === chat_id);
    // sort the chatMsg
    chatMsgs.sort((a, b) => a.created_time - b.created_time);
    // map chatMsgs
    const renderList = chatMsgs.map((m) => {
      // judge who to who
      // sent by myself
      if (from === m.from) {
        toPhotoUrl = "";
        classNameToMe = "chat-me";
        extraContent = "我";
      } else {
        //sent by other
        toPhotoUrl =
          require(`../../assets/heads/${toPhoto}.png`).default || null;
        classNameToMe = "";
        extraContent = "";
      }
      return (
        <List.Item
          key={m._id}
          thumb={toPhotoUrl}
          className={classNameToMe}
          extra={extraContent}
        >
          {m.content}
        </List.Item>
      );
      //   m._id, m.from, m.to, m.content, m.read;
    });
    return (
      <div id="chat-page">
        <NavBar
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
          style={{
            position: "fixed",
            width: "100%",
            top: 0,
            zIndex: 5,
          }}
        >
          {toName}
        </NavBar>
          <List
            style={{
              marginBottom: "45px",
              marginTop: "45px",
            }}
          >
        <QueueAnim
          type={["alpha", "left"]}
          ease={["easeOutQuart", "easeInOutQuart"]}
          duration={1000}
        >
            {renderList}
        </QueueAnim>
          </List>
        {/* className="chat-input"> */}
        <div
          className="chat-input"
          style={{
            zIndex: "10",
          }}
        >
          <InputItem
            placeholder="请输入"
            value={this.state.contentToBeSent}
            onChange={(val) => this.handleInputChange(val)}
            onFocus={() => this.setState({ isEmojiShow: false })}
            // key event, origin InputItem has no enter support like <input>
            onKeyDown={(e) => {
              if (e.key === "Enter") return this.handleSendMsg();
            }}
            extra={
              <span>
                <span onClick={this.toggleEmoji} style={{ lineHeight: "1.2" }}>
                  😀
                </span>
                <span onClick={this.handleSendMsg}> 发送 </span>
              </span>
            }
          />
          {this.state.isEmojiShow && (
            <Grid
              data={emojis}
              columnNum={8}
              carouselMaxRow={4}
              isCarousel={true}
              onClick={(Item) => {
                this.setState({
                  contentToBeSent: this.state.contentToBeSent + Item.text,
                });
              }}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  messages: state.messages,
  _id: state.userData._id,
});

const mapDispatchToProps = {
  sendMsg,
  reqReadMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
