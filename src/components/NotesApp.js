import React from "react";
import { Routes, Route } from "react-router-dom";
import SearchBarWrapper from "./SearchBar.js";
import { AddEditPage, AddEditPageWrapper } from "../pages/AddEditPage.js";
import ArchiveHomePage from "../pages/ArchiveHomePage.js";
import ButtonPopUpOverlay from "./ButtonPopUpOverlay.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


class NotesApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: ""
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onFilterNotesHandler = this.onFilterNotesHandler.bind(this);
  }

  onDeleteHandler(status, message) {
    return status === "warn" ? toast.warn(message) : toast(message);
  }

  onFilterNotesHandler(keyword) {
    this.setState({keyword});
  }

  render() {
    return (
      <div className="notes-app">
        <header>
          <h1>Note</h1>
          <SearchBarWrapper filterNotes={this.onFilterNotesHandler} />
        </header>
        <div className="body">
          <Routes>
            <Route
              path="/"
              element={
                <ArchiveHomePage
                  keyword={this.state.keyword}
                  toggleCaption="ARSIP"
                  noteClass="note-item"
                  link="/archive"
                  onDelete={this.onDeleteHandler}
                />
              }
            />
            <Route
              path="/archive"
              element={
                <ArchiveHomePage
                  show="archive"
                  keyword={this.state.keyword}
                  toggleCaption="NOTEs"
                  noteClass="note-item note-item-archive"
                  link="/"
                  onDelete={this.onDeleteHandler}
                />
              }
            />
            <Route
              path="/new"
              element={
                <AddEditPage
                  overlayClass="overlay overlay-note-add"
                  onDelete={this.onDeleteHandler}
                />
              }
            />
            <Route
              path="/:id"
              element={<AddEditPageWrapper onDelete={this.onDeleteHandler} />}
            />
          </Routes>
        </div>
        <footer>
          <div className="footer-container">
            <div className="copyright">AlyAds &#169; 2022</div>
            <ButtonPopUpOverlay />
          </div>
        </footer>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    );
  }
}

export default NotesApp;
