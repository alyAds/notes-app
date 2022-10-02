import React from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

function ButtonPopUpOverlay({ onToggleOverlay }) {
  return (
    <div className="note-add tooltip" data-tooltip="New Note">
      <Link to="/new" onClick={onToggleOverlay}>
        <img src="./images/addnotes.png" alt="add note" />
        <FaPlus size={25}/>
      </Link>
    </div>
  );
}

export default ButtonPopUpOverlay;
