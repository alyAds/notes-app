import React from "react";
import { Routes, Route } from "react-router-dom";
import SearchBar from "./SearchBar.js";
import { AddEditPage, AddEditPageWrapper } from "../pages/AddEditPage.js";
import ArchiveHomePage from "../pages/ArchiveHomePage.js";
import ButtonPopUpOverlay from "./ButtonPopUpOverlay.js";
import { getAllNotes } from "../utils/data.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = (status, message) => {
  return status === "warn" ? toast.warn(message) : toast(message);
};

class NotesApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getAllNotes(),
      toolTipAction: "",
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onFilterNotesHandler = this.onFilterNotesHandler.bind(this);
  }

  onDeleteHandler(status, message) {
    notify(status, message);
  }

  onFilterNotesHandler(keyword) {
    const filterNotes = this.state.notes.map(
      ({ id, title, body, style, archived, createdAt }) => {
        if (title.toLowerCase().includes(keyword)) {
          return {
            id,
            title,
            body,
            style,
            archived,
            createdAt,
            foundClass: "",
          };
        } else {
          return {
            id,
            title,
            body,
            style,
            archived,
            createdAt,
            foundClass: "note-item-filter",
          };
        }
      }
    );

    this.setState({ notes: filterNotes });
  }

  render() {
    return (
      <div className="notes-app">
        <header>
          <h1>Note</h1>
          <SearchBar filterNotes={this.onFilterNotesHandler} />
        </header>
        <div className="body">
          <Routes>
            <Route
              path="/"
              element={
                <ArchiveHomePage
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
