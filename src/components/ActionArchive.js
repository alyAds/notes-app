import React from "react";
import PropTypes from "prop-types";
import ArchiveIcon from "./ArchiveIcon";

class ActionArchive extends React.Component {
  constructor(props) {
    super(props);

    const archiveTooltip = !this.props.archived ? "Archive" : "UnArchive";
    const noteArchiveClass = !this.props.archived
      ? "action action-archive tooltip"
      : "action action-archive tooltip note-archive__archive";

    this.state = {
      archiveTooltip,
      noteArchiveClass,
    };

    this.onArchiveNoteHandler = this.onArchiveNoteHandler.bind(this);
  }

  onArchiveNoteHandler(e, id, archived) {
    this.props.onArchive(e, id);

    if (archived) {
      this.setState({
        archiveTooltip: "UnArchive",
        noteArchiveClass: "action action-archive tooltip note-archive__archive",
      });
    } else {
      this.setState({
        archiveTooltip: "Archive",
        noteArchiveClass: "action action-archive tooltip",
      });
    }
  }

  render() {
    return (
      <div
        className={this.state.noteArchiveClass}
        data-tooltip={this.state.archiveTooltip}
      >
        <ArchiveIcon
          id={this.props.id}
          archived={this.props.archived}
          onArchiveNote={this.onArchiveNoteHandler}
        />
      </div>
    );
  }
}

ActionArchive.propType = {
  id: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  onArchive: PropTypes.func.isRequired,
}

export default ActionArchive;
