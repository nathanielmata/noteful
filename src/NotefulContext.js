import React from 'react';

const NotefulContext = React.createContext({
  store: {
    folders: [],
    notes: []
  },
  deleteNote: () => {},
  notFoundState: () => {},
  getCurrentNoteData: () => {},
});

export default NotefulContext;