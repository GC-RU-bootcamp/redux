import {combineReducers} from "redux";
import { routeReducer } from '../routes';
import registrationReducer from '../../features/register/regReducer';
import loginReducer from '../../features/login/loginReducer.js';
import ormReducer from './ormReducer.js';
import createSessionReducer from '../../features/trainer/createSession/createSessionReducer.js';

const rootReducer = combineReducers({
    router: routeReducer,
    orm: ormReducer,
    registration: registrationReducer,
    login: loginReducer,
    create: createSessionReducer
});

export default rootReducer;
