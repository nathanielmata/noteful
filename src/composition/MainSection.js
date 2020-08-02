import React from 'react';
import { Link } from 'react-router-dom';
import MainWrapper from './MainWrapper';
import SidebarWrapper from './SidebarWrapper';
import SidebarSection from './SidebarSection';
import MainError from './MainError';
import NotefulContext from '../NotefulContext';
import config from '../config';
import './MainSection.css';

class MainSection extends React.Component { 
  static contextType = NotefulContext;

  deleteNoteRequest(note_id, deleteNoteCb) {
    fetch(config.API_URL + `notes/${note_id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
    .then(response => {
      if (!response.ok) {
        response.json().then(error => {
          throw error;
        })
      }
      return response;
    })
    .then(responseJson => {
      deleteNoteCb(note_id)
      if (this.props.match.params.note_id) {
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
    let data = params.note_id 
      ? this.context.getCurrentNoteData(params.note_id) 
      : this.context.store.notes;

    if (params.folder_id) {
      // convert params.folder_id string retrieved from url params to a number with the unary plus operator
      data = this.context.store.notes.filter(note => note.folder_id === +params.folder_id);
    }

    // iterate over main note data
    const notes = data.map(note => {
      return (
        <>
          <div className="note__card">
            <h1>
              {!params.note_id &&
                <Link
                  to={`/note/${note.id}`}
                  className="note__card--name note__card--click">
                  {note.name}
                </Link>
              }

              {params.note_id &&
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
          {params.note_id &&
            <p>{note.content}</p>
          }
        </>
      );
    });
  
    return (
      <MainError>
        <SidebarWrapper>  
          <SidebarSection 
            {...this.props}
            getCurrentNoteData={this.context.getCurrentNoteData}
            allFolders={this.context.store.folders}
          />
        </SidebarWrapper>
        <MainWrapper>
          {params.note_id ? notes[0] : listWrapper(notes)}
          {!params.note_id &&
            <button onClick={() => this.props.history.push('/note/new')}>Add note</button>
          }
        </MainWrapper>
      </MainError>
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