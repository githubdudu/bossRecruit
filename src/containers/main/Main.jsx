import React, { Component } from "react";
import { connect } from "react-redux";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Toast } from "antd-mobile";
import Cookies from "js-cookie";

import BossInfo from "../boss-info/Boss-info";
import CandiInfo from "../candi-info/Candi-info";
import Home from "../home/Home";
import Chat from '../chat/Chat';
import Page404 from '../Page404/Page404';

import { fetchUserData } from "../../redux/actions";

class Main extends Component {
  componentDidMount() {
    const userid = Cookies.get("userid");
    const { _id} = this.props;
    if (userid && !_id) {
      // 发送异步请求, 获取user
      console.log('发送ajax请求获取user')
      this.props.getUserData();
    }
  }
  state=({
    submitted:false,
  })
  informMainSubmitted = ()=>{
    this.setState({
      submitted:true,
    })
  }

  render() {
    const userid = Cookies.get("userid");
    const { _id, userType, headPhoto, } = this.props;
    // console.log(userid, _id, userType, headPhoto,redirectUrl);
    // 没有登录 跳转登录
    if (!userid) {
      Toast.fail("Please Log In First", 1);
      return <Redirect to="/login" />;
    }
    // 没有信息，先render，再获取信息
    if (!_id) {
      // console.log("fetch info");
      return null;
    }

    if (
      this.props.location.pathname !== "/bossinfo" &&
      this.props.location.pathname !== "/candiinfo"
    ) {
      // 没有头像，且除了以下两个设置头像页面之外的所有页面都需要 redirect 这俩界面
      if (!headPhoto) {
        let Url = userType === "Boss" ? "/bossinfo" : "/candiinfo";
        // console.log("redirect to ", Url, "before render ele");
        return <Redirect to={Url} />;
      } 
      else if (this.props.location.pathname === "/") {
        return <Redirect to="/home" />;
      }

      if (this.props.redirectUrl === "/home"){
        this.props.getUserData();
        // console.log("getuserdata to clear url, now is", this.props.redirectUrl)
      }
      // console.log("about to /home", );
    }
    // if (this.props.location.pathname === "/" && !headPhoto) {
    //   let Url = userType === "Boss" ? "/bossinfo" : "/candiinfo";
    //   console.log("redirect to ", Url, 'when render main');
    //   return <Redirect to={Url} />;
    // }
    // console.log("about to render main's return,","headPhoto:", headPhoto||"null");
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/bossinfo" component={BossInfo} informMainSubmitted={this.informMainSubmitted}></Route>
            <Route path="/candiinfo" component={CandiInfo} informMainSubmitted={this.informMainSubmitted}></Route>
            <Route path="/chat/:userid" component={Chat}></Route>
            <Route path="/home" component={Home}></Route>
            <Route component={Page404}></Route>
            
            
          </Switch>
        </Router>
        {/* Main is here */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { username, userType, headPhoto, _id, } = state.userData;
  return {
    _id,
    username,
    userType,
    headPhoto,
  };
};

const mapStateToDispatch = {
  getUserData: fetchUserData,
};

// just map _id, nothing more or less
export default connect(mapStateToProps, mapStateToDispatch)(Main);
