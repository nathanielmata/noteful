import React from 'react';
import { Link } from 'react-router-dom';
import './MainSection.css';

function MainSection(props) { 
  const params = props.match.params;
  const notes = props.data.map(note => {
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