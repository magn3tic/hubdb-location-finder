
import React from 'react';
import ClassNames from 'classnames';
import Tooltip from './Tooltip';
import '../scss/search-bar.scss';


class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false //'location', 'radius', etc
    };
    this.locationInputRef = React.createRef();
  }

  fieldFocusHandler(value) {
    this.setState({ focused: value });
  }
  fieldBlurHandler() {
    this.setState({ focused: false });
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.focusLocation && this.props.focusLocation) {
      this.locationInputRef.current.focus();
    }
  }

  render() {
    const _onFormSubmit = this.props.handlers.submit;
    const _onLocationChange = this.props.handlers.location;
    const _onRadiusChange = this.props.handlers.radius;
    const _onResultscountChange = this.props.handlers.resultscount;
    const _onCollectionsChange = this.props.handlers.collections;

    const focusOpts = ['location', 'radius', 'results', 'collection'];
    const colClasses = {};
    
    focusOpts.forEach(item => {
      const colOpts = { 
        'hubdb-searchbar--col': true,
        'is-focused': this.state.focused === item 
      };
      colOpts[`hubdb-searchbar--${item}`] = true;
      colClasses[item] = ClassNames(colOpts);
    });

    const { collections } = this.props.fieldvals;

    return(
      <div className="hubdb-searchbar">
        <div className="hubdb-searchbar--liner">
        
          <form className="hubdb-searchform" onSubmit={e => _onFormSubmit(e)}>

            <div className={colClasses.location}>
              <label htmlFor="location-input">Location</label>
              <input type="text" placeholder="City, State, or Zip" 
                     id="location-input" onChange={e => _onLocationChange(e)} value={this.props.fieldvals.location} 
                     autoComplete="off" onFocus={e => this.fieldFocusHandler('location')} onBlur={e => this.fieldBlurHandler(e)}
                     ref={this.locationInputRef} />
            </div>
            
            <div className={colClasses.collection}>
              <label htmlFor="">Collection</label>
              <div className="hubdb-searchform--dropdown-panel" tabIndex="0">
                <div className="hubdb-searchform--chkbx">
                  <input type="radio" name="collection" id="western-chkbx" value="western-collection" 
                         onChange={e => _onCollectionsChange(e)} 
                         checked={collections.indexOf('western-collection') !== -1}
                         onFocus={e => this.fieldFocusHandler('collection')} onBlur={e => this.fieldBlurHandler(e)} />
                  <label htmlFor="western-chkbx">
                    <span className="hubdb-chkbx-fake"></span>
                    <span>Western</span>
                  </label>
                </div>
                <div className="hubdb-searchform--chkbx">
                  <input type="radio" name="collection" id="carolina-chkbx" value="carolina-collection" 
                         onChange={e => _onCollectionsChange(e)} 
                         checked={collections.indexOf('carolina-collection') !== -1}
                         onFocus={e => this.fieldFocusHandler('collection')} onBlur={e => this.fieldBlurHandler(e)} />
                  <label htmlFor="carolina-chkbx">
                    <span className="hubdb-chkbx-fake"></span>
                    <span>Carolina</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className={colClasses.radius}>
              <label htmlFor="radius-input">Radius</label>
              <select name="radius" id="radius-input" onChange={e => _onRadiusChange(e)}
                      onFocus={e => this.fieldFocusHandler('radius')} value={this.props.fieldvals.radius}>
                <option value="10">10 mi</option>
                <option value="25">25 mi</option>
                <option value="50">50 mi</option>
                <option value="100">100 mi</option>
                <option value="200">200 mi</option>
              </select>
              <span className="select-caret">
                <i className="icon-arrow-down" aria-hidden="true"></i>
              </span>
            </div>

            <div className={colClasses.results}>
              <label htmlFor="resultscount-input">Results</label>
              <select name="resultscount" id="resultscount-input" onChange={e => _onResultscountChange(e)} 
                      value={this.props.fieldvals.resultscount}>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="75">75</option>
                <option value="100">100</option>
              </select>
              <span className="select-caret">
                <i className="icon-arrow-down" aria-hidden="true"></i>
              </span>
            </div>
            
            <div className="hubdb-searchbar--col hubdb-searchbar--button">
              <button type="submit" className="hubdb-searchbtn" style={{backgroundColor: this.props.color}}
                      disabled={this.props.fieldvals.location.length < 2 || collections.length === 0}>
                <span>Search</span>
              </button>
              { collections.length < 1 && <Tooltip message="Please enter your location & select a collection first." /> }
            </div>

          </form>

        </div>
      </div>
    );
  }
};

export default SearchBar;