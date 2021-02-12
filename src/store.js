import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {user} from './reducers/reducers'
import { composeWithDevTools } from 'redux-devtools-extension';

const reducers = {user};

const rootReducer = combineReducers(reducers);

export const configureStore = () =>
    createStore(
        rootReducer,
        composeWithDevTools(
            applyMiddleware(thunk)
        )
    );