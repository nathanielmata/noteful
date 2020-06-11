import React from "react";
import {  Link, Route, Switch } from "react-router-dom";
import MainSection from './composition/MainSection';
import SidebarSection from './composition/SidebarSection';
import NotFoundPage from "./composition/NotFoundPage";
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

  notFoundState = (bool) => {;
    this.setState({
      store: this.state.store,
      notFound: bool
    });
  }

  getCurrentNoteData = (store, props) => {
    // add folderName to our note data obj and wrap in an array b/c our component expects an array 
    const note = store.notes.find(note => note.id === props.match.params.noteId);
    // we need the current note folder name to display in the sidebar
    note["folderName"] = store.folders.find(folder => folder.id === note.folderId).name;
    return [note];
  }

  render() {
    const store = this.state.store;
    return (
      <div className="App">
        <header>
          <Link to="/" onClick={() => {this.notFoundState(false)}}>
            <h1>Noteful</h1>
          </Link>
        </header>
        <nav className={this.state.notFound === true
          ? "sidebar__hide"
          : "sidebar"}>
          <Switch>
            <Route exact path="/" render={(props) =>
              <SidebarSection
                {...props}
                data={store.folders}/>
              }
            />
            <Route path="/folder/:folderId" render={(props) =>
              <SidebarSection
                {...props}
                data={store.folders} />
              }
            />
            <Route path="/note/:noteId" render={(props) => 
              <SidebarSection 
                {...props}
                data={this.getCurrentNoteData(store, props)} />
              }
            />
          </Switch>
        </nav>
        <main>
          <Switch>
            <Route exact path="/" render={(props) =>
              <MainSection
                {...props}
                data={store.notes} />
              }
            />
            <Route path="/folder/:folderId" render={(props) => 
              <MainSection 
                {...props}
                data={store.notes.filter(note => note.folderId === props.match.params.folderId)} />
              }
            />
            <Route path="/note/:noteId" render={(props) => 
              <MainSection 
                {...props}
                data={this.getCurrentNoteData(store, props)} />
              }
            />
            <Route render={(props) => {
              return (
                <NotFoundPage
                  renderNotFound={() => {this.notFoundState(true)}} />
              );
            }} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
