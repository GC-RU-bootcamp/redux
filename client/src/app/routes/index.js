import { routerForBrowser } from 'redux-little-router';

const routes = {
  '/':{
    title: 'Home'
  },
  "/login":{
    title: 'Login'
  },
  "/register":{
    title: 'Register'
  },
  "/join-session/:uuid": {
    title: 'Training Session'
  },
  "/sessions":{
    title: 'Sessions'
  },
  "/create-session":{
    title: 'Create Session'
  }
};

const routerObject = routerForBrowser({ routes });

export const routeReducer = routerObject.reducer;
export const routeMiddleware = routerObject.middleware;
export const routeEnhancer = routerObject.enhancer;
