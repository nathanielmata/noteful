import React from 'react';
import { Link } from 'react-router-dom';
import './SidebarSection.css';

function SidebarSection(props) {
  const params = props.match.params;
  const folders = props.data.map(folder => {
    return (
      <React.Fragment key={folder.id}>
        {!params.noteId &&
          <Link
            to={`/folder/${folder.id}`}
            className={`sidebar__item${params.folderId === folder.id ? " sidebar__selected" : ""}`}>
            {folder.name}
          </Link>
        }

        {params.noteId && 
          <>
            <button className="sidebar__item" onClick={() => props.history.goBack()}>
              Go back
            </button>
            <h1>{folder.folderName}</h1>
          </>
        }
      </React.Fragment>
    )
  })

  return (
    <div className="sidebar__container">
      {params.noteId 
        ? folders
        : listWrapper(folders)}
      {!params.noteId &&
        <button>Add note</button>
      }
    </div>
  )
}

// wrap folders in a list
function listWrapper(folders) {
  return (
    <ul>
      {folders.map((folder, idx) => 
        <li key={idx}>{folder}</li>
      )}
    </ul>
  );
}

export default SidebarSection;