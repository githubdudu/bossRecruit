/* version 1 state design:{
        isRegisterSuccess: true; // trace register state
        errorMessage: ""  //
        loginState: LOGIN LOGOUT // trace login state 
        user:""
} */
/* version 2 state design:
{
userData: {
    username:""  // info after login   String
    userType:""  // info after login  String Boss or Candidate
    errMsg:""  // error message
    redirectUrl: ""  // after login, set a url; when not null, to another page
   }
} */
import io from "socket.io-client";

import {
  reqRegister,
  reqLogin,
  reqUpdateUser,
  getUserData,
  getUserList,
  ajax_getMessageList,
  ajax_readMessage,
} from "../api";

export const CHANGE_STATE_LOGIN = "CHANGE_STATE_LOGIN"; // set username & userType
export const CHANGE_STATE_LOGOUT = "CHANGE_STATE_LOGOUT"; //  clear username & userType
export const SEND_ERROR = "SEND_ERROR";
export const UPDATE_USER_INFO = "UPDATE_USER_INFO";
export const GET_USER_LISTS = "GET_USER_LISTS"; // sync action
export const RECEIVE_MSG_LIST = "RECEIVE_MSG_LIST";
export const RECEIVE_MSG = "RECEIVE_MSG";
export const READ_MESSAGE = 'READ_MESSAGE'

// used in reqMessageList
function initIO(dispatch,userid) {
  console.log("io.socket",!io.socket);
  if (!io.socket) {
    io.socket = io("ws://localhost:4000");
    console.log("io.socket",!io.socket);
    // chatMsg : just one list of chat
    io.socket.on("receiveMsg", function (chatMsg) {
      console.log("Web 接收 from server:", chatMsg);
      // chatMsgs are from all the users, we must filter it
      console.log({userid,"from":chatMsg.from,"to":chatMsg.to});
      if(chatMsg.from === userid ||chatMsg.to === userid){
        console.log("!!!!");
      }
      dispatch(receiveMsg(chatMsg))
    });

  }
}


// sync actions
const changeStateLogin = (userData) => {
  return {
    type: CHANGE_STATE_LOGIN,
    userData,
  };
};

export const changeStateLogout = (msg) => {
  return {
    type: CHANGE_STATE_LOGOUT,
    msg,
  };
};

export const sendError = (msg) => {
  return {
    type: SEND_ERROR,
    msg,
  };
};

const updateUserInfo = (userInfo) => {
  return {
    type: UPDATE_USER_INFO,
    userInfo,
  };
};

//sync action
// get user lists
const userLists = (userLists) => {
  return {
    type: GET_USER_LISTS,
    userData: { userLists: userLists },
  };
};

// sync action 接受消息列表
// get messages list
const receiveMsgList = (data) => {
  return {
    type: RECEIVE_MSG_LIST,
    messages: data,
  };
};

// sync action 同步，接收一条消息
// receive one messages
const receiveMsg = (data) => {
  return {
    type: RECEIVE_MSG,
    messages: data,
  };
};

const sync_readMessage = (data) => {
  return {
    type: READ_MESSAGE,
    messages: data,
  };
}
// async actions
// Register
export const requestRegister = (state) => (dispatch) => {
  let promise = reqRegister(state);
  console.log(state, promise);
  return promise.then((responseMsg) => {
    console.log(responseMsg);
    if (responseMsg.data.code === 1) {
      //  1: fail
      let errMsg = responseMsg.data.msg;
      dispatch(sendError(errMsg));
    } else {
      // 0: success
      // auto login after register
      let userData = responseMsg.data.data;
      dispatch(changeStateLogin(userData));
      dispatch(reqMessageList(userData._id));
      // add a success message in components, not here.
      // all error message come from server, not web
    }
  });
};

//reqLogin is a promise from axios
// login
export const requestLogin = (state) => (dispatch) => {
  return reqLogin(state).then((responseMsg) => {
    if (responseMsg.data.code === 1) {
      // 1: fail
      let errMsg = responseMsg.data.msg;
      dispatch(sendError(errMsg));
    } else {
      // 0: success
      let userData = responseMsg.data.data;
      dispatch(changeStateLogin(userData));
      console.log("requestLogin");

      // reqMessageList(dispatch);
      dispatch(reqMessageList(userData._id));
    }
  });
};

//reqUpdateUser is a promise from axios
// UpdateUserinfo
export const requestUpdateUserInfo = (state) => (dispatch) => {
  return reqUpdateUser(state).then((responseMsg) => {
    if (responseMsg.data.code === 1) {
      // 1: fail
      let errMsg = responseMsg.data.msg;
      dispatch(changeStateLogout(errMsg));
    } else {
      // 0: success
      let userInfo = responseMsg.data.data;
      dispatch(updateUserInfo(userInfo));
      console.log("requestUpdateUserInfo");
    }
  });
};

// getUserData and update state
// get user info
export const fetchUserData = (state) => (dispatch) => {
  return getUserData(state).then((responseMsg) => {
    if (responseMsg.data.code === 1) {
      // 1: fail
      let errMsg = responseMsg.data.msg;
      dispatch(changeStateLogout(errMsg));
    } else {
      // 0: success
      let userData = responseMsg.data.data;
      dispatch(changeStateLogin(userData));
      console.log("fetchUserData");
      dispatch(reqMessageList(userData._id));

      // reqMessageList(dispatch);
    }
  });
};

// get User Lists
export const asyncGetUserLists = (userType) => (dispatch) => {
  return getUserList(userType).then((responseMsg) => {
    if (responseMsg.data.code === 1) {
      // 1: fail
      let errMsg = responseMsg.data.msg;
      dispatch(changeStateLogout(errMsg));
    } else {
      // 0: success
      let userData = responseMsg.data.data;
      dispatch(userLists(userData));
    }
  });
};

//
export const sendMsg = ({ from, to, content }) => (dispatch) => {
  console.log("client发送", { from, to, content });
  io.socket.emit("sendMsg", { from, to, content });
};

// 获取消息列表  async
// get MessagesList
const reqMessageList = (userid) => (dispatch) => {
  initIO(dispatch, userid);
  return ajax_getMessageList().then((responseMsg) => {
    if (responseMsg.data.code === 1) {
      // 1: fail
      let errMsg = responseMsg.data.msg;
      dispatch(changeStateLogout(errMsg));
    } else {
      // 0: success
      dispatch(receiveMsgList(responseMsg.data.data));
    }
  });
};
// async function reqMessageList(dispatch) {
//   initIO();
//   const response = await ajax_getMessageList();
//   const result = response.data;
//   if (result.code === 0) {
//     const { users, chatMsgs } = result.data;
//     dispatch(receiveMsgList({ users, chatMsgs }));
//   }
// }

// 改变=>已读
export const reqReadMessage = ({from,to}) => (dispatch) => {
  return ajax_readMessage(from).then((responseMsg) => {
    if (responseMsg.data.code === 1) {
      // 1: fail
      let errMsg = responseMsg.data.msg;
      console.log("error_readMessage", {from, to});

      dispatch(sendError(errMsg))
    } else {
      // 0: success
      console.log("sync_readMessage", {from, to});
      // dispatch(sync_readMessage({from, to}));
    }
  });
};
