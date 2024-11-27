import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { fetchOffers } from './entities/offer';
import { checkAuth } from './entities/user/model/action';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(fetchOffers());
store.dispatch(checkAuth());
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
);
