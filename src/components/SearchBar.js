import React from 'react';



class SearchBar extends React.Component {

  constructor() {
    super();
  }


  render() {
    return(
      <div className="hubdb-searchbar">
        <div className="hubdb-searchbar--liner">

          <div className="hubdb-searchbar--col hubdb-searchbar--location">
            <label htmlFor="location-input">Your Location</label>
            <input type="text" placeholder="Enter Your Location" id="location-input" />
          </div>

        </div>
      </div>
    );
  }
};

export default SearchBar;