import React from "react";
import NoteItem from "./NoteItem";

function NoteList({ notes, toggleCaption, archiveClass, basicNoteClass, onShowNote, onDelete, onArchive }) {
  const countAllNote = notes.length;
  const countNoteArchive = notes.filter((note) => note.archived === true).length;
  const countNote = countAllNote - countNoteArchive;
  const messageEmptyNote = (countNote === 0) ? <h1>Catatan kosong!</h1> : "";
  const messageEmptyNoteArchive = (countNoteArchive === 0) ? <h1>Catatan di Arsip kosong!</h1> : "";

  const messageEmpty = (toggleCaption === "ARSIP") ? messageEmptyNote : messageEmptyNoteArchive;
  const notesClass = messageEmpty ? "notes empty-notes" : "notes";

  return (
    <div className={notesClass}>
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          id={note.id}
          archiveClass={archiveClass}
          basicNoteClass={basicNoteClass}
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
