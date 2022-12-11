import React, { useState } from "react";
import PropTypes from 'prop-types';
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

import Logo from "Components/Logo";
import { requestLogin, sendError } from "../../redux/actions";

function Login({ errMsg, redirectUrl, history, submitForm, onFormError }) {
  const [forms, setForms] = useState({
    username: "",
    userPW: "",
  });

  // handle inputs
  function handleInputChange(stateName, stateValue) {
    setForms(prevState => ({
      ...prevState, [stateName]: stateValue,
    }));
  }

  // submit the login data
  function login() {
    let errInfo = null;
    if (!forms.username) {
      errInfo = "Blank username";
    } else if (!forms.userPW) {
      errInfo = "Blank password";
    }
    if (errInfo) {
      Toast.fail(errInfo, 1);
      onFormError(errInfo);
    } else {
      submitForm(forms); // handle to axios
    }
  };

  // jump to another route: register
  const redirectToRegister = () => {
    history.push("/register");
  };

  if (redirectUrl) {
    Toast.success("Login Success!", 2);
    history.push("/home");
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
              onChange={(v) => handleInputChange("username", v)}
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

            {/* if there is an errMsg  */}
            {errMsg && (
              <NoticeBar icon={null}>
                {errMsg}
              </NoticeBar>
            )}
            <WhiteSpace size="md" />

            <Button type="primary" onClick={login}>
              Log In
            </Button>
            <WhiteSpace size="sm" />
            <Button onClick={redirectToRegister}>
              Click here to register
            </Button>
          </List>
        </WingBlank>
      </div>
    </div>
  );
}

Login.propTypes = {
  errMsg: PropTypes.string,
  redirectUrl: PropTypes.string,
  submitForm: PropTypes.func.isRequired,
  onFormError: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  errMsg: state.userData.errMsg,
  redirectUrl: state.userData.redirectUrl,
});

const mapDispatchToProps = {
  submitForm: requestLogin,
  onFormError: sendError,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
