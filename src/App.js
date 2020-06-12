import React from 'react';
import {  Link, Route, Switch } from 'react-router-dom';
import MainSection from './composition/MainSection';
import SidebarSection from './composition/SidebarSection';
import NotFoundPage from './composition/NotFoundPage';
import NotefulContext from './NotefulContext';
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

    this.fetchURL = "http://localhost:9090/";
  }

  componentDidMount() {
    Object.keys({...this.state.store}).forEach(key => {
      fetch(`${this.fetchURL}${key}`, {
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


  deleteNote = () => {
    return false;
  }

  notFoundState = (bool) => {
    this.setState({
      store: this.state.store,
      notFound: bool
    });
  }

  getCurrentNoteData = (id) => {
    // if folders and notes not available return empty array
    // necessary because getCurrentNoteData fires before componentDidMount fetches data
    // when using the back button in browser
    if (!this.state.store.folders.length || !this.state.store.notes.length) {
      return [];
    }  

    // add folderName to our note data obj and wrap in an array b/c our component expects an array 
    const note = this.state.store.notes.find(note => note.id === id);

    // we need the current note folder name to display in the sidebar so add it to the note we just retrieved
    note["folderName"] = this.state.store.folders.find(folder => folder.id === note.folderId).name;
    return [note];
  }

  render() {
    const contextValue = {
      store: this.state.store,
      deleteNote: this.deleteNote,
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
              <Route path="/folder/:folderId" component={MainSection}/>
              <Route path="/note/:noteId" component={MainSection}/>
              <Route render={(props) => {
                return (
                  <NotFoundPage
                    renderNotFound={() => {this.notFoundState(true)}} />
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
