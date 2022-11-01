import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import Overlay from "../components/Overlay.js";
import NotFound from "../components/NotFound.js";
import {
  deleteNote,
  archiveNote,
  unarchiveNote,
  addNote,
  getNote,
  note,
  setStateNote,
} from "../utils/network-data.js";
import { toast } from "react-toastify";
import SettingContext from "../contexts/SettingContext.js";

function AddEditPageWrapper() {
  const { id } = useParams();

  return (
    <AddEditPage
      id={String(id)}
      overlayClass="overlay overlay-note-edit"
    />
  );
}

class AddEditPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      note: note,
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
    this.onSubmitNoteHandler = this.onSubmitNoteHandler.bind(this);
    this.onChangeTitleHandler = this.onChangeTitleHandler.bind(this);
    this.onChangeBodyHandler = this.onChangeBodyHandler.bind(this);
  }

  async componentDidMount() {
    const id = this.props.id;
    if (id !== undefined) {
      const { error, data } = await getNote(this.props.id);

      setStateNote(this, error, data);
    }
  }

  async onSubmitNoteHandler(e) {
    e.preventDefault();

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

    if (id !== "") {
      toast("Maaf, saat ini menu edit belum tersedia di API Dicoding");
      return false;
    } else {
      note = {
        title: note.title,
        body: note.body,
      };

      this.setState(() => {
        return {
          toolTipAction: "Delete",
        };
      });

      const { error, data } = await addNote(note);

      setStateNote(this, error, data);
    }

    toast(`${note.title} saved`);
  }

  async onDeleteHandler(e, id) {
    const {error, data} = await deleteNote(e, id);
    this.context.setExceptId(id);
    !error && toast.warn(`Catatan ${data} berhasil dihapus!`);
  }

  async onArchiveHandler(e, id) {
    e.preventDefault();
    const { error, data } = await getNote(id);

    if (error === false) {
      if (!data.archived) {
        await archiveNote(id);
      } else {
        await unarchiveNote(id);
      }

      this.setState((prevState) => {
        return {
          note: { ...prevState.note, archived: !data.archived },
        };
      });
    }
  }

  onChangeTitleHandler(e) {
    const newTitle = e.target.value;

    if (newTitle.length <= 50) {
      const note = {
        ...this.state.note,
        title: newTitle,
      };

      this.setState({ note });
    } else {
      toast.warn("Judul Catatan tidak lebih dari 50 karakter!");
    }
  }

  onChangeBodyHandler(e) {
    const bodyLength = e.target.textContent.length;
    const newBody = e.target.innerHTML;

    if (bodyLength <= 1000) {
      const note = {
        ...this.state.note,
        body: newBody,
      };

      this.setState({ note });
    } else {
      toast.warn("Isi Catatan lebih dari 1000 karakter!");
    }
  }

  render() {
    return this.state.note === undefined ? (
      <NotFound src="" alt="" caption={"The note you are looking for may be ripped!"} />
    ) : (
      <Overlay
        note={this.state.note}
        overlayClass={this.props.overlayClass}
        onDelete={this.onDeleteHandler}
        onArchive={this.onArchiveHandler}
        onSubmitNote={this.onSubmitNoteHandler}
        onChangeTitle={this.onChangeTitleHandler}
        onChangeBody={this.onChangeBodyHandler}
      />
    );
  }
}

AddEditPage.propTypes = {
  id: PropTypes.string,
  overlayClass: PropTypes.string.isRequired,
};

AddEditPage.contextType = SettingContext;

export { AddEditPage, AddEditPageWrapper };
