import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { WingBlank, Card, WhiteSpace } from "antd-mobile";
import WithNavBar from "Components/WithNavBar";
import { withRouter } from 'react-router-dom';

import { asyncGetUserLists } from "../../redux/actions";

import { connect } from "react-redux";

function ExplorePage({ exploreLists, userType, asyncGetUserLists, history }) {
  const [exploreType, setExploreType] = useState(null);
  useEffect(() => {
    switch (userType) {
      case "Boss":
        setExploreType("Candidate");
        break;
      case "Candidate":
        setExploreType("Boss");
        break;
      default:
        setExploreType(null);
        break;
    }
  }, [userType])

  useEffect(() => {
    if (exploreType) {
      // a async function to fetch UserLists
      asyncGetUserLists(exploreType);
    }
  }, [exploreType])

  // without the data, no render
  if (!exploreLists) {
    return null;
  }

  const renderExploreLists = exploreLists.map(({
    _id,
    username,
    headPhoto,
    description,
    company,
    salary,
    position,
  }) => {

    headPhoto = headPhoto ?? "头像1";
    // use try in case the Photo module error break the app
    let photo = null;
    try {
      photo = require(`../../assets/heads/${headPhoto}.png`).default;
    } catch (e) {
    }

    // remember, these are all inside a function of map
    return (
      <div key={username}>
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
    );
  });

  return (
    <>
      <WithNavBar title={`${exploreType || "正在载入"} 列表`}>
        <WingBlank size="lg" >
          {renderExploreLists}
        </WingBlank>
      </WithNavBar>
    </>
  );
}

ExplorePage.propTypes = {
  exploreLists: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      headPhoto: PropTypes.string,
      description: PropTypes.string,
      company: PropTypes.string,
      salary: PropTypes.string,
      position: PropTypes.string,
    })).isRequired]),
  userType: PropTypes.string,
  asyncGetUserLists: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  exploreLists: state.userLists,
  userType: state.userData.userType,
});

const mapDispatchToProps = { asyncGetUserLists };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExplorePage));
