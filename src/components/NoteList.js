import React from "react";
import PropTypes from "prop-types";
import NoteItem from "./NoteItem";
import SettingContext from "../contexts/SettingContext";
import { translate } from "../utils/network-data";

function NoteList({ notes, toggleCaption, noteClass, onDelete, onArchive }) {
  const { locale } = React.useContext(SettingContext);
  const countNote = notes.length; // archive or not
  let messageEmpty = "";
  let notesClass = "notes";

  if (countNote === 0 && toggleCaption === "ARSIP") {
    // jika catatan (bukan arsip) kosong dan yang ditampilkan adalah catatan bukan arsip tersebut
    messageEmpty = <h1>{translate(locale, "Empty Note!", "Catatan Kosong!")}</h1>;
    notesClass += " empty-notes";
  } else if (countNote === 0 && toggleCaption === "NOTEs") {
    // jika catatan di arsip kosong dan yang ditampilkan adalah catatan di arsip tersebut
    messageEmpty = <h1>{translate(locale, "Archive Note is Empty!", "Catatan di Arsip Kosong!")}</h1>;
    notesClass += " empty-notes";
  }

  return (
    <div className={notesClass}>
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          id={note.id}
          noteClass={noteClass}
          onDelete={onDelete}
          onArchive={onArchive}
          {...note}
        />
      ))}
      {messageEmpty}
    </div>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleCaption: PropTypes.string.isRequired,
  noteClass: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
}

export default NoteList;
