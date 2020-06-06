import React from 'react';

function Note(props) {
  // console.log(props);
  const note = props.store.notes.find(note => note.id === props.match.params.id.toString());
  return (
    <div className="note__container">
      <ul>   
        <li
          key={note.id}
          className="note__card">
          <h1>{note.name}</h1>
          <div>
            <span>{note.modified}</span>
            <button>Delete Note</button>
          </div>
        </li>
      </ul>
      <p>{note.content}</p>
    </div>
  )
}

export default Note;