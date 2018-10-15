import React, { Component } from 'react';

import SearchBar from './components/SearchBar';


class App extends Component {
  
  constructor() {
    super();
    
    this.state = {
      ready: false
    };
  }


  render() {
    return (
      <div className="hubdb-location-finder">
        <SearchBar ready={this.state.ready} />
      </div>
    );
  }

};

export default App;
