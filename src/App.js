import React from 'react';
import Axios from 'axios';
import ClassNames from 'classnames';
import SearchBar from './components/SearchBar';
import GoogleMap from './components/GoogleMap';
import ResultsList from './components/ResultsList';
import LoadingState from './components/LoadingState';
import { apiBase, geoLocate, doGeocode, parseIfInt } from './lib/utilities.js';


class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      fetching: false,
      error: false,
      paneltype: 'loading',
      panelmsg: 'Loading...',
      geocode: true,
      searchPos: { lat: null, lng: null },
     
      location: '',
      radius: 50,
      resultscount: 50,
      
      tableinfo: {},
      tabledata: {},
      searchResults: [],
      focusedIndex: false
    };
    this.globalEventHandlers();
  }

  getAllTableData() {
    const getDetails = () => Axios.get(`${apiBase}/${this.props.table}?portalId=${this.props.portal}`);
    const getData = () => Axios.get(`${apiBase}/${this.props.table}/rows?portalId=${this.props.portal}&limit=2000`);
    
    Axios.all([getDetails(), getData()])
      .then(responses => {
        this.setState({
          tableinfo: responses[0].data,
          tabledata: responses[1].data,
          ready: true
        });
      });
  }

  getSearchResults() {
    const orderBy = `orderBy=geo_distance(${this.props.mapcol},${this.state.searchPos.lat},${this.state.searchPos.lng})`;
    Axios.get(`${apiBase}/${this.props.table}/rows?portalId=${this.props.portal}&limit=100&${orderBy}`)
      .then(response => {
        if (!response.data.objects) {
          this.setState({ error: true });
        } else {
          const searchResults = response.data.objects.map(obj => obj.values);
          //console.log('Search Results: ', searchResults);
          this.setState({ searchResults, fetching: false, loaded: true });
        }
      }).catch(err => {
        this.setState({ error: true, fetching: false });
        console.log('Search Error: ', err);
      });
  }

  globalEventHandlers() {
    window.onload = () => {
      //this.setState({ loaded: true });
    };
  }

  attemptGeolocate() {
    geoLocate().then(position => {
      this.setState({
        searchPos: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }, 
        geocode: false
      });
      this.getSearchResults();

    }).catch(message => {
      this.setState({ loaded: true });
    });
  }
  
  onSearchFormSubmit(e) {
    e.preventDefault();

    if (this.state.fetching) return;
    this.setState({ fetching: true });
    
    if (this.state.geocode && this.state.location) {
      doGeocode(this.state.location).then(res => {
        if (res.data.status === 'OK') {
          this.setState({ 
            searchPos: res.data.results[0].geometry.location, 
            geocode: false
          });
          this.getSearchResults();
        } else {
          this.setState({ fetching: false, error: true });
        }
      }).catch(err => {
        this.setState({ fetching: false, error: true });
        console.log(err);
      });
    } else {
      this.getSearchResults();
    }
  }
  
  //filter input handlers
  onLocationInput(e) {
    this.setState({ location: e.target.value, geocode: true });
  }
  onRadiusChange(e) {
    this.setState({ radius: parseIfInt(e.target.value) });
  }
  onResultsCountChange(e) {
    this.setState({ resultscount: parseIfInt(e.target.value) });
  }

  //location "focus" occurs when a marker is clicked
  onIndexFocus(index, closeout=false) {
    const focusedIndex = this.state.focusedIndex === index || closeout ? false : index;
    this.setState({ focusedIndex });
  }

  //attempt navigator.geolcation when app mounts
  componentDidMount() {
    this.attemptGeolocate();
  }

  render() {
    const searchBarHandlers = {
      submit: this.onSearchFormSubmit.bind(this),
      location: this.onLocationInput.bind(this),
      radius: this.onRadiusChange.bind(this),
      resultscount: this.onResultsCountChange.bind(this)
    };
    const markerClickHandler = this.onIndexFocus.bind(this);
    const { location, radius, resultscount } = this.state;
    const outerClasses = ClassNames({
      'hubdb-locationfinder': true,
      'hubdb-loading': !this.state.loaded || this.state.fetching,
      'hubdb-fetching': this.state.fetching,
      'hubdb-error': this.state.error
    });

    return (
      <div className={outerClasses}>
        <SearchBar ready={this.state.ready} handlers={searchBarHandlers} 
                   fieldvals={{location, radius, resultscount}} color={this.props.color} />
        <div className="hubdb-locationfinder--body">
          <ResultsList locations={this.state.searchResults} columns={this.props.columns} 
                       color={this.props.color} searchpos={this.state.searchPos} radius={radius} 
                       count={resultscount} focused={this.state.focused} itemFocus={markerClickHandler} />
          <GoogleMap locations={this.state.searchResults} columns={this.props.columns} 
                     searchpos={this.state.searchPos} fieldvals={{location, radius, resultscount}}
                     focused={this.state.focusedIndex} markerClick={markerClickHandler} />
        </div>
        <LoadingState paneltype={this.state.paneltype} msg={this.state.panelmsg} />
      </div>
    );
  }
};

export default App;
