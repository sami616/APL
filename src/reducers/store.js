import { combineReducers, applyMiddleware, createStore } from 'redux';
import setupReducer from './setupReducer';
import wpReducer from './wpReducer';
import navReducer from './navReducer';
import pluginReducer from './pluginReducer';
import userReducer from './userReducer';
import githubReducer from './githubReducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const reducers = combineReducers({
	nav: navReducer,
	setup: setupReducer,
	wp: wpReducer,
	plugin: pluginReducer,
	user: userReducer,
	github: githubReducer
});

let middleware;

if (process.env.NODE_ENV !== 'production') {
	middleware = [thunk, logger];
} else {
	middleware = [thunk];
}

const store = createStore(reducers, applyMiddleware(...middleware))

export default store