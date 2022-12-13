import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Button } from 'antd-mobile';
import Cookies from 'js-cookie';
import { changeStateLogout } from '../../redux/actions';

function LogOutButton({ logout }) {
  const handleLogout = () => {
    const alertInstance = Modal.alert('退出登录', '确定退出吗？', [
      {
        text: '取消',
        onPress: () => {},
        style: 'default',
      },
      {
        text: '确定',
        onPress: () => {
          Cookies.remove('userid', { path: '' });
          logout('logOUT!');
        },
      },
    ]);
    setTimeout(() => {
      alertInstance.close();
    }, 100000);
  };

  return (
    <Button type="warning" onClick={handleLogout}>
      退出登录
    </Button>
  );
}

LogOutButton.propTypes = {
  logout: PropTypes.func.isRequired,
};

const mapStateToDispatch = {
  logout: changeStateLogout,
};

export default connect(null, mapStateToDispatch)(LogOutButton);
