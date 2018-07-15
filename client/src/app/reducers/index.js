import {combineReducers} from "redux";
import { routeReducer } from '../routes';
import registrationReducer from '../../features/register/regReducer';
import loginReducer from '../../features/login/loginReducer.js';
import ormReducer from './ormReducer.js';
import createSessionReducer from '../../features/trainer/createSession/createSessionReducer.js';
import webRTCReducer from '../../features/webRTC/webRTCReducers.js';

const rootReducer = combineReducers({
    router: routeReducer,
    orm: ormReducer,
    registration: registrationReducer,
    login: loginReducer,
    create: createSessionReducer,
    webrtc: webRTCReducer
});

export default rootReducer;
