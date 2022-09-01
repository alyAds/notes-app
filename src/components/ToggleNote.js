import React from "react";

function ToggleNote({ toggleCaption, onShowArchive }) {
  return (
    <div className="note-toggle">
      <a href="/#" onClick={(event) => onShowArchive(event, toggleCaption)}>
        <span>{toggleCaption}</span>
        <img src="./images/pileofnotes.png" alt="pile of notes" />
      </a>
    </div>
  );
}

export default ToggleNote;
