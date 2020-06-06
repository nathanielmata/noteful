import React from 'react';
import './SidebarSection.css';

function SidebarSection(props) {
  const params = props.match.params;
  const folders = props.data.map(folder => {
    return (
      <React.Fragment key={folder.id}>
        <button 
          className={`sidebar__item ${params.folderId === folder.id ? "sidebar__selected" : ""} `}
          linkpath={params.noteId ? "goBack" : `/folder/${folder.id}`}
          onClick={params.noteId
            ? () => props.history.goBack()
            : () => props.handleClick({folderId: folder.id, history: props.history})}>
          {params.noteId ? <span>Go back</span> : folder.name }
        </button>
        {params.noteId && 
          <h1>{folder.folderName}</h1>
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