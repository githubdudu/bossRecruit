import React, { Component } from "react";
import { List, Grid } from "antd-mobile";
// import icon from '../../assets/heads/头像1.png';

export default class ProfileHeads extends Component {
  constructor(props) {
    super(props);

    this.headPhotos = [];
    for (let i = 1; i <= 20; i++) {
      let icon = require(`../../assets/heads/头像${i}.png`).default;
      this.headPhotos.push({
        text: "头像" + i,
        icon: icon,
      });
    }

    this.state = {
      icon: null,
    };
  }

  // reference name come from ant mobile docs, (el: Object, index: number): void
  // this is a ant mobile components' handleClick()
  handleClick = ({ icon, text }, index) => {
    this.setState({ icon });
    this.props.setHeader(text);
  };

  render() {
    const { icon } = this.state;
    const listTitle = !icon ? (
      "Please select one"
    ) : (
      <div>
        Have chose this:
        <img src={icon} alt="headPhoto"/>
      </div>
    );
    
    return (
      <div>
        <List renderHeader={() => (listTitle) }>
          <Grid
            data={this.headPhotos}
            columnNum={5}
            onClick={this.handleClick}
          ></Grid>
        </List>
      </div>
    );
  }
}
