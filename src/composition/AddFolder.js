import React from 'react';
import MainWrapper from './MainWrapper';
import ValidationError from './ValidationError';
import AddFolderError from './AddFolderError';
import NotefulContext from '../NotefulContext';
import { validateName } from '../validate';
import config from '../config';
import './AddFolder.css';

class AddFolder extends React.Component {
  state = {
    name: {
      value: '',
      touched: false
    }
  }

  static contextType = NotefulContext;

  postFolderRequest(event, postFolderCb) {
    event.preventDefault();
    const name = this.state.name.value;

    fetch(config.API_URL + 'folders', {
      method: 'POST',
      body: JSON.stringify({name}),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        response.json().then(error => {
          throw error;
        });
      }
      return response.json();
    })
    .then(responseJson => {
      postFolderCb(responseJson);
      this.props.history.push('/');
    })
    .catch(err => console.log(err));
  }

  handleChange(event) {
    this.setState({
      name: {
        value: event.target.value,
        touched: true
      }
    })
  }

  render() {
    const nameError = validateName(this.state.name.value);
    return (
      <AddFolderError>
        <MainWrapper>
          <form 
            className="form__container"
            onSubmit={(e) => this.postFolderRequest(e, this.context.addFolder)}>
            <h1>Add folder</h1>
            <div className="form__group">
              <label htmlFor="name">Folder Name:</label>
              <input 
                name="name"
                id="name"
                value={this.state.name.value}
                onChange={(e) => this.handleChange(e)} />
              {this.state.name.touched && (
                <ValidationError message={nameError}/>
              )}
            </div>
            <div className="form__group">
              <button 
                type="submit"
                disabled={nameError}>
                  Add folder
              </button>
            </div>
          </form>
        </MainWrapper>
      </AddFolderError>
    );
  }
}

export default AddFolder;