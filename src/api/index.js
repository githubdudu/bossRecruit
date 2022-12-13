import ajax from './axios';

// used in actions and through "connect" map to a func in Register

export const reqRegister = (userData) => ajax('/register', userData, 'POST');

// used in actions and through "connect" map to a func in Login

export const reqLogin = (userData) => {
  return ajax('/login', userData, 'POST');
};

// used in actions and through "connect" map to a func in Boss-info  & Candi-info

export const reqUpdateUser = (userData) => {
  return ajax('/updateUserInfo', userData, 'POST');
};

export const getUserData = () => {
  return ajax('/user');
};

export const getUserList = (userType) => {
  return ajax('/userlist', { userType }, 'GET');
};

export const ajax_getMessageList = () => {
  return ajax('/msglist');
};

export const ajax_readMessage = (from) => {
  return ajax('/readmsg', { from }, 'POST');
};
