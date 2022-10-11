import { React, useRef } from "react";
import PropTypes from "prop-types";
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
  id = String(id);
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

NoteItem.propType = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  style: PropTypes.string.isRequired,
  noteClass: PropTypes.string.isRequired,
  foundClass: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
}

export default NoteItem;
