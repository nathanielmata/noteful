import React from 'react';
import {  Link, Route, Switch } from 'react-router-dom';
import MainSection from './composition/MainSection';
import SidebarSection from './composition/SidebarSection';
import AddFolder from './composition/AddFolder';
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
      },
      notFound: false
    }
  }

  componentDidMount() {
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
      .then(responseJson => {
        // console.log({...this.state.store, [key]: responseJson});
        this.setState({
          store: {
            ...this.state.store,
            [key]: responseJson
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

  notFoundState = (bool) => {
    this.setState({
      notFound: bool
    });
  }

  getCurrentNoteData = (id) => {
    // add folderName to our note data obj and wrap in an array b/c our component expects an array 
    const note = this.state.store.notes.find(note => note.id === id);
    
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
    const contextValue = {
      store: this.state.store,
      deleteNote: this.deleteNote,
      addFolder: this.addFolder,
      notFoundState: this.notFoundState,
      getCurrentNoteData: this.getCurrentNoteData,
    }

    console.log(this.state.notFound);
    return (
      <div className="App">
        <header>
          <Link to="/">
            <h1>Noteful</h1>
          </Link>
        </header>
        <NotefulContext.Provider value={contextValue}>
          {this.state.notFound === false &&
            <nav>
              <Switch>
                <Route exact path="/" component={SidebarSection} />
                <Route path="/folder/:folderId" component={SidebarSection} />
                <Route path="/note/:noteId" component={SidebarSection} />
              </Switch>
            </nav>
          }
          <main>
            <Switch>
              <Route exact path="/" component={MainSection}/>
              <Route exact path="/folder/new" component={AddFolder} />
              <Route path="/folder/:folderId" component={MainSection}/>
              <Route path="/note/:noteId" component={MainSection}/>
              <Route render={(props) => {
                return (
                  <NotFoundPage
                    renderNotFound={() => {this.notFoundState()}} />
                );
              }} />
            </Switch>
          </main>
        </NotefulContext.Provider>
      </div>
    );
  }
}

export default App;
