import React from 'react';
import MainWrapper from './MainWrapper';

class NotFoundPage extends React.Component {
  render() {
    return (
      <MainWrapper>
        <div className="notfound__container">
          Page not found
        </div>
      </MainWrapper>
    );
  }
}

export default NotFoundPage;