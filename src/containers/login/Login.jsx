import React, { Component } from "react";
import {
  InputItem,
  List,
  WingBlank,
  WhiteSpace,
  Button,
  NoticeBar,
  Toast,
} from "antd-mobile";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Logo from "../../components/logo/Logo";
import { requestLogin, sendError } from "../../redux/actions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      userPW: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // handle inputs

  handleInputChange(stateName, stateValue) {
    this.setState({
      [stateName]: stateValue,
    });
  }

  // submit the login data

  login = () => {
    // console.log(JSON.stringify(this.state));
    let { username, userPW } = this.state; // some info from form
    let { requestLogin, sendError } = this.props; // two functions
    if (!username) {
      Toast.fail("Blank username", 1);
      return sendError("Blank username");
    } else if (!userPW) {
      Toast.fail("Blank password", 1);
      return sendError("Blank password");
    }
    requestLogin(this.state); // handle to axios
  };

  // jump to another route: register

  redirectToRegister = () => {
    this.props.history.push("/register");
  };

  render() {
    const { errMsg, redirectUrl } = this.props.userData;
    if (redirectUrl) {
      Toast.success("Login Success!", 2);
      return <Redirect to={redirectUrl} />;
    }

    return (
      <div>
      
        {/* use button instead of NavBar */}
        <Button type="primary">BOSS 直 聘</Button>

        {/* a big logo for app */}
        <Logo />

        {/* the form  */}
        <div>
          <WingBlank size="lg">
            <List>
              <WhiteSpace size="md" />
              <InputItem
                name="username"
                placeholder="Please type in name"
                onChange={(v) => this.handleInputChange("username", v)}
                value={this.state.username}
              >
                用户名
              </InputItem>

              <WhiteSpace size="md" />
              <InputItem
                name="userPW"
                type="password"
                placeholder="Please type in password"
                onChange={(v) => this.handleInputChange("userPW", v)}
              >
                密码
              </InputItem>

              {/* if there is an errMsg  */}
              {errMsg && (
                <NoticeBar icon={null}>
                  {errMsg}
                </NoticeBar>
              )}
              <WhiteSpace size="md" />

              <Button type="primary" onClick={this.login}>
                Log In
              </Button>
              <WhiteSpace size="sm" />
              <Button onClick={this.redirectToRegister}>
                Click here to register
              </Button>
            </List>
          </WingBlank>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.userData,
});

const mapDispatchToProps = {
  requestLogin,
  sendError,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
