import React from "react";
import { Link } from "react-router-dom";

function ToggleNote({ toggleCaption, link }) {
  return (
    <div className="note-toggle">
      <Link to={link}>
        <span>{toggleCaption}</span>
        <img src="./images/pileofnotes.png" alt="pile of notes" />
      </Link>
    </div>
  );
}

export default ToggleNote;
