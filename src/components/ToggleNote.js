import React from "react";
import PropTypes from "prop-types";
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

ToggleNote.propType = {
  toggleCaption: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
}

export default ToggleNote;
