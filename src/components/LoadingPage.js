import React from "react";

function LoadingPage() {
  return (
    <div className="notes-app">
      <header className="align-center">
        <h1>Note</h1>
      </header>
      <div className="loading-authed">
        <div className="loading">
          Let Note take a moment to load...
          <div className="gooey">
            <span className="dot"></span>
            <div className="dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingPage;