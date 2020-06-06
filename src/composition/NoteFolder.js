import React from 'react';

function NoteFolder(props) {
  console.log(props);
  const folderNotes = props.store.notes.filter(note => note.folderId === props.match.params.id.toString());
  return (
    <>
      <ul>
        {folderNotes.map(note => {
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

export default NoteFolder;