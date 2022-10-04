import React from "react";
import NoteInput from "./NoteInput.js";
import ActionCancel from "./ActionCancel.js";
import ActionArchive from "./ActionArchive.js";
import ActionClose from "./ActionClose.js";

function Overlay ({note, overlayClass, onDelete, onArchive, onChangeTitle, onSubmitNote, onChangeBody}) {
  return (
    <div className={overlayClass}>
      <div className="overlay-form">
        <div className="actions">
          {note.id === '' ? '' : <ActionCancel id={note.id} onDelete={onDelete} />}
          {note.id === '' ? '' : <ActionArchive id={note.id} archived={note.archived} onArchive={onArchive} />}
          <ActionClose />
        </div>
        <NoteInput onChangeTitle={onChangeTitle} onChangeBody={onChangeBody} onSubmitNote={onSubmitNote} {...note}/>
      </div>
    </div>
  );
}

export default Overlay;