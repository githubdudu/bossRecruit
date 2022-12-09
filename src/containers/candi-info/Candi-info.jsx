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

import ProfileHeads from "Components/ProfileHeads";

function CandiInfo({ updateUserInfo, userType, redirectUrl }) {
  const [headPhoto, setHeadPhoto] = useState("");
  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");

  const onSaveClick = () => {
    //Don't forget to add some checks ahead
    if (!headPhoto) {
      return Toast.fail("Please select a Photo", 1);
    }
    // use the props func --- from axios
    updateUserInfo({ headPhoto, position, description });
  };

  if (userType === "Boss") {
    return <Redirect to="/bossinfo" />;
  }

  if (redirectUrl && redirectUrl === "/home") {
    return <Redirect to="/home" />;
  }

  return (
    <div>
      {/* header */}
      <NavBar type="primary">CANDIDATE INFO</NavBar>

      {/* profile heads */}
      <ProfileHeads iconSelected={headPhoto} setHeader={(target) => setHeadPhoto(target)} />

      {/* form list */}
      <List>
        <WhiteSpace size="sm" />

        <InputItem
          name="position"
          type="text"
          placeholder="Please type in position"
          onChange={(v) => setPosition(v)}
          value={position}
        >
          求职岗位
        </InputItem>
        <WhiteSpace size="sm" />

        <TextareaItem
          title="个人介绍"
          name="description"
          count={100}
          rows={3}
          labelNumber={5}
          placeholder="Please type in description"
          onChange={(v) => setDescription(v)}
          value={description}
        />
      </List>
      <Button type="primary" onClick={onSaveClick}>
        Save ALL
      </Button>
    </div>
  );

}

CandiInfo.propTypes = {
  userType: PropTypes.string.isRequired,
  redirectUrl: PropTypes.string,
  updateUserInfo: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  userType: state.userData.userType,
  redirectUrl: state.userData.redirectUrl,
});

const mapDispatchToProps = { updateUserInfo: requestUpdateUserInfo };

export default connect(mapStateToProps, mapDispatchToProps)(CandiInfo);
