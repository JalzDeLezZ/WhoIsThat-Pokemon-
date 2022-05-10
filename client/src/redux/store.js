import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer.js';
 
import { composeWithDevTools } from 'redux-devtools-extension';

const STORE = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default STORE;
/*
https://redux.js.org/introduction/getting-started
https://www.npmjs.com/package/redux-thunk
https://github.com/zalmoxisus/redux-devtools-extension?msclkid=3a81d4a5ac5111ec9749d826baae5f36
*/
