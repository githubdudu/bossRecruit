import { createSelector } from 'reselect';

const selectID = (state) => state.userData._id;
const selectUsers = (state) => state.messages.users;
const selectChatMsgs = (state) => state.messages.chatMsgs;

const makeSelectUnreadEach = () =>
  createSelector(selectID, selectChatMsgs, (id, chatMsgs) => {
    const map = new Map();
    for (let i = 0; i < chatMsgs.length; i++) {
      if (chatMsgs[i].to === id && !chatMsgs.isRead) {
        if (map.has(chatMsgs[i].chat_id)) {
          map.set(chatMsgs[i].chat_id, map.get(chatMsgs[i].chat_id));
        } else {
          map.set(chatMsgs[i].chat_id, 1);
        }
      }
    }
    return Object.fromEntries(map.entries());
  });

const makeSelectLastMsg = () =>
  createSelector(selectChatMsgs, (chatMsgs) => {
    const map = new Map();
    for (let i = 0; i < chatMsgs.length; i++) {
      if (!map.has(chatMsgs[i].chat_id)) {
        map.set(chatMsgs[i].chat_id, chatMsgs[i]);
      }
    }
    return Array.from(map.values());
  });
export { selectID, selectUsers, makeSelectUnreadEach, makeSelectLastMsg };
