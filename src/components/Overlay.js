import React from "react";
import PropTypes from "prop-types";
import NoteInput from "./NoteInput.js";
import ActionDelete from "./ActionDelete.js";
import ActionArchive from "./ActionArchive.js";
import ActionClose from "./ActionClose.js";

function Overlay ({note, overlayClass, onDelete, onArchive, onChangeTitle, onSubmitNote, onChangeBody}) {
  return (
    <div className={overlayClass}>
      <div className="overlay-form">
        <div className="actions">
          {note.id === '' ? '' : <ActionDelete id={note.id} onDelete={onDelete} />}
          {note.id === '' ? '' : <ActionArchive id={note.id} archived={note.archived} onArchive={onArchive} />}
          <ActionClose />
        </div>
        <NoteInput onChangeTitle={onChangeTitle} onChangeBody={onChangeBody} onSubmitNote={onSubmitNote} {...note}/>
      </div>
    </div>
  );
}

Overlay.propType = {
  note: PropTypes.object.isRequired,
  overlayClass: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  onChangeTitle: PropTypes.func.isRequired,
  onSubmitNote: PropTypes.func.isRequired,
  onChangeBody: PropTypes.func.isRequired,
}

export default Overlay;