
import React from 'react';


class UtilBar extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    return(
      <div className="hubdb-utilbar">
        <div className="hubdb-utilbar--backtop">
          <button>Back To Top</button>
        </div>
        
      </div>
    );
  }
};

export default UtilBar;