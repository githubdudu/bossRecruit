import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { WingBlank } from "antd-mobile";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";

import { asyncGetUserLists } from "../../redux/actions";
import WithNavBar from "Components/WithNavBar";
import ExploreList from "./ExploreList";

function ExplorePage({ exploreLists, userType, asyncGetUserLists }) {
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
  }, [asyncGetUserLists, exploreType])

  // without the data, no render
  if (!exploreLists) {
    return null;
  }

  return (
    <>
      <WithNavBar title={`${exploreType || "正在载入"} 列表`}>
        <WingBlank size="lg" >
          <ExploreList userLists={exploreLists}/>
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
