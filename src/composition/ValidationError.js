import React from 'react';
import './ValidationError.css';

function ValidationError(props) {
  if(props.message) {
    return (
      <div className="error">{props.message}</div>
    );
  }

  return <></>
}

export default ValidationError;