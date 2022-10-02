import React from "react";
import NoteList from "../components/NoteList.js";
import ToggleNote from "../components/ToggleNote.js";
import Overlay from "../components/Overlay.js";
import { getActiveNotes, archiveNote, deleteNote } from "../utils/data.js";

const globalNote = {id: '', title: '', body: '', archived: '', style: '', createdAt: ''};

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getActiveNotes(),
      note: globalNote,
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
    this.onShowNoteHandler = this.onShowNoteHandler.bind(this);
  }

  onDeleteHandler(event, id) {
    deleteNote(this, event, id);
    
    this.setState({ notes: getActiveNotes() });
  }

  onArchiveHandler(e, id) {
    archiveNote(id)

    this.setState({ notes: getActiveNotes() });
    e.preventDefault();
  }

  onShowNoteHandler(id, event) {
    const note = this.state.notes.filter((n) => n.id === id)[0];

    this.setState({ note: note });
    // event.preventDefault();
  }

  render() {
    return (
      <>
        <NoteList
          notes={this.state.notes}
          toggleCaption="ARSIP"
          noteClass="note-item"
          onShowNote={this.props.onShowNote}
          onDelete={this.onDeleteHandler}
          onArchive={this.onArchiveHandler}
        />
        <ToggleNote
          toggleCaption="ARSIP"
          link="/archive"
        />
        {/* <Overlay
          note={this.state.note}
          toggleOverlay="overlay overlay-note-edit"
          toolTipAction="Delete"
          onDelete={this.props.onDelete}
          onArchive={this.props.onArchive}
          onSubmitNote={this.props.onSubmitNote}
          onChangeTitle={this.props.onChangeTitle}
          onChangeBody={this.props.onChangeBody}
          closeOverlay={this.props.onToggleOverlay}
        /> */}
      </>
    );
  }
}

export default HomePage;
