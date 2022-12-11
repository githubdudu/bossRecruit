import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Route,
  Redirect,
} from "react-router-dom";
import { Toast } from "antd-mobile";
import Cookies from "js-cookie";

import BossInfo from "../boss-info/Boss-info";
import CandiInfo from "../candi-info/Candi-info";

import { fetchUserData } from "../../redux/actions";

function AuthRoute({
  _id,
  userType,
  headPhoto,
  getUserData,
  ...props
}) {
  const userid = Cookies.get("userid");

  useEffect(() => {
    if (userid && !_id) {
      // 发送异步请求, 获取user
      console.log('发送ajax请求获取user')
      getUserData();
    }
  }, [userid, _id, getUserData])

  // 没有登录 跳转登录
  if (!userid) {
    Toast.fail("Please Log In First", 1);
    return <Redirect to="/login" />;
  }
  // 没有信息，先render，再获取信息
  if (!_id) {
    return null;
  }

  // 没有头像，且除了以下两个设置头像页面之外的所有页面都需要 redirect 这俩界面
  if (!headPhoto) {
    if (userType === "Boss") {
      return <Route path="/bossinfo" component={BossInfo} ></Route>;
    } else {
      return <Route path="/candiinfo" component={CandiInfo} ></Route>;
    }
  }

  return (
    <Route {...props}></Route>
  );
}

const mapStateToProps = (state) => ({
  _id: state.userData._id,
  userType: state.userData.userType,
  headPhoto: state.userData.headPhoto,
});

const mapDispatchToProps = {
  getUserData: fetchUserData,
};

// just map _id, nothing more or less
export default connect(mapStateToProps, mapDispatchToProps)(AuthRoute);
