import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { checkAuth } from './entities/user/model/action';
import { fetchOffers } from './entities/offer/model/action';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(checkAuth());
store.dispatch(fetchOffers());
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
      <ToastContainer/>
    </Provider>
  </React.StrictMode>
);
