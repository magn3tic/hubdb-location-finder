
import React from 'react';
import { getDistanceBetween } from '../lib/utilities.js';
import * as mapThemes from '../mapthemes/themes.js';

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
    this.distances = [];
    this.positions = [];
    this.markersInBounds = 4; //number of markers to show in visible map area
    this.mapRef = React.createRef();
  }
  
  // build an array of all possible markers for the search
  doMarkerSetup() {
    this.distances = [];
    this.positions = [];
    this.bounds = new window.google.maps.LatLngBounds();
    const cols = this.props.columns;
    
    this.props.locations.forEach((location, i) => {
      const pos = {
        lat: location[cols.map_location].lat,
        lng: location[cols.map_location].long
      };
      this.positions.push(pos);
      
      const distance = getDistanceBetween(this.props.searchpos, pos);
      this.distances.push(distance);

      const products = location[cols.products];
      console.log(products);

      const markerConfig = {
        map: this.gmap,
        visible: false,
        position: pos,
        animation: window.google.maps.Animation.DROP,
        infoWindow: {
          content: this.getMarkerInfoWindow(location, distance),
          maxWidth: 400
        },
        icon: {
          anchor: new window.google.maps.Point(0,0),
          path: "M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z",
          fillColor: this.props.color,
          fillOpacity: 0.8,
          strokeWeight: 2,
          strokeColor: this.props.color,
          scale: 0.65
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
      this.extendMapBounds(i, pos);
    });

    //fit bounds when done with markers
    this.fitMapBounds();
  }
  
  setActiveInfoWindow(index) {
    const marker = this.markers[index];
    const infoWindow = this.infoWindows[index];
    infoWindow.open(this.gmap, marker);
    this.gmap.panTo(marker.getPosition());
  }

  closeOpenInfoWindow(index) {
    const infoWindow = this.infoWindows[index];
    infoWindow.close();
  }

  setMarkerVisibility(index, visible) {
    this.markers[index].setVisible(visible);
  }

  extendMapBounds(i, pos) {
    if (i < this.markersInBounds) {
      this.bounds.extend(new window.google.maps.LatLng(pos.lat, pos.lng));
    }
  }
  fitMapBounds() {
    this.gmap.fitBounds(this.bounds);
  }
  
  resetVisibleMarkers() {
    let visibleCount = 0;
    this.markers.forEach((item, index) => {
      this.setMarkerVisibility(index, false);
      const distance = this.distances[index];
      if (distance < this.props.fieldvals.radius && (index + 1) < this.props.fieldvals.resultscount) {
        visibleCount++;
        this.setMarkerVisibility(index, true);
        this.extendMapBounds(visibleCount, this.positions[index]);
      }
    });
    this.fitMapBounds();
  }
  
  doMarkerDestroy() {
    this.markers.forEach(m => m.setMap(null));
    this.markers = [];
    this.infoWindows = [];
  }
  
  // Component mount - initialize map
  componentDidMount() {
    this.gmap = new window.google.maps.Map(this.mapRef.current, {
      center: this.defaultLatLng,
      zoom: 8,
      minZoom: 5,
      maxZoom: 15,
      scrollwheel: false,
      fullscreenControl: false,
      styles: mapThemes.ultraLight
    });
    this.bounds = new window.google.maps.LatLngBounds();
  }

  shouldComponentUpdate(nextProps, prevState) {
    return true;
  }
  
  // Watch for prop changes
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
    //if selected radius changes
    if (prevProps.fieldvals.radius !== this.props.fieldvals.radius || 
        prevProps.fieldvals.results !== this.props.fieldvals.results) {
      this.resetVisibleMarkers();
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