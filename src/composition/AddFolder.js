import React from 'react';
import './AddFolder.css';
import config from '../config';

class AddFolder extends React.Component {
  state = {
    name: {
      value: '',
      touched: false
    }
  }

  // componentDidMount() {
  //   this.context.notFoundState(false);
  // }

  postFolderRequest(postFolderCb) {
    // generate a folder id for posting to api
    // or does the server generate one when you post
    fetch(config.API_URL + 'folders', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then()
    .then()
    .catch(err => console.log(err))
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
      <form className="form__container">
        <h1>Add folder</h1>
        <div className="form__group">
          <label htmlFor="name">Name:</label>
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