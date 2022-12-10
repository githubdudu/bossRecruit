import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { InputItem, Grid } from "antd-mobile";

import { sendMsg } from "../../redux/actions";
import "./chat.css";
import InputContainer from "./InputContainer";

const emojis = ["😀", "😁", "🤣", "😀", "😁", "🤣", "😀", "😁", "🤣", "😀", "😁", "🤣", "😀", "😁", "🤣", "😀", "😁", "🤣", "😀", "😁", "🤣", "😀", "😁", "🤣", "😁", "🤣", "😀", "😁", "🤣", "😀", "😁", "🤣", "😀", "😁", "🤣", "😁", "🤣", "😀", "😁", "🤣", "😀", "😁", "🤣", "😀", "😁", "🤣",
].map((emoji) => ({
  text: emoji,
}));

function InputBoard({ from, to, sendMsg }) {
  const [inputText, setInputText] = useState("");
  const [isEmojiShown, setIsEmojiShown] = useState(false);

  const onInputChange = (value) => {
    setInputText(value);
    setIsEmojiShown(false);
  };

  const onSend = () => {
    const content = inputText.trim();
    if (content) {
      sendMsg({ from, to, content, });
    }
    setInputText("");
  };

  const toggleEmojiPanel = () => {
    setIsEmojiShown(!isEmojiShown);
    if (!isEmojiShown) {
      setTimeout(() => window.dispatchEvent(new Event("resize")), 100);
    }
  };

  return (
    <InputContainer>
      <InputItem
        placeholder="请输入"
        value={inputText}
        onChange={(val) => onInputChange(val)}
        onFocus={() => setIsEmojiShown(false)}
        // key event. Origin InputItem has no enter support like <input>
        onKeyDown={(e) => {
          if (e.key === "Enter") return onSend();
        }}
        extra={
          <span>
            <span onClick={toggleEmojiPanel} style={{ lineHeight: "1.2" }}>
              😀
            </span>
            <span onClick={onSend}> 发送 </span>
          </span>
        }
      />
      {isEmojiShown && (
        <Grid
          data={emojis}
          columnNum={8}
          carouselMaxRow={4}
          isCarousel={true}
          onClick={(Item) => { setInputText(inputText + Item.text) }}
        />
      )}
    </InputContainer>
  );
}

InputBoard.propTypes = {
  from: PropTypes.string,
  to: PropTypes.string,
  sendMsg: PropTypes.func,
}

const mapDispatchToProps = {
  sendMsg,
};

export default connect(null, mapDispatchToProps)(InputBoard);
