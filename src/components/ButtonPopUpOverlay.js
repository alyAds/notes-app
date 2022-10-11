import React from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import addnotesImg from "../assets/addnotes.png";

function ButtonPopUpOverlay() {
  return (
    <div className="note-add tooltip" data-tooltip="New Note">
      <Link to="/new">
        <img src={addnotesImg} alt="add note" />
        <FaPlus size={25}/>
      </Link>
    </div>
  );
}

export default ButtonPopUpOverlay;
