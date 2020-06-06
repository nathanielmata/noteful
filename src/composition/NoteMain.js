import React from 'react';
import './NoteMain.css';

function NoteMain(props) {
  console.log(props.store);
  return (
    <>
      <ul>
        {props.store.notes.map(note => {
          return (
            <li
              key={note.id}
              className="note__card">
              <h1>{note.name}</h1>
              <div>
                <span>{note.modified}</span>
                <button>Delete Note</button>
              </div>
            </li>
          );
        })}
      </ul>
      <button>Add note</button>
    </>
  )
}

export default NoteMain;