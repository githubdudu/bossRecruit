import React from 'react'
import { connect } from 'react-redux';
import { Modal } from "antd-mobile";

function LogOutModal({ logout }) {
  return (
    Modal.alert("退出登录", "确定退出吗？", [
      {
        text: "取消",
        onPress: () => console.log("Cancel"),
        style: "default"
      },
      {
        text: "确定",
        onPress: () => {
          Cookies.remove("userid", { path: "" });
          logout("logOUT!");
        },
      },
    ])
  )
}

const mapStateToDispatch = {
  logout: changeStateLogout,
};

LogOutModal.propTypes = {
  logout: PropTypes.func,
}

export default connect(null, mapStateToDispatch)(LogOutModal);