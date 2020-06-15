import React from 'react';
import './AddFolder.css';
import NotefulContext from '../NotefulContext';
import config from '../config';

class AddFolder extends React.Component {
  state = {
    name: {
      value: '',
      touched: false
    }
  }

  static contextType = NotefulContext;

  componentDidMount() {
    this.context.notFoundState(false);
  }

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
    console.log(this.state.name.value);
    return (
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
        </div>
        <div className="form__group">
          <button type="submit">Add folder</button>
        </div>
      </form>
    );
  }
}

export default AddFolder;