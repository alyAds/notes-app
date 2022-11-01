import React from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import addnotesImg from "../assets/addnotes.png";
import SettingContext from "../contexts/SettingContext";
import { translate } from "../utils/network-data";

function ButtonPopUpOverlay() {
  const { locale } = React.useContext(SettingContext);

  return (
    <div className="note-add tooltip" data-tooltip={translate(locale, "New Note", "Note Baru")}>
      <Link to="/new">
        <img src={addnotesImg} alt="add note" />
        <FaPlus size={25}/>
      </Link>
    </div>
  );
}

export default ButtonPopUpOverlay;
