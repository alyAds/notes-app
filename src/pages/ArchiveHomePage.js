import React from "react";
import PropTypes from "prop-types";
import NoteList from "../components/NoteList.js";
import ToggleNote from "../components/ToggleNote.js";
import { useSearchParams } from "react-router-dom";
import {
  getFilterNotes,
  archiveNote,
  unarchiveNote,
  deleteNote,
  controlSearchParams,
} from "../utils/data.js";

function ArchiveHomepage(props) {
  const {title, changeSearchParams} = controlSearchParams(useSearchParams());

  return <ArchiveHomepageChild {...props} title={title} keywordChange={changeSearchParams} />
}

class ArchiveHomepageChild extends React.Component {
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

    this.setState(getFilterNotes(this));
  }

  onArchiveHandler(e, id, noteElemRef) {
    noteElemRef.current.classList.add("hide-note");
    this.props.show === "archive" ? unarchiveNote(id) : archiveNote(id);

    setTimeout(() => {
      this.setState(getFilterNotes(this));
    }, 400);
    
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

const propType = {
  show: PropTypes.string.isRequired,
  keyword: PropTypes.string.isRequired,
  toggleCaption: PropTypes.string.isRequired,
  noteClass: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
}

ArchiveHomepage.propType = { ...propType }

ArchiveHomepageChild.propType = {
  ...propType,
  title: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired,
}

export default ArchiveHomepage;
