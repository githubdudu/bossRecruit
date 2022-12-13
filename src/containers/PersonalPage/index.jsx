import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavBar, Result, List, WhiteSpace } from 'antd-mobile';
import HeadPhoto from 'Components/HeadPhoto';
import LogOutButton from './LogOutButton';

function Personal({
  headPhoto,
  username,
  userType,
  company,
  position,
  description,
  salary,
}) {
  return (
    <div>
      <NavBar type="primary">用户中心</NavBar>

      <Result
        img=<HeadPhoto photoName={headPhoto} />
        title={username}
        message={company}
      />

      <List renderHeader={() => '相关信息'}>
        <List.Item multipleLine>
          {userType && <List.Item.Brief>用户类型: {userType} </List.Item.Brief>}
          {position && <List.Item.Brief>职位: {position} </List.Item.Brief>}
          {description && (
            <List.Item.Brief>简介: {description} </List.Item.Brief>
          )}
          {salary && <List.Item.Brief>薪资: {salary} </List.Item.Brief>}
        </List.Item>
      </List>

      <WhiteSpace />
      <List>
        <LogOutButton />
      </List>
    </div>
  );
}

LogOutButton.propTypes = {
  headPhoto: PropTypes.string,
  username: PropTypes.string,
  userType: PropTypes.string,
  company: PropTypes.string,
  position: PropTypes.string,
  description: PropTypes.string,
  salary: PropTypes.string,
};

const mapStateToProps = (state) => ({
  headPhoto: state.userData.headPhoto,
  username: state.userData.username,
  userType: state.userData.userType,
  company: state.userData.company,
  position: state.userData.position,
  description: state.userData.description,
  salary: state.userData.salary,
});

export default connect(mapStateToProps)(Personal);
