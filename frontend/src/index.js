import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//  import './assets/css/black-dashboard-react.css';
//  import './assets/css/blk-design-system-react.css';
import './assets/css/nucleo-icons.css';
import './assets/css/argon-design-system-react.min.css';
// import './custom.css'

import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/scss/argon-dashboard-react.scss";


import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
