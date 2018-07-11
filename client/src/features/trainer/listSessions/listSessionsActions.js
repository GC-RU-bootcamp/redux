import { makeActionCreator, makeAsyncActionCreator } from 'redux-toolbelt';

export const createSessionsAsync  = makeAsyncActionCreator("LIST_SESSIONS");