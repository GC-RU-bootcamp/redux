import { makeActionCreator, makeAsyncActionCreator } from 'redux-toolbelt';

export const listSessionsAction = makeActionCreator('LIST_SESSIONS_UPDATE');
export const createSessionsAsync  = makeAsyncActionCreator("LIST_SESSIONS");