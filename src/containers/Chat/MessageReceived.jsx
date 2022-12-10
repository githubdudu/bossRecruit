import React from 'react';
import PropTypes from "prop-types";
import { List } from 'antd-mobile';

export default function MessageReceived({ content, photoName="头像1" }) {
  return (
    <List.Item
      thumb={require(`../../assets/heads/${photoName}.png`).default || null}
    >
      {content}
    </List.Item>
  )
}

MessageReceived.propTypes = {
  content: PropTypes.string,
  photoName: PropTypes.string,
}
