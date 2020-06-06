import React from 'react';
import './MainSection.css';

function MainSection(props) { 
  const params = props.match.params;
  const notes = props.data.map(note => {
    return (
      <>
        <div className="note__card">
          <h1
            className={`note__card--name${!params.noteId ? " note__card--click" : ""}`}
            linkpath={`/note/${note.id}`}
            onClick={params.noteId 
              ? () => null
              : () => props.handleClick({noteId: note.id, history: props.history})}>
            {note.name}
          </h1>
          <div>
            <span>{note.modified}</span>
            <button>Delete Note</button>
          </div>
        </div>
        {params.noteId &&
          <p>{note.content}</p>
        }
      </>
    );
  })

  return (
    <div className="main__container">
      {params.noteId ? notes[0] : listWrapper(notes)}
      {!params.noteId &&
        <button>Add note</button>
      }
    </div>
  )
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