import { React, useRef } from "react";
import ArchiveNote from "./ArchiveNote.js";
import DeleteNote from "./DeleteNote.js";
import NoteItemBody from "./NoteItemBody.js";

function NoteItem({
  id,
  title,
  archived,
  style,
  noteClass,
  foundClass,
  onDelete,
  onArchive,
}) {
  const noteElem = useRef();
  const noteBodyClass = "note " + style;
  noteClass = noteClass + " " + foundClass;

  return (
    <div ref={noteElem} className={noteClass}>
      <NoteItemBody
        id={id}
        title={title}
        classTag={noteBodyClass}
      />
      <DeleteNote id={id} onDelete={onDelete} />
      <ArchiveNote
        id={id}
        noteElemRef={noteElem}
        archived={archived}
        onArchive={onArchive}
      />
    </div>
  );
}

export default NoteItem;
