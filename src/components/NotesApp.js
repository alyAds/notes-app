import React from "react";
import SearchBar from "./SearchBar.js";
import NoteList from "./NoteList.js";
import ToggleNote from "./ToggleNote.js";
import Overlay from "./Overlay.js";
import ButtonPopUpOverlay from "./ButtonPopUpOverlay.js";
import { randomClass } from "../utils/random-class.js";
import { getData } from "../utils/data.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const globalNote = {id: '', title: '', body: '', archived: '', style: '', createdAt: ''};

const dateTime = (datetime) => datetime < 10 ? '0' + datetime : datetime;
const notify = (status, message) => {
  return (status === 'warn') ? toast.warn(message) : toast(message)
};

class NotesApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getData(),
      note: globalNote,
      toggleOverlay: "overlay",
      toolTipAction: "",
      toggleCaption: "ARSIP",
      archiveClass: "note-item note-item-archive",
      basicNoteClass: "note-item",
    };

    this.onToggleOverlayHandler = this.onToggleOverlayHandler.bind(this);
    this.onShowNoteHandler = this.onShowNoteHandler.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
    this.onShowArchivesHandler = this.onShowArchivesHandler.bind(this);
    this.onFilterNotesHandler = this.onFilterNotesHandler.bind(this);
    this.onSubmitNoteHandler = this.onSubmitNoteHandler.bind(this);
    this.onChangeTitleHandler = this.onChangeTitleHandler.bind(this);
    this.onChangeBodyHandler = this.onChangeBodyHandler.bind(this);
  }

  onToggleOverlayHandler(e) {
    if (e.currentTarget.parentNode.classList.contains("note-item")) {
      this.setState((previousState) => {
        return {
          toggleOverlay: previousState.toggleOverlay + " overlay-note-edit",
          toolTipAction: "Delete",
        };
      });

      return;
    }

    e.preventDefault();

    if (e.currentTarget.parentNode.classList.contains("note-add")) {
      this.setState((previousState) => {
        return {
          toggleOverlay: previousState.toggleOverlay + " overlay-note-add",
          toolTipAction: "Cancel",
        };
      });
    } else if (
      e.currentTarget.parentNode.classList.contains("action-pin") ||
      e.currentTarget.parentNode.classList.contains("action-cancel")
    ) {
      this.setState({
        toggleOverlay: "overlay",
        note: globalNote,
      });
    }
  }

  onShowNoteHandler(id, event) {
    const note = this.state.notes.filter((n) => n.id === id)[0];

    this.setState({ note: note });

    this.onToggleOverlayHandler(event);
  }

  onDeleteHandler(event, id) {
    const notes = this.state.notes.filter((note) => note.id !== id);
    const noteDelete = this.state.notes.filter((note) => note.id === id)[0];
    this.setState({ notes });

    notify("warn", `Catatan ${noteDelete.title} berhasil dihapus!`);

    this.onToggleOverlayHandler(event);
  }

  onArchiveHandler(e, id) {
    const notes = this.state.notes;
    let note = this.state.note;
    const index = notes.findIndex((data) => data.id === id);
    const archive = e.currentTarget.parentNode.classList.contains("note-archive__archive") ? false : true;

    if (index !== -1) {
      notes[index] = {
        ...notes[index],
        archived: archive,
      };
      note = {
        ...note,
        archived: archive,
      };
    }

    this.setState({ notes, note });
    e.preventDefault();
  }

  onShowArchivesHandler(e, toggleCaption) {
    e.preventDefault();

    if (toggleCaption === "ARSIP") {
      this.setState((previousState) => {
        return {
          archiveClass: previousState.archiveClass + " note-item-archive-show",
          basicNoteClass: previousState.basicNoteClass + " note-item-hide",
          toggleCaption: "NOTEs",
        };
      });
    } else {
      this.setState({
        archiveClass: "note-item note-item-archive",
        basicNoteClass: "note-item",
        toggleCaption: "ARSIP",
      });
    }
  }

  onFilterNotesHandler(keyword) {
    const filterNotes = this.state.notes.map(({id, title, body, style, archived, createdAt}) => {
      if (title.toLowerCase().includes(keyword)) {
        return {id, title, body, style, archived, createdAt, foundClass: ''};
      } else {
        return {id, title, body, style, archived, createdAt, foundClass: 'note-item-filter'};
      }
    });

    this.setState({notes: filterNotes})
  }

  onSubmitNoteHandler(e) {
    let notes = this.state.notes;
    let note = this.state.note;
    const id = note.id;
    const index = notes.findIndex((data) => data.id === id);
    let error = false;

    if (note.title < 1 || note.title > 50) {
      notify("warn", "Judul Catatan harus diisi dan tidak lebih dari 50 karakter!")
      error = true;
    }
    
    if (note.body < 1 || note.body > 1000) {
      notify("warn", "Isi Catatan harus diisi dan tidak lebih dari 1000 karakter!")
      error = true;
    }

    if (error) {
      e.preventDefault()
      return false;
    }

    const datetime = new Date();
    const year = datetime.getFullYear();
    const month = dateTime(datetime.getMonth()+1);
    const date = dateTime(datetime.getDate());
    const hours = dateTime(datetime.getHours());
    const minute = dateTime(datetime.getMinutes());
    const second = dateTime(datetime.getSeconds());
    const datetimestring = `${year}-${month}-${date} ${hours}:${minute}:${second}`;

    note = {
      ...this.state.note,
      title: note.title,
      body: note.body,
      createdAt: datetimestring
    };

    if (index !== -1) {
      notes[index] = {
        ...notes[index],
        title: note.title,
        body: note.body,
        createdAt: datetimestring
      };

      this.setState({ note, notes });
    } else {
      const style = randomClass[Math.floor(Math.random() * randomClass.length)];
      note = {
        id: Date.now(),
        title: note.title,
        body: note.body,
        style,
        archived: false,
        foundClass: '',
        createdAt: datetimestring
      }
      this.setState((prevState) => {
        return {
          toolTipAction: "Delete",
          note,
          notes: [
            ...prevState.notes,
            note
          ]
        }
      });
    }
    
    notify("success", `${note.title} saved`)
    e.preventDefault()
  }

  onChangeTitleHandler(e) {
    const newTitle = e.target.value;

    if (newTitle.length >= 1 && newTitle.length <= 50) {
      const note = {
        ...this.state.note,
        title: newTitle,
      };

      this.setState({ note });
    } else {
      notify("warn", "Judul Catatan tidak lebih dari 50 karakter!")
    }
  }

  onChangeBodyHandler(e) {
    const newBody = e.target.value;

    if (newBody.length <= 1000) {
      const note = {
        ...this.state.note,
        body: newBody,
      };

      this.setState({ note });
    } else {
      notify("Isi Catatan lebih dari 1000 karakter!")
    }
  }

  render() {
    return (
      <div className="notes-app">
        <header>
          <h1>Note</h1>
          <SearchBar filterNotes={this.onFilterNotesHandler} />
        </header>
        <div className="body">
          <NoteList
            toggleCaption={this.state.toggleCaption}
            notes={this.state.notes}
            archiveClass={this.state.archiveClass}
            basicNoteClass={this.state.basicNoteClass}
            onShowNote={this.onShowNoteHandler}
            onDelete={this.onDeleteHandler}
            onArchive={this.onArchiveHandler}
          />
          <ToggleNote
            toggleCaption={this.state.toggleCaption}
            onShowArchive={this.onShowArchivesHandler}
          />
        </div>
        <footer>
          <div className="footer-container">
            <div className="copyright">AlyAds &#169; 2022</div>
            <ButtonPopUpOverlay onToggleOverlay={this.onToggleOverlayHandler} />
          </div>
        </footer>
        <Overlay
          note={this.state.note}
          toggleOverlay={this.state.toggleOverlay}
          toolTipAction={this.state.toolTipAction}
          onDelete={this.onDeleteHandler}
          onArchive={this.onArchiveHandler}
          onSubmitNote={this.onSubmitNoteHandler}
          onChangeTitle={this.onChangeTitleHandler}
          onChangeBody={this.onChangeBodyHandler}
          closeOverlay={this.onToggleOverlayHandler}
        />
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
