import React from 'react';
import { Link } from 'react-router-dom';
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