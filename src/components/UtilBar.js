
import React from 'react';


const UtilBar = ({backToTop}) => {

  return(
    <div className="hubdb-utilbar">
      <div className="hubdb-utilbar--backtop">
        <button onClick={e => backToTop(e)}>Back To Top</button>
      </div>
    </div>
  );
};

export default UtilBar;