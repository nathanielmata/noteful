import React from 'react';
import { Link } from 'react-router-dom';
import NotefulContext from '../NotefulContext';
import './MainSection.css';

class MainSection extends React.Component { 
  static contextType = NotefulContext;

  componentDidMount() {
    this.context.notFoundState(false);
  }

  deleteNoteRequest(noteId, deleteNoteCb) {
    fetch(this.context.fetchURL + `notes/${noteId}`, {
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

  render() {
    const params = this.props.match.params;
    let data = params.noteId 
      ? this.context.getCurrentNoteData(params.noteId) 
      : this.context.store.notes;

    if (params.folderId) {
      data = this.context.store.notes.filter(note => note.folderId === params.folderId);
    }

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
              <span>{note.modified}</span>
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
      <div className="main__container">
        {params.noteId ? notes[0] : listWrapper(notes)}
        {!params.noteId &&
          <button>Add note</button>
        }
      </div>
    );
  }
}

// wrap notes in a list
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