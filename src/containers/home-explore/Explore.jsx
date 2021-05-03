import React, { Component } from "react";
import { connect } from "react-redux";
import { NavBar, Card, WhiteSpace, WingBlank } from "antd-mobile";
import {withRouter} from 'react-router-dom';

import { asyncGetUserLists } from "../../redux/actions";

class Explore extends Component {


  componentDidMount() {
    // console.log("Didmount and get data, axios");
    // define userTypeNeeded: Boss => Candidate, Candidata => Boss
    let userTypeNeeded = null;
    switch (this.props.userType) {
      case "Boss":
        userTypeNeeded = "Candidate";
        break;
      case "Candidate":
        userTypeNeeded = "Boss";
        break;
      default:
        userTypeNeeded = null;
        break;
    }
    // console.log(userTypeNeeded);
    // a async function to fetch UserLists
    if (userTypeNeeded) {
      this.props.asyncGetUserLists(userTypeNeeded);
      // console.log("axios end", this.props.userLists);
    }
  }

  render() {

    // without the data, no render
    if (!this.props.userLists) {
      return null;
    }

    let renderLists = this.props.userLists.map((list, index) => {
      let {
        _id,
        username,
        headPhoto,
        description,
        company,
        salary,
        position,
      } = list;

      // headPhoto =  "头像1"
      headPhoto = headPhoto?? "头像1";
      let photo = null;

      // use try in case the Photo module error break the app
      try {
        photo = require(`../../assets/heads/${headPhoto}.png`).default;
      } catch (ex) {
        photo = null;
        console.log("Fail load headPhoto");
      }

      // remember, these are all inside a function of map
      return (
        <div key={username}>
          <WhiteSpace size="sm" />
          <Card onClick={()=>this.props.history.push(`/chat/${_id}`)}>
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

    // didn't use a state in case the value is not sync
    let userTypeNeeded = null;
    switch (this.props.userType) {
      case "Boss":
        userTypeNeeded = "Candidate";
        break;
      case "Candidate":
        userTypeNeeded = "Boss";
        break;
      default:
        userTypeNeeded = null;
        break;
    }


    // a NavBar, a renderlists,
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
          {userTypeNeeded || "正在载入"} 列表
        </NavBar>
        <WingBlank size="lg" style={{
          marginTop: "50px",
        }}>
          {renderLists}
        </WingBlank>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userLists: state.userLists,
  userType: state.userData.userType,
});

const mapDispatchToProps = { asyncGetUserLists };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Explore));
