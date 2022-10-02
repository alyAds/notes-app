import React from "react";
import NoteList from "../components/NoteList.js";
import ToggleNote from "../components/ToggleNote.js";
import { getArchivedNotes, unarchiveNote, deleteNote } from "../utils/data.js";

class ArchivePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getArchivedNotes(),
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
  }

  onDeleteHandler(event, id) {
    deleteNote(this, event, id);
    
    this.setState({ notes: getArchivedNotes() });    
  }

  onArchiveHandler(e, id) {
    unarchiveNote(id)

    this.setState({ notes: getArchivedNotes() });
    e.preventDefault();
  }

  render() {
    return (
      <>
        <NoteList
          notes={this.state.notes}
          toggleCaption="NOTEs"
          noteClass="note-item note-item-archive"
          onShowNote={this.props.onShowNote}
          onDelete={this.onDeleteHandler}
          onArchive={this.onArchiveHandler}
        />
        <ToggleNote
          toggleCaption="NOTEs"
          link="/"
        />
      </>
    );
  }
}

export default ArchivePage;
