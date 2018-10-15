import React from 'react';
import Axios from 'axios';
import SearchBar from './components/SearchBar';
import GoogleMap from './components/GoogleMap';


class App extends React.Component {
  
  constructor() {
    super();

    this.state = {
      loaded: false,
      ready: false
    };

    window.onload = () => {
      this.setState({ loaded: true });
    }
  }

  
  getMasterTable(portal, tableid) {

  }
  
  componentDidMount() {
    console.log(window.location);
  }


  render() {
    return (
      <div className="hubdb-locationfinder">
        <SearchBar ready={this.state.ready} />
        <div className="hubdb-locationfinder--body">
          <GoogleMap />
        </div>
      </div>
    );
  }

};

export default App;
