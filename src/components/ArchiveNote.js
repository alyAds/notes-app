import React from "react";
import ArchiveIcon from "./ArchiveIcon";

class ArchiveNote extends React.Component {
  constructor(props) {
    super(props);

    const archiveTooltip = !this.props.archived ? "Archive" : "UnArchive";
    const noteArchiveClass = !this.props.archived
      ? "note-archive tooltip"
      : "note-archive tooltip note-archive__archive";

    this.state = {
      archiveTooltip: archiveTooltip,
      noteArchiveClass: noteArchiveClass,
    };

    this.onArchiveNoteHandler = this.onArchiveNoteHandler.bind(this);
  }

  onArchiveNoteHandler(e, id, archived) {
    this.props.onArchive(e, id, this.props.noteElemRef);

    if (archived) {
      this.setState({
        archiveTooltip: "UnArchive",
        noteArchiveClass: "note-archive tooltip note-archive__archive",
      });
    } else {
      this.setState({
        archiveTooltip: "Archive",
        noteArchiveClass: "note-archive tooltip",
      });
    }
  }

  render() {
    return (
      <div
        className={this.state.noteArchiveClass}
        data-tooltip={this.state.archiveTooltip}
      >
        <ArchiveIcon id={this.props.id} archived={this.props.archived} onArchiveNote={this.onArchiveNoteHandler} />
      </div>
    );
  }
}

export default ArchiveNote;
