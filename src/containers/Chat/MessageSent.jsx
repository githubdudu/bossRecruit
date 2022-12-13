import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd-mobile';
import './chat.css';

export default function MessageSent({ content }) {
  return (
    <List.Item className="chat-me" extra="我">
      {content}
    </List.Item>
  );
}

MessageSent.propTypes = {
  content: PropTypes.string,
};
