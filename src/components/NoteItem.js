import React from "react";
import ArchiveNote from "./ArchiveNote.js";
import DeleteNote from "./DeleteNote.js";
import NoteItemBody from "./NoteItemBody.js";

function NoteItem({
  id,
  title,
  archived,
  style,
  archiveClass,
  basicNoteClass,
  foundClass,
  onShowNote,
  onDelete,
  onArchive,
}) {
  const noteBodyClass = "note " + style;
  archiveClass = archiveClass + " " + foundClass;
  basicNoteClass = basicNoteClass + " " + foundClass

  return !archived ? (
    <div className={basicNoteClass}>
      <NoteItemBody
        id={id}
        title={title}
        classTag={noteBodyClass}
        onShowNote={onShowNote}
      />
      <DeleteNote id={id} onDelete={onDelete} />
      <ArchiveNote
        id={id}
        archived={archived}
        onArchive={onArchive}
      />
    </div>
  ) : (
    <div className={archiveClass}>
      <NoteItemBody
        id={id}
        title={title}
        classTag={noteBodyClass}
        onShowNote={onShowNote}
      />
      <DeleteNote id={id} onDelete={onDelete} />
      <ArchiveNote
        id={id}
        archived={archived}
        onArchive={onArchive}
      />
    </div>
  );
}

export default NoteItem;
