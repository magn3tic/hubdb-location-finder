
import React from 'react';
import ClassNames from 'classnames';
import '../scss/search-bar.scss';


class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false //'location', 'radius', 'results'
    };
  }

  fieldFocusHandler(value) {
    this.setState({ focused: value });
  }

  render() {
    const _onFormSubmit = this.props.handlers.submit;
    const _onLocationChange = this.props.handlers.location;
    const _onRadiusChange = this.props.handlers.radius;
    const _onResultscountChange = this.props.handlers.resultscount;

    const radiusClasses = ClassNames({
      'hubdb-searchbar--col': true,
      'hubdb-searchbar--radius': true,
      'is-focused': this.state.focused === 'radius'
    });

    return(
      <div className="hubdb-searchbar">
        <div className="hubdb-searchbar--liner">
        
          <form className="hubdb-searchform" onSubmit={e => _onFormSubmit(e)}>
            
            <div className="hubdb-searchbar--col hubdb-searchbar--location">
              <label htmlFor="location-input">Location</label>
              <input type="text" placeholder="City, State, or Zip" 
                     id="location-input" onChange={e => _onLocationChange(e)} 
                     value={this.props.fieldvals.location} autoComplete="off" />
            </div>

            <div className={radiusClasses}>
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

            <div className="hubdb-searchbar--col hubdb-searchbar--resultscount">
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
                      disabled={this.props.fieldvals.location.length < 2}>
                <span>Search</span>
              </button>
            </div>

          </form>

        </div>
      </div>
    );
  }
};

export default SearchBar;