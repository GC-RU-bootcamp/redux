import { makeActionCreator, makeAsyncActionCreator } from 'redux-toolbelt';

export const createSessionAction = makeActionCreator('CREATE_SESSION_UPDATE');
export const createSessionAsync  = makeAsyncActionCreator("CREATE_SESSION");