import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import * as serviceWorker from './lib/serviceWorker';
import { appInsideIframe } from './lib/utilities';

//global styles
import './index.scss';


window.hubdbLocationFinder = options => {


  //configurable app instance
  ReactDOM.render(
    <App portal={options.portal} table={options.table} color={options.color}
         columns={options.columnsMap} mapcol={options.locationColumnName} maptheme={options.mapTheme}
         framed={appInsideIframe()} />, 
    document.getElementById('hubdb-locationfinder-root') );

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: http://bit.ly/CRA-PWA
  serviceWorker.unregister();
};