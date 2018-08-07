import React from 'react';
import { Provider } from 'react-redux';

import './config/reactotron';
import store from './store';
import './styles/global';
import Main from './pages/main';

const App = () => (
  <Provider store={store}>
    <Main />
  </Provider>
);
export default App;
