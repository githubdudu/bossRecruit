import { combineReducers } from "redux";
import {
  CHANGE_STATE_LOGIN,
  CHANGE_STATE_LOGOUT,
  SEND_ERROR,
  UPDATE_USER_INFO,
  GET_USER_LISTS,
  RECEIVE_MSG_LIST,
  RECEIVE_MSG,
} from "./actions";

// const INIT_USER_DATA = {
//   username: "",
//   userType: "",
//   errMsg: "",
//   _id,

//   headPhoto,
//   position,
//   description,
//   company,
//   salary,
// };

/* version 2 state design:
{
userData: {
    username:""  // info after login   String
    userType:""  // info after login  String Boss or Candidate
    errMsg:""  // error message
    _id;
    headPhoto,
    position,
    description,
    company,
    salary,
   }
} */

// must reference to the API document
/* case CHANGE_STATE_LOGIN:
    action.data: {
	        "_id": user._id "5ae133e621388d262c8d91a6" ,
	        "username": "ds2",
	        "userType": "Boss"

          _id;
          headPhoto,
	      } 
    ======>>>
    {
        _id
        username: "" => username
        userType: "" => userType
        errMsg:   "" => null

        headPhoto,
    }
    
  case CHANGE_STATE_LOGOUT:
    return;
  case SEND_ERROR:
    return;
*/

/* reducer function template */
// function username(state = INIT_USER_DATA, action) {
//   switch (action.type) {
//     case CHANGE_STATE_LOGIN:
//     case CHANGE_STATE_LOGOUT:
//     case SEND_ERROR:
//     case UPDATE_USER_INFO:
//     default:
//   }
// }

const loginChange = (name) => (state = "", action) => {
  switch (action.type) {
    case CHANGE_STATE_LOGIN:
      return action.userData[name] ?? "";
    case UPDATE_USER_INFO:
      return action.userInfo[name] ?? "";
    case CHANGE_STATE_LOGOUT:
      return null;
    case SEND_ERROR:
    default:
      return state;
  }
};

function errMsg(state = "", action) {
  switch (action.type) {
    case CHANGE_STATE_LOGIN:
      return "";
    case CHANGE_STATE_LOGOUT:
      return action.msg ?? "";
    case SEND_ERROR:
      return action.msg ?? "";
    case UPDATE_USER_INFO:
    default:
      return state;
  }
}

const updateFiveInfo = (name) => (state = "", action) => {
  switch (action.type) {
    case CHANGE_STATE_LOGIN:
      return action.userData[name] ?? "";
    case UPDATE_USER_INFO:
      // ?? 返回第一个 已定义的 值。
      // console.log(`${name}:`,action.userInfo[name]);
      return action.userInfo[name] ?? "";
    case CHANGE_STATE_LOGOUT:
      return null;
    case SEND_ERROR:
    default:
      return state;
  }
};

const userData = combineReducers({
  username: loginChange("username"),
  userType: loginChange("userType"),
  _id: loginChange("_id"),
  errMsg,
  headPhoto: updateFiveInfo("headPhoto"),
  position: updateFiveInfo("position"),
  description: updateFiveInfo("description"),
  company: updateFiveInfo("company"),
  salary: updateFiveInfo("salary"),
});

const userLists = (state = "", action) => {
  switch (action.type) {
    case GET_USER_LISTS:
      return action.userData.userLists;
    case CHANGE_STATE_LOGOUT:
      return null;
    default:
      return state;
  }
};

//初始化 messages
const initMessages = {
  users: {}, // 属性名 userid， 属性值 {username, headPhoto}
  chatMsgs: [], // msg 数组
  unReadCount: 0, // 总的未读 //actually not used in web, just calculate it by chatMsgs on the client side
};

//
const messages = (state = initMessages, action) => {
  switch (action.type) {
    case RECEIVE_MSG_LIST:
      const { users, chatMsgs } = action.messages;
      return { users, chatMsgs, unReadCount: 0 };
    case RECEIVE_MSG: //one clip of data // receive one messages
      return {
        users: state.users,
        chatMsgs: [...state.chatMsgs, action.messages],
        unReadCount: 0, //actually not used in web, just calculate it by chatMsgs on the client side
      };
    default:
      return state;
  }
};
export default combineReducers({
  userData,
  userLists,
  messages,
});
