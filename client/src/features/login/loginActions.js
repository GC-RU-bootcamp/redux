import { makeActionCreator, makeAsyncActionCreator } from 'redux-toolbelt';

export const loginAction = makeActionCreator('LOG_UPDATE');
export const loginAsync  = makeAsyncActionCreator("LOGIN");
