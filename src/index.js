import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './lib/serviceWorker';


window.hubdbLocationFinder = options => {
  //configurable app instance
  ReactDOM.render(
    <App portal={options.portal} table={options.table} color={options.color}
         columns={options.columnsMap} mapcol={options.locationColumnName} maptheme={options.mapTheme} />, 
    document.getElementById('hubdb-locationfinder-root') );

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: http://bit.ly/CRA-PWA
  serviceWorker.unregister();
};



window.hubdbLocationFinder({
  portal: '3974799',
  table: '676444',
  color: '#0a9191',
  columnsMap: {
    name: '1',
    address_street: '7',
    address_unit: '',
    address_state: '3',
    address_city: '4',
    address_zip: '8',
    email: '13',
    phone: '11',
    fax: '12',
    hours_weekday: '15',
    hours_saturday: '16',
    hours_sunday: '17',
    map_location: '18'
  },
  locationColumnName: 'map_location',
  fieldDefaults: {
    radius: '50',
    resultscount: '50'
  },
  mapTheme: 'default'
});