import React, { useState } from "react";
import PropTypes from 'prop-types';
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

function Register({ errMsg, redirectUrl, history, submitForm, onFormError }) {
  const [forms, setForms] = useState({
    username: "",
    userPW: "",
    userPWAgain: "",
    userType: "Boss",
  });

  // handle inputs
  function handleInputChange(stateName, stateValue) {
    setForms(prevState => ({
      ...prevState, [stateName]: stateValue,
    }));
  }

  // submit the register data
  function register() {
    let errInfo = null;
    if (!forms.username) {
      errInfo = "Blank username";
    } else if (!forms.userPW) {
      errInfo = "Blank password";
    } else if (!forms.userPWAgain) {
      errInfo = "Blank password confirm";
    } else if (forms.userPW !== forms.userPWAgain) {
      errInfo = "Passwords are not same";
    }

    if(errInfo) {
      Toast.fail(errInfo, 1);
      onFormError(errInfo);
    } else {
      submitForm(forms); // handle to axios
    }
  };

  // jump to another route: login
  const redirectToLogin = () => {
    history.replace("/login");
  };

  // if success, redirectUrl = "/" , according to API
  if (redirectUrl) {
    Toast.success("Register Success!", 2);
    return <Redirect to={redirectUrl} />;
  }

  return (
    <div>
      {/* use button instead of banner */}
      <Button type="primary">BOSS Recruitment</Button>

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
              onChange={(v) => handleInputChange("username", v)}
              // antd Input 组件默认不受控
              value={forms.username}
            >
              用户名
            </InputItem>
            <WhiteSpace size="md" />

            <InputItem
              name="userPW"
              type="password"
              placeholder="Please type in password"
              onChange={(v) => handleInputChange("userPW", v)}
              value={forms.userPW}
            >
              密码
            </InputItem>
            <WhiteSpace size="md" />

            <InputItem
              name="userPWAgain"
              type="password"
              placeholder="Please type in password again"
              onChange={(v) => handleInputChange("userPWAgain", v)}
              value={forms.userPWAgain}
            >
              确认密码
            </InputItem>
            <WhiteSpace size="md" />

            {/* userType:"Boss" ," Candidate" */}
            <List.Item>
              <Flex>
                <Flex.Item>用户类型</Flex.Item>
                <Flex.Item flex="0.5">
                  <Radio
                    className="my-radio"
                    name="userType"
                    value="Boss"
                    checked={forms.userType === "Boss"}
                    onChange={() => handleInputChange("userType", "Boss")}
                  >
                    Boss
                  </Radio>
                </Flex.Item>

                <Radio
                  className="my-radio"
                  name="userType"
                  value="Candidate"
                  checked={forms.userType === "Candidate"}
                  onChange={() => handleInputChange("userType", "Candidate")}
                >
                  Candidate
                </Radio>
              </Flex>
            </List.Item>

            {/* if there is an errMsg  */}
            {errMsg && <NoticeBar icon={null}>{errMsg}</NoticeBar>}

            <WhiteSpace size="md" />
            <Button type="primary" onClick={register}>
              Register Now
            </Button>
            <WhiteSpace size="sm" />
            <Button onClick={redirectToLogin}>
              Already have an account click here
            </Button>
          </List>
        </WingBlank>
      </div>
    </div>
  );
}

Register.propTypes = {
  errMsg: PropTypes.string,
  redirectUrl: PropTypes.string,
  submitForm: PropTypes.func.isRequired,
  onFormError: PropTypes.func.isRequired,
}

// only map two of userData, not all in video
const mapStateToProps = (state) => ({
  errMsg: state.userData.errMsg,
  redirectUrl: state.userData.redirectUrl,
});

const mapDispatchToProps = {
  submitForm: requestRegister,
  onFormError: sendError,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
