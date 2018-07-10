import {createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga'
import rootReducer from "../reducers";
import  rootSaga  from '../sagas.js';
import { routeMiddleware, routeEnhancer } from '../routes';


const monitor = window["__SAGA_MONITOR_EXTENSION__"]
const sagaMiddleware = createSagaMiddleware({ sagaMonitor: monitor })

const middlewares = [sagaMiddleware, routeMiddleware];
const middlewareEnhancer = applyMiddleware(...middlewares);

const storeEnhancers = [middlewareEnhancer, routeEnhancer];

const composedEnhancer = composeWithDevTools(...storeEnhancers);

const store = createStore(
    rootReducer,
    composedEnhancer
);

sagaMiddleware.run(rootSaga);

export default store
