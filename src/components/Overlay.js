import React from "react";
import NoteInput from "./NoteInput.js";
import ActionCancel from "./ActionCancel.js";
import ActionArchive from "./ActionArchive.js";
import ActionClose from "./ActionClose.js";

function Overlay ({note, toolTipAction, toggleOverlay, closeOverlay, onDelete, onArchive, onChangeTitle, onSubmitNote, onChangeBody}) {
  return (
    <div className={toggleOverlay}>
      <div className="overlay-form">
        <div className="actions">
          <ActionCancel id={note.id} onDelete={onDelete} toolTipAction={toolTipAction}  />
          {note.id === '' ? '' : <ActionArchive id={note.id} archived={note.archived} onArchive={onArchive} />}
          <ActionClose closeOverlay={closeOverlay} />
        </div>
        <NoteInput onChangeTitle={onChangeTitle} onChangeBody={onChangeBody} onSubmitNote={onSubmitNote} {...note}/>
      </div>
    </div>
  );
}

export default Overlay;