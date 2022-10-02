import React from "react";
import NoteItem from "./NoteItem";

function NoteList({ notes, toggleCaption, noteClass, onShowNote, onDelete, onArchive }) {
  const countNote = notes.length; // archive or not
  let messageEmpty = "";
  let notesClass = "notes";

  if (countNote === 0 && toggleCaption === "ARSIP") {
    // jika catatan (bukan arsip) kosong dan yang ditampilkan adalah catatan bukan arsip tersebut
    messageEmpty = <h1>Catatan kosong!</h1>;
    notesClass += " empty-notes";
  } else if (countNote === 0 && toggleCaption === "NOTEs") {
    // jika catatan di arsip kosong dan yang ditampilkan adalah catatan di arsip tersebut
    messageEmpty = <h1>Catatan di Arsip kosong!</h1>;
    notesClass += " empty-notes";
  }

  return (
    <div className={notesClass}>
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          id={note.id}
          noteClass={noteClass}
          onShowNote={onShowNote}
          onDelete={onDelete}
          onArchive={onArchive}
          {...note}
        />
      ))}
      {messageEmpty}
    </div>
  );
}

export default NoteList;
