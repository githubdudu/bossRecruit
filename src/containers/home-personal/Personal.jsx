import React, { Component } from "react";
import { connect } from "react-redux";
import { NavBar, Result, List, WhiteSpace, Button, Modal } from "antd-mobile";
import Cookies from "js-cookie";

import { changeStateLogout } from "../../redux/actions";

class Personal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initHeadPhoto: "头像1",
    };
  }
  handleLogout = () => {
    const alertInstance = Modal.alert("退出登录", "确定退出吗？", [
      { text: "取消", onPress: () => console.log("cancel"), style: "default" },
      {
        text: "确定",
        onPress: () => {
          Cookies.remove("userid", { path: "" });
          this.props.changeStateLogout("logOUT!");
          //   this.props.history.replace("/login");
        },
      },
    ]);
    setTimeout(() => {
      alertInstance.close();
    }, 100000);
  };

  myImg = (src) => {
    let i = src ?? "头像1";
    // console.log(i);
    return (
      <img
        src={require(`../../assets/heads/${i}.png`).default}
        className="spe am-icon am-icon-md"
        alt="headPhoto"
        style={{ width: 60, height: 60 }}
      />
    );
  };

  componentDidMount() {
    // console.log("this.props.state.headPhoto", this.props.state.headPhoto);
    this.setState({
      initHeadPhoto: this.props.state.headPhoto,
    });
    // console.log("this.props.state.headPhoto", this.props.state.headPhoto);
  }

  render() {
    // console.log(this.props.state);
    const {
      username,
      userType,
      company,
      position,
      description,
      salary,
    } = this.props.state;

    return (
      <div>
        <NavBar type="primary">用户中心</NavBar>

        <Result
          img={this.myImg(this.state.initHeadPhoto)}
          title={username}
          message={company}
        />

        <List renderHeader={() => "相关信息"} className="my-list">
          <List.Item multipleLine>
            {userType && (
              <List.Item.Brief>用户类型: {userType} </List.Item.Brief>
            )}
            {position && <List.Item.Brief>职位: {position} </List.Item.Brief>}
            {description && (
              <List.Item.Brief>简介: {description} </List.Item.Brief>
            )}
            {salary && <List.Item.Brief>薪资: {salary} </List.Item.Brief>}
          </List.Item>
        </List>

        <WhiteSpace />
        <List>
          <Button type="warning" onClick={this.handleLogout}>
            退出登录
          </Button>
        </List>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  state: state.userData,
});

const mapStateToDispatch = {
  changeStateLogout,
};

export default connect(mapStateToProps, mapStateToDispatch)(Personal);
