
import React from 'react';

import '../scss/google-map.scss';

class GoogleMap extends React.Component {

  constructor() {
    super();
  }
  

  componentDidMount() {

  }


  render() {
    return(
      <div className="hubdb-gmap">
        <div className="hubdb-gmap--liner">
          <div id="hubdb-gmap-target"></div>
        </div>
      </div>
    );
  }
};

export default GoogleMap;