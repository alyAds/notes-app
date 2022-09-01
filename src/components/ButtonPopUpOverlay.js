import React from "react";

function ButtonPopUpOverlay({ onToggleOverlay }) {
  return (
    <div className="note-add tooltip" data-tooltip="New Note">
      <a href="/#" onClick={onToggleOverlay}>
        <img src="./images/addnotes.png" alt="add note" />
        <svg viewBox="0 0 37 37" fill="none">
          <path
            d="M16.6043 28.3977L18.598 18.5985M18.598 18.5985L20.5917 8.79925M18.598 18.5985L28.3972 20.5922M18.598 18.5985L8.79874 16.6048"
            stroke="#CB7E35"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </a>
    </div>
  );
}

export default ButtonPopUpOverlay;
