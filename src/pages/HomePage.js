import React from "react";
import NoteList from "../components/NoteList.js";
import ToggleNote from "../components/ToggleNote.js";
import { getActiveNotes, archiveNote, deleteNote } from "../utils/data.js";

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getActiveNotes(),
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
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

  render() {
    return (
      <>
        <NoteList
          notes={this.state.notes}
          toggleCaption="ARSIP"
          noteClass="note-item"
          onDelete={this.onDeleteHandler}
          onArchive={this.onArchiveHandler}
        />
        <ToggleNote
          toggleCaption="ARSIP"
          link="/archive"
        />
      </>
    );
  }
}

export default HomePage;
