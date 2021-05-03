import React, { Component } from "react";
import {
  InputItem,
  List,
  Radio,
  WingBlank,
  WhiteSpace,
  Button,
  Flex,
  NoticeBar,
  Toast,
} from "antd-mobile";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import "./radio.css";

import Logo from "../../components/logo/Logo";
import { requestRegister, sendError } from "../../redux/actions";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      userPW: "",
      userPWAgain: "",
      userType: "Boss",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // handle two kind of inputs
  // one value is value from InputItem, another is a Object from Radio
  //
  handleInputChange(stateName, stateValue) {
    if (stateValue.target) {
      let isBossOptions = stateValue.target.value === "Boss";
      let checked = stateValue.target.checked
      stateValue = (checked && isBossOptions)? "Boss": "Candidate";
    }

    this.setState({
      [stateName]: stateValue,
    });
  }

  // submit the register data

  register = () => {
    // console.log(JSON.stringify(this.state));
    let { username, userPW, userPWAgain } = this.state; // some info from form
    let { requestRegister, sendError } = this.props; // two functions
    if (!username) {
      Toast.fail("Blank username", 1);
      return sendError("Blank username");
    } else if (!userPW) {
      Toast.fail("Blank password", 1);
      return sendError("Blank password");
    } else if (!userPWAgain) {
      Toast.fail("Blank password confirm", 1);
      return sendError("Blank password confirm");
    } else if (userPW !== userPWAgain) {
      Toast.fail("Passwords are not same", 1);
      return sendError("Passwords are not same");
    }

    requestRegister(this.state); // handle to axios
  };

  // jump to another route: login

  redirectToLogin = () => {
    this.props.history.replace("/login");
  };

  render() {
    const { errMsg, redirectUrl } = this.props;
    // if success, redirectUrl = "/" , according to API
    if (redirectUrl) {
      Toast.success("Register Success!", 2);
      return <Redirect to={redirectUrl} />;
    }

    return (
      <div>
        {/* use button instead of banner */}
        <Button type="primary">BOSS 直 聘</Button>

        {/* a big logo for app */}
        <Logo />

        {/* the form  */}
        <div>
          <WingBlank size="lg">
            <List>
              <WhiteSpace size="md" />

              {/* username */}
              <InputItem
                name="username"
                placeholder="Please type in name"
                onChange={(v) => this.handleInputChange("username", v)}
                // antd 组件竟然不受控，不写的时候依然显示，写了才受控
                value={this.state.username}
              >
                用户名
              </InputItem>
              <WhiteSpace size="md" />

              {/* userPW */}
              <InputItem
                name="userPW"
                type="password"
                placeholder="Please type in password"
                onChange={(v) => this.handleInputChange("userPW", v)}
              >
                密码
              </InputItem>
              <WhiteSpace size="md" />

              {/* userPWAgain */}
              <InputItem
                name="userPWAgain"
                type="password"
                placeholder="Please type in password again"
                onChange={(v) => this.handleInputChange("userPWAgain", v)}
              >
                确认密码
              </InputItem>
              <WhiteSpace size="md" />

              {/* userType:"Boss" ," Candidate" */}
              <List.Item>
                <Flex>
                  <Flex.Item>用户类型</Flex.Item>
                  <Flex.Item>
                    <Radio
                      className="my-radio"
                      name="userType"
                      value="Boss"
                      checked={this.state.userType ==="Boss"}
                      onChange={(v) => this.handleInputChange("userType", v)}
                    >
                      Boss
                    </Radio>
                  </Flex.Item>
                  <Radio
                    className="my-radio"
                    name="userType"
                    value="Candidate"
                    checked={this.state.userType === "Candidate"}
                    onChange={(v) => this.handleInputChange("userType", v)}
                  >
                    Candidate
                  </Radio>
                </Flex>
              </List.Item>

              {/* if there is an errMsg  */}
              {errMsg && <NoticeBar icon={null}>{errMsg}</NoticeBar>}

              <WhiteSpace size="xl" />
              <Button type="primary" onClick={this.register}>
                Register Now
              </Button>
              <Button onClick={this.redirectToLogin}>
                Already have an account click here
              </Button>
            </List>
          </WingBlank>
        </div>
      </div>
    );
  }
}

// only map two of userData, not all in video
const mapStateToProps = (state) => ({
  errMsg: state.userData.errMsg,
  redirectUrl: state.userData.redirectUrl,
});

const mapDispatchToProps = {
  requestRegister,
  sendError,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
