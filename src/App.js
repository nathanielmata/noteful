import React from "react";
import { Route, Link } from "react-router-dom";
import MainSection from './composition/MainSection'
import SidebarSection from './composition/SidebarSection'
import "./App.css";

class App extends React.Component {
  state = {
    store: this.props.store
  }

  getCurrentNoteData = (store, props) => {
    // add folderName to our note data obj and wrap in an array b/c our component expects an array 
    const note = store.notes.find(note => note.id === props.match.params.noteId);
    // we need the current note folder name to display in the sidebar
    note["folderName"] = store.folders.find(folder => folder.id === note.folderId).name;
    return [note];
  }

  // handle click on any element that connects to a dynamic route
  // likely better to use React-Router NavLink here but
  // callback with click can also be useful if there is any logic that needs to be executed on click
  // unfortunately this solution also breaks the semantic use of anchor tag for linking
  handleRouteClick = (props) => {
    if (props.folderId) {
      props.history.push(`/folder/${props.folderId}`);
    }

    if (props.noteId) {
      props.history.push(`/note/${props.noteId}`);
    }
  }

  render() {
    const store = this.state.store;
    return (
      <div className="App">
        <header>
          <Link to="/">
            <h1>Noteful</h1>
          </Link>
        </header>
        <nav className="sidebar">
          <Route exact path="/" render={(props) =>
            <SidebarSection
              {...props}
              data={store.folders}
              handleClick={(props) => this.handleRouteClick(props)} />
            }
          />
          <Route path="/folder/:folderId" render={(props) =>
            <SidebarSection
              {...props}
              data={store.folders}
              handleClick={(props) => this.handleRouteClick(props)} />
            }
          />
          <Route path="/note/:noteId" render={(props) => 
            <SidebarSection 
              {...props}
              data={this.getCurrentNoteData(store, props)} />
            }
          />
        </nav>
        <main>
          <Route exact path="/" render={(props) =>
            <MainSection
              {...props}
              data={store.notes}
              handleClick={(props) => this.handleRouteClick(props)} />
            }
          />

          <Route path="/folder/:folderId" render={(props) => 
            <MainSection 
              {...props}
              data={store.notes.filter(note => note.folderId === props.match.params.folderId)}
              handleClick={(props) => this.handleRouteClick(props)} />
            }
          />

          <Route path="/note/:noteId" render={(props) => 
            <MainSection 
              {...props}
              data={this.getCurrentNoteData(store, props)} />
            }
          />
        </main>
      </div>
    );
  }
}

export default App;
