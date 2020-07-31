import React from 'react';
import {  Link, Route, Switch } from 'react-router-dom';
import MainSection from './composition/MainSection';
import AddFolder from './composition/AddFolder';
import AddNote from './composition/AddNote';
import NotFoundPage from './composition/NotFoundPage';
import NotefulContext from './NotefulContext';
import config from './config';
import "./App.css";

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      store: {
        folders: [],
        notes: []
      }
    }
  }

  componentDidMount() {
    // retrieve data from api
    Object.keys({...this.state.store}).forEach(key => {
      fetch(`${config.API_URL}${key}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        },
      })
      .then(response => {
        if (!response.ok) {
          return response.json.then(error => {
            throw error;
          })
        }
        return response.json();
      })
      .then(resJson => {
        // console.log({...this.state.store, [key]: resJson});
        const data = (key === "notes") ? resJson.map(note => ({...note, folderId: note.folder_id}) ) : resJson; 
  
        this.setState({
          store: {
            ...this.state.store,
            [key]: data
          },
        });
      })
      .catch(err => {
        console.log(err);
      })
    });
  }


  deleteNote = (noteId) => {
    const notes = this.state.store.notes.filter(note => note.id !== noteId);
    this.setState({
      store: {
        ...this.state.store,
        notes
      }      
    })
  }

  addFolder = (folderObj) => {
    this.setState({
      store: {
        ...this.state.store,
        folders: [...this.state.store.folders, folderObj]
      }
    })
  }

  addNote = (noteObj) => {
    this.setState({
      store: {
        ...this.state.store,
        notes: [...this.state.store.notes, noteObj]
      }
    })
  }

  getCurrentNoteData = (id) => {
    // add folderName to our note data obj and wrap in an array b/c our component expects an array
    // convert id string retrieved from url params to a number with the unary plus operator
    const note = this.state.store.notes.find(note => note.id === +id);
  
    // if folders and notes not available return empty array
    // necessary because getCurrentNoteData fires before componentDidMount fetches data
    // when using the back button in browser
    if (this.state.store.folders.length && note) {      
      // we need the current note folder name to display in the sidebar so add it to the note we just retrieved
      note["folderName"] = this.state.store.folders.find(folder => folder.id === note.folderId).name;
      return [note];
    }

    return [];
  }

  render() {

    console.log(this.getCurrentNoteData())
    const contextValue = {
      store: this.state.store,
      deleteNote: this.deleteNote,
      addFolder: this.addFolder,
      addNote: this.addNote,
      getCurrentNoteData: this.getCurrentNoteData,
    }

    return (
      <div className="App">
        <header>
          <Link to="/">
            <h1>Noteful</h1>
          </Link>
        </header>
        <NotefulContext.Provider value={contextValue}>
          <>
            <Switch>
              <Route exact path="/" component={MainSection}/>
              <Route exact path="/folder/new" component={AddFolder} />
              <Route path="/folder/:folderId" component={MainSection}/>
              <Route exact path="/note/new" component={AddNote} />
              <Route path="/note/:noteId" component={MainSection}/>
              <Route component={NotFoundPage} />
            </Switch>
          </>
        </NotefulContext.Provider>
      </div>
    );
  }
}

export default App;
