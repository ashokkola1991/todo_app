import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

import products from './reducer/product'; 
  
const rootReducer = combineReducers({
    products
});

const enhancerList = [];
const devToolsExtension = window && window.__REDUX_DEVTOOLS_EXTENSION__;

if (typeof devToolsExtension === 'function') {
  enhancerList.push(devToolsExtension());
}
const composedEnhancer = compose(applyMiddleware(thunk), ...enhancerList);

export default createStore(rootReducer, {}, composedEnhancer);