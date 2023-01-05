import React from 'react';
import ReactDOM from 'react-dom';
import App from './_UI/App';
import Amplify from 'aws-amplify';
import config from './aws-exports';
import './styles/index.scss';

Amplify.configure(config);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


