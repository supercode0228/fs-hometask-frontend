import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';

import App from './App';

import {
  ModalReducer,
  patientsReducer,
  appointmentsReducer,
} from './reducers';

const reducers ={
  modals: ModalReducer,
  patients: patientsReducer,
  appointments: appointmentsReducer,
};

const rootReducer = combineReducers(reducers);

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  )
}