import React from 'react';

function SidebarWrapper(props) {
  return (
    <nav>
      <div className="sidebar__container">
        {props.children}
      </div>
    </nav>
  );
}
 
export default SidebarWrapper;