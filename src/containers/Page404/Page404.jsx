import React, { Component } from 'react';
import { Button } from 'antd-mobile';

export default class Page404 extends Component {
  render() {
    return (
      <div>
        <h2> 404 not found</h2>
        <Button type="primary" onClick={() => this.props.history.push('/home')}>
          Click to return
        </Button>
      </div>
    );
  }
}
