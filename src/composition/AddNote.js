import React from 'react';
import MainWrapper from './MainWrapper';
import ValidationError from './ValidationError';
import AddNoteError from './AddNoteError';
import NotefulContext from '../NotefulContext';
import { validateName, validateContent } from '../validate';
import config from '../config';
import './AddNote.css';

class AddNote extends React.Component {
  state = {
    name: {
      value: '',
      touched: false
    },
    content: {
      value: '',
      touched: false
    },
    folder_id: '',
  }

  static contextType = NotefulContext;

  postNoteRequest(event, postNoteCb) {
    event.preventDefault();
    const {name, content, folder_id} = {...this.state};
    const note = {
      name: name.value,
      content: content.value,
      modified: new Date().toJSON(),
      folder_id: +folder_id
    };

    fetch(config.API_URL + 'notes', {
      method: 'POST',
      body: JSON.stringify(note),
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      },
    })
    .then(response => {
      if (!response.ok) {
        response.json().then(error => {
          throw error;
        })
      }
      return response.json();
    })
    .then(responseJson => {
      postNoteCb(responseJson);
      this.props.history.push('/');
    })
    .catch(err => console.log(err))
  }

  handleNameChange(event) {
    this.setState({
      name: {
        value: event.target.value,
        touched: true
      } 
    })
  }
  handleContentChange(event) {
    this.setState({
      content: {
        value: event.target.value,
        touched: true
      } 
    })
  }
  handleFolderChange(event) {
    this.setState({
      folder_id: event.target.value
    })
  }

  render() {
    const nameError = validateName(this.state.name.value);
    const contentError = validateContent(this.state.content.value);
    return (
      <AddNoteError>
        <MainWrapper>
          <form
            className="form__container"
            onSubmit={(e) => this.postNoteRequest(e, this.context.addNote)}>
            <h1>Add Note</h1>
            <div className="form__group">
              <label htmlFor="name">Note Name:</label>
              <input 
                name="name"
                id="name"
                value={this.state.name.value}
                onChange={(e) => this.handleNameChange(e)} />
              {this.state.name.touched && (
                <ValidationError message={nameError}/>
              )}
            </div>
            <div className="form__group">
              <label htmlFor="name">Note Folder:</label>
              <select 
                name="folder"
                id="folder"
                value={this.state.folder_id}
                onChange={(e) => this.handleFolderChange(e)}>
                  {this.context.store.folders.map(folder => {
                    return (
                      <option key={folder.id} value={folder.id}>{folder.name}</option>
                    );
                  })}
              </select>
            </div>
            <div className="form__group">
              <label htmlFor="content">Note Content:</label>
              <textarea 
                className="note__textarea"
                name="content"
                id="content"
                rows={5}
                columns={30}
                maxLength={1000}
                value={this.state.content.value}
                onChange={(e) => this.handleContentChange(e)} />
              {this.state.content.touched && (
                <ValidationError message={contentError}/>
              )}
            </div>
            <div className="form__group">
              <button
                type="submit"
                disabled={nameError || contentError}>Add note</button>
            </div>
          </form>
        </MainWrapper>
      </AddNoteError>
    );
  }
}

export default AddNote;