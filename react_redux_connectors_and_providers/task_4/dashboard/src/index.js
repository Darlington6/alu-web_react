import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './App/App';
import { Notifications } from './Notifications/Notifications';
import uiReducer from './reducers/uiReducer';

const rootId = document.getElementById("root");
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(uiReducer, composeEnhancers(applyMiddleware(thunk)));
// isLoggedIn={true}
ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
    rootId
);

if (module.hot && process.env.NODE_ENV === "development") {
  module.hot.accept("./App/App", () => {
    const NextApp = require("./App/App").default;
    ReactDOM.render(
      <React.StrictMode>
        <Provider store={ store }>
          <NextApp />
        </Provider>
      </React.StrictMode>,
      rootId
    );
  });
}
