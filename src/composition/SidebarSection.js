import React from 'react';
import { Link } from 'react-router-dom';
import NotefulContext from '../NotefulContext';
import './SidebarSection.css';

class SidebarSection extends React.Component {
  static contextType = NotefulContext;
  
  render() {
    const params = this.props.match.params;
    const data = params.noteId 
      ? this.context.getCurrentNoteData(params.noteId) 
      : this.context.store.folders;

    const folders = data.map(folder => {
      return (
        <React.Fragment key={folder.id}>
          {(() => {
            if (!params.noteId) {
              return (
                <Link
                  to={`/folder/${folder.id}`}
                  className={`sidebar__item${params.folderId === folder.id ? " sidebar__selected" : ""}`}>
                  {folder.name}
                </Link>
              );
            }
            
            return (
              <>
                <button className="sidebar__item" onClick={() => this.props.history.goBack()}>
                  Go back
                </button>
                <h1>{folder.folderName}</h1>
              </>
            );
          })()}
        </React.Fragment>
      );
    });

    return (
      <div className="sidebar__container">
        {(() => {
          if (!params.noteId){
            return (
              <>
                {listWrapper(folders)}
                <button onClick={() => this.props.history.push('/folder/new')}>Add folder</button>
              </>
            );
          }
          
          return <>{folders}</>;
        })()}
      </div>
    );
  }
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