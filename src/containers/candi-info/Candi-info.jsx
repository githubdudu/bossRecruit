import React, { Component } from "react";
import { connect } from "react-redux";
import {
  InputItem,
  List,
  WhiteSpace,
  Button,
  // NoticeBar,
  NavBar,
  TextareaItem,
  Toast,
} from "antd-mobile";
import { Redirect } from "react-router";

import { requestUpdateUserInfo } from "../../redux/actions";

import ProfileHeads from "../../components/profile-heads/Profile-heads";

class CandiInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headPhoto: "", //ProfileHeads
      position: "",
      description: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleHeaderClick = (headPhoto) => {
    this.setState({
      headPhoto,
    });
  };

  handleInputChange(stateName, stateValue) {
    if (stateValue.target) {
      let isBossOptions = stateValue.target.value === "Boss";
      stateValue = stateValue.target.checked && isBossOptions;
    }

    this.setState({
      [stateName]: stateValue,
    });
  }

  updateUserInfo = () => {
    //Don't forget to add some checks ahead
    if (!this.state.headPhoto) {
      return Toast.fail("Please select a Photo", 1);
      //   return (this.errMsg = "Please select a Photo");
    }

    // do ajex GET
    console.log("save!", JSON.stringify(this.state));

    // use the props func --- from axios
    this.props.updateUserInfo(this.state);
    // this.props.informMainSubmitted();
  };

  render() {
    if (this.props.userType === "Boss") {
      console.log("/candiinfo to /bossinfo");
      return <Redirect to="/bossinfo" />;
    }

    if (this.props.redirectUrl && this.props.redirectUrl === "/home") {
      console.log("re to /home");
      return <Redirect to="/home" />;
    }
    console.log(" re render candiinfo")
    return (
      <div>
        {/* header */}
        <NavBar type="primary">CANDIDATE INFO</NavBar>

        {/* profile heads */}
        <ProfileHeads setHeader={this.handleHeaderClick} />

        {/* form list */}
        <List>
          <WhiteSpace size="sm" />

          {/* position */}
          <InputItem
            name="position"
            type="text"
            placeholder="Please type in position"
            onChange={(v) => this.handleInputChange("position", v)}
            value={this.state.position}
          >
            求职岗位
          </InputItem>
          <WhiteSpace size="sm" />

          {/* description */}
          <TextareaItem
            title="个人介绍"
            name="description"
            count={100}
            rows={3}
            labelNumber={5}
            placeholder="Please type in description"
            onChange={(v) => this.handleInputChange("description", v)}
            value={this.state.description}
          />
        </List>
        <Button type="primary" onClick={this.updateUserInfo}>
          Save ALL
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userType: state.userData.userType,
  redirectUrl: state.userData.redirectUrl,
});

const mapDispatchToProps = { updateUserInfo: requestUpdateUserInfo };

export default connect(mapStateToProps, mapDispatchToProps)(CandiInfo);
