import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import store from './reducers/store';
import { Provider } from 'react-redux';
import { globalCSS } from './utils/global';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));
