
import React from 'react';
import { lightDream } from '../mapthemes/themes.js';

import '../scss/google-map.scss';


class GoogleMap extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      activeIndex: false
    };
    
    this.gmap = null;
    this.bounds = null;
    this.defaultLatLng = {lat: 40.730610, lng: -73.935242};

    this.mapRef = React.createRef();
  }
  

  doMarkerSetup() {
    this.markers = [];
    const cols = this.props.columns;

    this.props.locations.forEach(location => {
      console.log(location);
      const markerConfig = {
        map: this.gmap,
        position: {
          lat: location[cols.map_location].lat,
          lng: location[cols.map_location].long
        },
        animation: window.google.maps.Animation.DROP
      };
      this.markers.push(new window.google.maps.Marker(markerConfig));
    });
    
    /****** TODO ******* why no markers ??? ***/

    console.log(this.markers);
  }

  componentDidMount() {
    this.gmap = new window.google.maps.Map(this.mapRef.current, {
      center: this.props.searchpos.lat ? this.props.searchpos : this.defaultLatLng,
      zoom: 8,
      scrollwheel: false,
      styles: lightDream
    });

    this.markers = [];
    const cols = this.props.columns;

    this.props.locations.forEach(location => {
      console.log(location);
      const markerConfig = {
        map: this.gmap,
        position: {
          lat: location[cols.map_location].lat,
          lng: location[cols.map_location].long
        },
        animation: window.google.maps.Animation.DROP
      };
      this.markers.push(new window.google.maps.Marker(markerConfig));
    });
  }


  render() {
    
    return(
      <div className="hubdb-gmap" data-search-pos={JSON.stringify(this.props.searchpos)}>
        <div className="hubdb-gmap--liner">
          <div id="hubdb-gmap-target" ref={this.mapRef}></div>
        </div>
      </div>
    );
  }
};

export default GoogleMap;