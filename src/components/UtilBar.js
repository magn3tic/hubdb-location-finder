
import React from 'react';


const UtilBar = ({backToTop, color}) => {

  return(
    <div className="hubdb-utilbar">
      <div className="hubdb-utilbar--backtop">
        <button onClick={e => backToTop(e)}>
          <div className="hubdb-utilbar--arr">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
            <span style={{color}}>Back To Top</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default UtilBar;