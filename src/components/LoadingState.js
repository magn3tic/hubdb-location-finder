import React from 'react';
import ClassNames from 'classnames';

import '../scss/loading-state.scss';


const LoadingState = ({ paneltype, msg, color, close }) => {
  
  const classes = ClassNames({
    'hubdb-infopanel': true,
    'hubdb-infopanel--error': paneltype === 'error',
    'hubdb-infopanel--loading': paneltype === 'loading'
  });
  const dotStyles = {backgroundColor: color};

  return(
    <div className={classes}>
      <div className="hubdb-infopanel--liner">
        <p>{msg}</p>
        <button style={{color}} onClick={e => close(e)}>
          <span>Close</span>
        </button>
        <div className="hubdb-infopanel--loader">
          <span style={dotStyles}></span>
          <span style={dotStyles}></span>
          <span style={dotStyles}></span>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;