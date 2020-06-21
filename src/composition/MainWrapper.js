import React from 'react';

function MainWrapper(props) {
  return (
    <main>
      <div className="main__container">
        {props.children}
      </div>
    </main>
  );
}
 
export default MainWrapper;