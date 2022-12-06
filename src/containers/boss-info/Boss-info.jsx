import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  InputItem,
  List,
  WhiteSpace,
  Button,
  NavBar,
  TextareaItem,
  Toast,
} from "antd-mobile";
import { Redirect } from "react-router";

import { requestUpdateUserInfo } from "../../redux/actions";

import ProfileHeads from "../../components/profile-heads/Profile-heads";
// |参数		|是否必选 |类型     |说明
// |headPhoto  |Y       |string   |头像名称

// |company   |N       |string   |公司
// |position     |N       |string   |职位
// |salary    |N       |string   |月薪
// |introductions   |N       |string   |介绍

function BossInfo({ updateUserInfo, userType, redirectUrl }) {
  const [headPhoto, setHeadPhoto] = useState("");
  const [userInfo, setUserInfo] = useState({
    company: "",
    position: "",
    salary: "",
    description: "",
  });

  function handleInputChange(stateName, stateValue) {
    setUserInfo((prevState) => ({
      ...prevState, [stateName]: stateValue,
    }));
  }

  const onSaveClick = () => {
    //Don't forget to add some checks ahead
    if (!headPhoto) {
      return Toast.fail("Please select a Photo", 1);
    }
    // use the props func --- from axios
    updateUserInfo({ headPhoto, ...userInfo });
  };

  if (userType === "Candidate") {
    return <Redirect to="/candiinfo" />;
  }
  if (redirectUrl && redirectUrl === "/home") {
    return <Redirect to="/home" />;
  }

  return (
    <div>
      {/* header */}
      <NavBar type="primary">BOSS INFO</NavBar>
      {/* profile heads */}
      <ProfileHeads iconSelected={headPhoto} setHeader={(target) => setHeadPhoto(target)} />
      {/* form list */}
      <List>
        <WhiteSpace size="sm" />

        {/* company */}
        <InputItem
          name="company"
          type="text"
          placeholder="Please type in company"
          onChange={(v) => handleInputChange("company", v)}
          value={userInfo.company}
        >
          company
        </InputItem>
        <WhiteSpace size="sm" />

        {/* position */}
        <InputItem
          name="position"
          type="text"
          placeholder="Please type in position"
          onChange={(v) => handleInputChange("position", v)}
          value={userInfo.position}
        >
          position
        </InputItem>
        <WhiteSpace size="sm" />

        {/* salary */}
        <InputItem
          name="salary"
          type="text"
          placeholder="Please type in salary"
          onChange={(v) => handleInputChange("salary", v)}
          value={userInfo.salary}
        >
          salary
        </InputItem>
        <WhiteSpace size="sm" />

        {/* description */}
        <TextareaItem
          title="description"
          name="description"
          count={100}
          rows={3}
          labelNumber={6}
          placeholder="Please type in description"
          onChange={(v) => handleInputChange("description", v)}
          value={userInfo.description}
        />
      </List>

      <Button type="primary" onClick={onSaveClick}>
        Save ALL
      </Button>
    </div>
  );
}

BossInfo.propTypes = {
  userType: PropTypes.string.isRequired,
  redirectUrl: PropTypes.string,
  updateUserInfo: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  userType: state.userData.userType,
  redirectUrl: state.userData.redirectUrl,
});

const mapDispatchToProps = { updateUserInfo: requestUpdateUserInfo };

export default connect(mapStateToProps, mapDispatchToProps)(BossInfo);
