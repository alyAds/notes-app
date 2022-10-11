import React from "react";
import { Link } from "react-router-dom";
import pileofnotesImg from "../assets/pileofnotes.png";

function ToggleNote({ toggleCaption, link }) {
  return (
    <div className="note-toggle">
      <Link to={link}>
        <span>{toggleCaption}</span>
        <img src={pileofnotesImg} alt="pile of notes" />
      </Link>
    </div>
  );
}

export default ToggleNote;
