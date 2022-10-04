import React from "react";
import NoteList from "../components/NoteList.js";
import ToggleNote from "../components/ToggleNote.js";
import {
  getArchivedNotes,
  getActiveNotes,
  getFilterNotes,
  archiveNote,
  unarchiveNote,
  deleteNote,
} from "../utils/data.js";

class ArchiveHomepage extends React.Component {
  constructor(props) {
    super(props);

    this.state = getFilterNotes(this);

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState === this.state) {
      this.setState(getFilterNotes(this));
    }
  }
  
  onDeleteHandler(event, id) {
    deleteNote(this, event, id);

    this.setState({ notes: this.props.show === "archive" ? getArchivedNotes() : getActiveNotes() });
  }

  onArchiveHandler(e, id) {
    this.props.show === "archive" ? unarchiveNote(id) : archiveNote(id);

    this.setState({ notes: this.props.show === "archive" ? getArchivedNotes() : getActiveNotes() });
    e.preventDefault();
  }

  render() {
    return (
      <>
        <NoteList
          notes={this.state.notes}
          toggleCaption={this.props.toggleCaption}
          noteClass={this.props.noteClass}
          onDelete={this.onDeleteHandler}
          onArchive={this.onArchiveHandler}
        />
        <ToggleNote toggleCaption={this.props.toggleCaption} link={this.props.link} />
      </>
    );
  }
}

export default ArchiveHomepage;
