import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Hello from './containers/Hello';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { enthusiasm } from './reducers/index';
import { StoreState } from './types/index';
import { EnthusiasmAction } from './actions/index';
import 'antd/dist/antd.css';
import App from './App';
import './index.css';

const store = createStore<StoreState, EnthusiasmAction, any, any>(enthusiasm, {
  enthusiasmLevel: 1,
  languageName: 'TypeScript'
});

ReactDOM.render(
  <>
    <App/>
  </>,
  document.getElementById('root') as HTMLElement
);
