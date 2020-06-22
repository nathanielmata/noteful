import React from 'react';
import MainWrapper from './MainWrapper';
import './NotFoundPage.css';

function NotFoundPage() {
  return (
    <MainWrapper>
      <div className="notfound__container">
        <h1>Page not found</h1>
        <div>
          <a className="notfound__homelink" href="/">return Home</a>
        </div>
      </div>
    </MainWrapper>
  );
}

export default NotFoundPage;