
import React from 'react';
import { getDistanceBetween } from '../lib/utilities.js';
import { lightDream } from '../mapthemes/themes.js';

import '../scss/google-map.scss';


class GoogleMap extends React.Component {

  constructor(props) {
    super(props);
    
    this.gmap = null;
    this.bounds = null;
    this.firstSearch = false;
    this.defaultLatLng = {lat: 40.730610, lng: -73.935242};
    this.markers = [];
    this.infoWindows = [];
    this.markersInBounds = 4; //number of markers to show in visible map area
    this.mapRef = React.createRef();
  }
  
  // build an array of all possible markers for the search
  doMarkerSetup() {
    this.bounds = new window.google.maps.LatLngBounds();

    const cols = this.props.columns;
    
    this.props.locations.forEach((location, i) => {
      const pos = {
        lat: location[cols.map_location].lat,
        lng: location[cols.map_location].long
      };
      const distance = getDistanceBetween(this.props.searchpos, pos);
      const markerConfig = {
        map: this.gmap,
        visible: false,
        position: pos,
        animation: window.google.maps.Animation.DROP,
        infoWindow: {
          content: this.getMarkerInfoWindow(location, distance),
          maxWidth: 400
        }
      };
      const mrkr = new window.google.maps.Marker(markerConfig);
      const infoWindow = new window.google.maps.InfoWindow(mrkr.infoWindow);
      
      mrkr.addListener('click', () => this.props.markerClick(i));
      infoWindow.addListener('closeclick', () => this.props.markerClick(i, true));
      
      if (i <= this.props.fieldvals.resultscount && distance <= this.props.fieldvals.radius) {
        mrkr.setVisible(true);
      }

      this.markers.push(mrkr);
      this.infoWindows.push(infoWindow);
      
      if (i < this.markersInBounds) {
        this.bounds.extend(new window.google.maps.LatLng(pos.lat, pos.lng));
        if (i + 1 === this.markersInBounds) {
          this.gmap.fitBounds(this.bounds);
        }
      }
    });
  }
  
  setActiveInfoWindow(index) {
    const marker = this.markers[index];
    const infoWindow = this.infoWindows[index];
    infoWindow.open(this.gmap, marker);
    this.gmap.panTo(marker.getPosition());
  }
  closeOpenInfoWindow(index) {
    const marker = this.markers[index];
    const infoWindow = this.infoWindows[index];
    infoWindow.close();
  }

  setMarkerVisibility(index, visible) {
    this.markers[index].setMarkerVisibility(visible);
  }
  
  doMarkerDestroy() {
    this.markers.forEach(m => m.setMap(null));
    this.markers = [];
    this.infoWindows = [];
  }

  componentDidMount() {
    this.gmap = new window.google.maps.Map(this.mapRef.current, {
      center: this.defaultLatLng,
      zoom: 8,
      scrollwheel: false,
      styles: lightDream
    });
    this.bounds = new window.google.maps.LatLngBounds();
  }

  shouldComponentUpdate(nextProps, prevState) {
    console.log('Prev Props: ', this.props);
    console.log('Next Props: ', nextProps);
    return true;
  }
  
  componentDidUpdate(prevProps, prevState) {
    let init = false;
    // when locations become available for first time (searchpos is gauranteed)
    if (prevProps.locations.length === 0 && this.props.locations.length > 1) {
      this.doMarkerSetup();
      this.gmap.panTo(this.props.searchpos);
      init = true;
    }
    // locations have changed, another search happened, map pans to geocoded coords
    if (prevProps.locations !== this.props.locations && !init) {
      this.doMarkerDestroy();
      this.doMarkerSetup();
    }
    //focused location has changed, close open infowindows, and open the current
    if (prevProps.focused !== this.props.focused) {
      
      if (prevProps.focused !== false) {
        this.closeOpenInfoWindow(prevProps.focused);
      } 
      if (this.props.focused !== false) {
        this.setActiveInfoWindow(this.props.focused);
      }
    }
  }
  

  getMarkerInfoWindow(location, distance) {
    const cols = this.props.columns;
    const addrUnit = location[cols.address_unit] ? '<em>${location[cols.address_unit]}</em>' : '';
    return `<div class="hubdb-infowindow">
          <div class="hubdb-infowindow--liner">
            <h4>${location[cols.name]}</h4>
            <address>
              <span>${location[cols.address_street]} ${addrUnit}</span>
              <span>${location[cols.address_city]}, ${location[cols.address_state]} ${location[cols.address_zip]}</span>
            </address>
            <p>
              <i class="icon-location-pin" aria-hidden="true"></i>
              <span>${distance} miles away</span>
            </p>
          </div>
        </div>`;
  }

  render() {
    return(
      <div className="hubdb-gmap" data-search-pos>
        <div className="hubdb-gmap--liner">
          <div id="hubdb-gmap-target" ref={this.mapRef}></div>
        </div>
      </div>
    );
  }
};

export default GoogleMap;