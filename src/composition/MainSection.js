import React from 'react';
import { Link } from 'react-router-dom';
import MainWrapper from './MainWrapper';
import SidebarWrapper from './SidebarWrapper';
import SidebarSection from './SidebarSection';
import NotefulContext from '../NotefulContext';
import config from '../config';
import './MainSection.css';

class MainSection extends React.Component { 
  static contextType = NotefulContext;

  deleteNoteRequest(noteId, deleteNoteCb) {
    fetch(config.API_URL + `notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        response.json().then(error => {
          throw error;
        })
      }
      return response.json();
    })
    .then(responseJson => {
      deleteNoteCb(noteId)
      if (this.props.match.params.noteId) {
        this.props.history.push('/');
      }
    })
    .catch(err => console.log(err));
  }

  localizeNoteDate(date) {
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  render() {
    const params = this.props.match.params;
    let data = params.noteId 
      ? this.context.getCurrentNoteData(params.noteId) 
      : this.context.store.notes;

    if (params.folderId) {
      data = this.context.store.notes.filter(note => note.folderId === params.folderId);
    }

    // iterate over main note data
    const notes = data.map(note => {
      return (
        <>
          <div className="note__card">
            <h1>
              {!params.noteId &&
                <Link
                  to={`/note/${note.id}`}
                  className="note__card--name note__card--click">
                  {note.name}
                </Link>
              }

              {params.noteId &&
                <span className="note__card--name">
                  {note.name}
                </span>
              }
            </h1>
            <div>
              <span>Date modified: {this.localizeNoteDate(note.modified)}</span>
              <button onClick={() => {
                  this.deleteNoteRequest(note.id, this.context.deleteNote)
                }}>Delete Note</button>
            </div>
          </div>
          {params.noteId &&
            <p>{note.content}</p>
          }
        </>
      );
    });
  
    return (
      <>
        <SidebarWrapper>  
          <SidebarSection 
            {...this.props}
            getCurrentNoteData={this.context.getCurrentNoteData}
            allFolders={this.context.store.folders}
          />
        </SidebarWrapper>
        <MainWrapper>
          {params.noteId ? notes[0] : listWrapper(notes)}
          {!params.noteId &&
            <button onClick={() => this.props.history.push('/note/new')}>Add note</button>
          }
        </MainWrapper>
      </>
    );
  }
}

// wrap notes in a unordered list
function listWrapper(notes) {
  return (
    <ul>
      {notes.map((note, idx) => 
        <li key={idx}>{note}</li>
      )}
    </ul>
  );
}

export default MainSection;