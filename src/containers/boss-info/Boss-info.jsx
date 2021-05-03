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
// |参数		|是否必选 |类型     |说明
// |headPhoto  |Y       |string   |头像名称

// |company   |N       |string   |公司
// |position     |N       |string   |职位
// |salary    |N       |string   |月薪
// |introductions   |N       |string   |介绍

class BossInfo extends Component {
  constructor(props) {
    super(props);

    // decided the POST data
    this.state = {
      headPhoto: "", //ProfileHeads
      company: "",
      position: "",
      salary: "",
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
    // this.errMsg = null;
    console.log("save!", JSON.stringify(this.state));

    // use the props func --- from axios

    this.props.updateUserInfo(this.state);
  };

  render() {
    if (this.props.userType === "Candidate") {
      console.log("/bossinfo to /candiinfo");
      return <Redirect to="/candiinfo" />;
    }
    if (this.props.redirectUrl && this.props.redirectUrl === "/home") {
      console.log("re to /home");
      return <Redirect to="/home" />;
    }
    return (
      <div>
        {/* header */}
        <NavBar type="primary">BOSS INFO</NavBar>
        {/* profile heads */}
        <ProfileHeads setHeader={this.handleHeaderClick} />
        {/* form list */}
        <List>
          <WhiteSpace size="sm" />

          {/* company */}
          <InputItem
            name="company"
            type="text"
            placeholder="Please type in company"
            onChange={(v) => this.handleInputChange("company", v)}
            value={this.state.company}
          >
            company
          </InputItem>
          <WhiteSpace size="sm" />

          {/* position */}
          <InputItem
            name="position"
            type="text"
            placeholder="Please type in position"
            onChange={(v) => this.handleInputChange("position", v)}
            value={this.state.position}
          >
            position
          </InputItem>
          <WhiteSpace size="sm" />

          {/* salary */}
          <InputItem
            name="salary"
            type="text"
            placeholder="Please type in salary"
            onChange={(v) => this.handleInputChange("salary", v)}
            value={this.state.salary}
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
            onChange={(v) => this.handleInputChange("description", v)}
            value={this.state.description}
          />
        </List>

        {/* {this.errMsg && <NoticeBar icon={null}>{this.errMsg}</NoticeBar>} */}
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

export default connect(mapStateToProps, mapDispatchToProps)(BossInfo);
