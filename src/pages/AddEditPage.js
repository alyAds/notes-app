import React from "react";
import Overlay from "../components/Overlay.js";
import { randomClass } from "../utils/random-class.js";
import {
  getAllNotes,
  stringDateTime,
  addNote,
  editNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
  getNote,
  note,
} from "../utils/data.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

function AddEditPageWrapper({onDelete}) {
  const { id } = useParams();
  return <AddEditPage id={id} onDelete={onDelete} overlayClass="overlay overlay-note-edit" />
}

class AddEditPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      note: this.props.id ? getNote(Number(this.props.id)) : note,
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
    this.onSubmitNoteHandler = this.onSubmitNoteHandler.bind(this);
    this.onChangeTitleHandler = this.onChangeTitleHandler.bind(this);
    this.onChangeBodyHandler = this.onChangeBodyHandler.bind(this);
  }

  onSubmitNoteHandler(e) {
    let note = this.state.note;
    const id = note.id;
    let error = false;

    if (note.title < 1 || note.title > 50) {
      toast.warn("Judul Catatan harus diisi dan tidak lebih dari 50 karakter!");
      error = true;
    }

    if (note.body < 1 || note.body > 1000) {
      toast.warn("Isi Catatan harus diisi dan tidak lebih dari 1000 karakter!");
      error = true;
    }

    if (error) {
      e.preventDefault();
      return false;
    }

    const datetime = new Date();
    const style = randomClass[Math.floor(Math.random() * randomClass.length)];

    note = {
      ...this.state.note,
      title: note.title,
      body: note.body,
      createdAt: stringDateTime(datetime),
    };

    if (id !== "") {
      this.setState({ note });
      editNote(note);
    } else {
      note = {
        id: `notes-${+new Date()}`,
        title: note.title,
        body: note.body,
        style,
        archived: false,
        foundClass: "",
        createdAt: stringDateTime(datetime),
      };

      this.setState((prevState) => {
        return {
          toolTipAction: "Delete",
          note,
        };
      });

      addNote(note);
    }

    toast(`${note.title} saved`);
    e.preventDefault();
  }

  onDeleteHandler(e, id) {
    deleteNote(this, e, id);

    this.setState({ note });
  }

  onArchiveHandler(e, id) {
    const notes = getAllNotes();
    const index = notes.findIndex((data) => data.id === id);
    const archive = e.currentTarget.parentNode.classList.contains("note-archive__archive") ? false : true;

    if (index !== -1) {
      if (archive) {
        archiveNote(id);
      } else {
        unarchiveNote(id);
      }

      this.setState((prevState) => {
        return {
          note: { ...prevState.note, archived: archive },
        };
      });
    }

    e.preventDefault();
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
      // notify("warn", "Judul Catatan tidak lebih dari 50 karakter!")
      toast.warn("Judul Catatan tidak lebih dari 50 karakter!");
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
      // notify("Isi Catatan lebih dari 1000 karakter!")
      toast.warn("Isi Catatan lebih dari 1000 karakter!");
    }
  }

  render() {
    return (
      <>
        <Overlay
          note={this.state.note}
          overlayClass={this.props.overlayClass}
          onDelete={this.onDeleteHandler}
          onArchive={this.onArchiveHandler}
          onSubmitNote={this.onSubmitNoteHandler}
          onChangeTitle={this.onChangeTitleHandler}
          onChangeBody={this.onChangeBodyHandler}
        />
      </>
    );
  }
}

export {AddEditPage, AddEditPageWrapper};
