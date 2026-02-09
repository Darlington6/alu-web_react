import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './App/App';
import { Notifications } from './Notifications/Notifications';
import uiReducer from './reducers/uiReducer';

const rootId = document.getElementById("root");
const store = createStore(uiReducer, applyMiddleware(thunk));
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
