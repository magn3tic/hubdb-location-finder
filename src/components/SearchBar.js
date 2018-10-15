import React from 'react';

import '../scss/search-bar.scss';

class SearchBar extends React.Component {

  constructor() {
    super();
  }
  

  submitHandler(e) {
    e.preventDefault();

  }

  render() {
    
    const onFormSubmit = this.submitHandler.bind(this);

    return(
      <div className="hubdb-searchbar">
        <div className="hubdb-searchbar--liner">
        
          <form onSubmit={onFormSubmit}>
            <div className="hubdb-searchbar--col hubdb-searchbar--location">
              <label htmlFor="location-input">Your Location</label>
              <input type="text" placeholder="Enter Your Location" id="location-input" />
            </div>

            <div className="hubdb-searchbar--col hubdb-searchbar--radius">
              <label htmlFor="radius-input">Search Radius</label>
              <select id="radius-input">
                <option value="10">10 mi</option>
                <option value="25">25 mi</option>
                <option value="50">50 mi</option>
                <option value="100">100 mi</option>
                <option value="200">200 mi</option>
              </select>
            </div>

            <div className="hubdb-searchbar--col hubdb-searchbar--resultscount">
              <label htmlFor="resultscount-input">Results</label>
              <select name="resultscount" id="resultscount-input">
                <option value="25">25</option>
                <option value="25">50</option>
                <option value="25">75</option>
                <option value="25">100</option>
              </select>
            </div>
            
            <div className="hubdb-searchbar--col">
              <button type="submit" className="hubdb-searchbtn">
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