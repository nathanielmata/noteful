import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './SidebarSection.css';

function SidebarSection(props) {
  const params = props.match.params;
  const data = params.noteId 
    ? props.getCurrentNoteData(params.noteId) 
    : props.allFolders;

  // iterate over sidebar folder data
  const folders = data.map((folder, idx) => {
    return (
      <React.Fragment key={folder.id}>
        {
          (() => {
            // if route is not note page return folder links
            if (!params.noteId) {
              return (
                <li key={idx}>
                  <Link
                    to={`/folder/${folder.id}`}
                    className={`sidebar__item${params.folderId === folder.id ? " sidebar__selected" : ""}`}>
                    {folder.name}
                  </Link>
                </li>
              );
            }
            
            // if this is note page return back button and folder name
            return (
              <>
                <button className="sidebar__item" onClick={() => props.history.goBack()}>
                  Go back
                </button>
                <h1>{folder.folderName}</h1>
              </>
            );
          })()
        }
      </React.Fragment>
    );
  });

  return (
    <>
      {(() => !params.noteId
        ? listWrapper(folders, props.history)
        : folders   
      )()}
    </>
  );
}

SidebarSection.propTypes = {
  allFolders: PropTypes.arrayOf(PropTypes.object).isRequired,
  getCurrentNoteData: (props, propName, componentName) => {
    // first get the value of the prop
    const prop = props[propName];

    // is required check that it exists
    if(!prop) {
      return new Error(`${propName} is required in ${componentName}. Validation Failed`);
    }

    // check that the prop is a function
    if (typeof prop != 'function') {
      return new Error(`Invalid prop, ${propName} is expected to be a function in ${componentName}. ${typeof prop} found.`);
    }

    // check that the instantiated prop function returns an array
    if(!Array.isArray(prop())) {
      return new Error(`Invalid prop, ${propName} should return an array in ${componentName}. ${prop} found.`);
    }
  }
};

SidebarSection.defaultProps = {
  allFolders: []
};

// wrap folders in an unordered list
function listWrapper(folders, history ) {
  return (
    <>
      <ul>
        {folders}
      </ul>
      <button onClick={() => history.push('/folder/new')}>Add folder</button>
    </>
  );
}

export default SidebarSection;