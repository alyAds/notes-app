import React from "react";

function NoteItemBody({id, title, classTag, onShowNote}) {
  return (
    <div className={classTag} onClick={(event) => onShowNote(id, event)}>
      <svg viewBox="0 0 127 122" fill="none">
        <path d="M126.5 1H1V115C8.5 99.1667 48.5 89.2949 62.5 101.5C93.7 128.7 118.167 121.833 126.5 115V1Z" />
      </svg>
      <h4 className="note-title">{title}</h4>
    </div>
  );
}

export default NoteItemBody;