import { makeActionCreator, makeAsyncActionCreator } from 'redux-toolbelt';

export const registerAction = makeActionCreator('REG_UPDATE');
export const registerAsync  = makeAsyncActionCreator("REGISTRATION")
