
import React from 'react';
import { lightDream } from '../mapthemes/themes.js';

import '../scss/google-map.scss';


class GoogleMap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      initialized: false,
      activeIndex: false,
    };
    this.gmap = null;
    this.bounds = null;
    this.defaultLatLng = {lat: 40.730610, lng: -73.935242};
    this.markers = [];
    this.markersInBounds = 7; //number of markers to show in visible map area
    this.mapRef = React.createRef();
  }
  
  // build an array of all possible markers for the search
  doMarkerSetup() {
    const cols = this.props.columns;
    this.props.locations.forEach((location, i) => {
      const pos = {
        lat: location[cols.map_location].lat,
        lng: location[cols.map_location].long
      };
      const markerConfig = {
        map: this.gmap,
        position: pos,
        animation: window.google.maps.Animation.DROP
      };
      this.markers.push(new window.google.maps.Marker(markerConfig));

      if (i < this.markersInBounds) {
        this.bounds.extend(new window.google.maps.LatLng(pos.lat, pos.lng));
        if (i + 1 === this.markersInBounds) {
          this.gmap.fitBounds(this.bounds);
        }
      }
    });
  }

  doMarkerDestroy() {
    this.markers.forEach(m => m.setMap(null));
    this.markers = [];
  }
  
  getMarkerInfoWindow() {
    
  }


  mapMarkerClickHandler() {

  }



  componentDidMount() {
    this.gmap = new window.google.maps.Map(this.mapRef.current, {
      center: this.defaultLatLng,
      zoom: 8,
      scrollwheel: false,
      styles: lightDream
    });
    this.bounds = new window.google.maps.LatLngBounds();
    this.setState({
      initialized: true
    });
  }
  
  componentDidUpdate(prevProps, prevState) {
    
    // when locations become available for first time (searchpos is gauranteed)
    if (prevProps.locations.length === 0 && this.props.locations.length > 1) {
      this.doMarkerSetup();
      this.gmap.panTo(this.props.searchpos);
    }
    
    // locations have changed, another search happened
    // should pan to geocoded coords
    if (prevProps.locations !== this.props.locations) {

    }

    console.log('Map Update:');
    console.log('Prev Props: ', prevProps);
    console.log('Prev State: ', prevState);
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