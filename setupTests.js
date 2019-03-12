/* eslint-disable */
require('regenerator-runtime/runtime');
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
/* eslint-enable */

global.mock = {};
/* set store mock */
const middlewares = [thunk];
global.mock.createStore = configureStore(middlewares);
global.mock.createEmptyStore = () => global.mock.createStore({});
