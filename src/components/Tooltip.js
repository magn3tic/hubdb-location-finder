import React from 'react';

export default function Tooltip(props) {
  const { message } = props;

  return (
    <div className="hubdb-tooltip">
      <div className="hubdb-tooltip--liner">
        <p className="hubdb-tooltip--message">{ message }</p>
      </div>
    </div>
  );
}
