import React from 'react';

class NotFoundPage extends React.Component {
  componentDidMount() {
    this.props.renderNotFound(true);
  }

  render() {
    return (
      <div className="notfound__container">
        Page not found
      </div>
    );
  }
}

export default NotFoundPage;