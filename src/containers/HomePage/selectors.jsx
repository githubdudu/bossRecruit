import { createSelector } from 'reselect';
import { makeSelectUnreadEach } from '../MessagesPage/selectors';

export const makeSelectUnreadAll = () =>
  createSelector(
    makeSelectUnreadEach(),
    (selectUnreadEach) => Object.values(selectUnreadEach).reduce(
      (prev, curr) => prev + curr, 0
    ),
  )