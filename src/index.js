import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';


import './index.css';
import App from './App';

import match from './store/reducers/match';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(match, composeEnhancers(
    applyMiddleware(thunk)
));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
