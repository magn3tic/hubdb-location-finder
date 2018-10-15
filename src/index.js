import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './lib/serviceWorker';


window.hubdbLocationFinder = (options) => {
  const root = document.getElementById('hubdb-locationfinder-root');
  ReactDOM.render(<App portal={options.portal} table={options.table} />, root);

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: http://bit.ly/CRA-PWA
  serviceWorker.unregister();
};


window.hubdbLocationFinder({
  portal: '3974799',
  table: '676444',
  columnsMap: {}
});