import PropTypes from 'prop-types'
import React from 'react'
import { Card, WhiteSpace } from "antd-mobile";
import { withRouter } from 'react-router-dom';


export const ExploreCard = ({
  _id,
  username,
  headPhoto,
  description,
  company,
  salary,
  position,
  history,
}) => {
  headPhoto = headPhoto ?? "头像1";
  let photo = null;
  try {
    photo = require(`../../assets/heads/${headPhoto}.png`).default;
  } catch (e) {
  }
  return (
    <div>
        <WhiteSpace size="sm" />
        <Card onClick={() => history.push(`/chat/${_id}`)}>
          <Card.Header thumb={photo} extra={<span>{username}</span>} />
          <Card.Body>
            <div>职位：{position || "无"}</div>
            <div>公司：{company || "无"}</div>
            <div>月薪：{salary || "无"}</div>
            <div>描述：{description || "无"}</div>
          </Card.Body>
        </Card>
        <WhiteSpace size="sm" />
      </div>
  )
}

ExploreCard.propTypes = {
  _id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  headPhoto: PropTypes.string,
  description: PropTypes.string,
  company: PropTypes.string,
  salary: PropTypes.string,
  position: PropTypes.string,
  history: PropTypes.object,
}

export default withRouter(ExploreCard);
