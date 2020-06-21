import React from 'react';

const NotefulContext = React.createContext({
  store: {
    folders: [],
    notes: []
  },
  deleteNote: () => {},
  getCurrentNoteData: () => {},
});

export default NotefulContext;