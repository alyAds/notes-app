import React from "react";
import PropTypes from "prop-types";
import NoteList from "../components/NoteList.js";
import ToggleNote from "../components/ToggleNote.js";
import { useSearchParams } from "react-router-dom";
import {
  deleteNote,
  archiveNote,
  unarchiveNote,
  getFilterNotes2,
  newNotes,
  filterNotesSearch,
  controlSearchParams,
} from "../utils/network-data.js";
import { toast } from "react-toastify";
import SettingContext from "../contexts/SettingContext.js";

function ArchiveHomepage(props) {
  const { exceptId, setExceptId } = React.useContext(SettingContext);
  const { title, changeSearchParams } = controlSearchParams(useSearchParams());
  const [isLoading, setIsLoading] = React.useState(true);
  const [allNotes, setAllNotes] = React.useState(null);

  async function onDeleteHandler(event, id) {
    const { error, data } = await deleteNote(event, id);
    !error && toast.warn(`Catatan ${data} berhasil dihapus!`);
    const { notes } = await getFilterNotes2(props, title, changeSearchParams);

    setAllNotes(newNotes(id, allNotes, notes));
  }

  async function onArchiveHandler(e, id, noteElemRef) {
    e.preventDefault();
    noteElemRef.current.classList.add("hide-note");

    props.show === "archive" ? await unarchiveNote(id) : await archiveNote(id);

    setTimeout(() => {
      getFilterNotes2(props, title, changeSearchParams).then(({ notes }) => {
        setAllNotes(newNotes(id, allNotes, notes));
      });
    }, 400);
  }

  React.useEffect(() => {
    async function fetchNotes() {
      const { notes } = await getFilterNotes2(props, title, changeSearchParams);
      setIsLoading(false);
      setAllNotes(notes);
    }

    if (title !== "" && allNotes !== null) {
      setIsLoading(false);
      setAllNotes(filterNotesSearch(allNotes, title));
    } else {
      fetchNotes();

      return () => {
        setIsLoading(true);
        setAllNotes(null);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.show, title]);

  React.useEffect(() => {
    if (exceptId !== "") {
      getFilterNotes2(props, title, changeSearchParams).then(({ notes }) => {
        setAllNotes(newNotes(exceptId, allNotes, notes));
        setExceptId("");
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exceptId]);

  let skeletonLoading = "";

  if (isLoading) {
    skeletonLoading = (
      <div className="notes">
        {Array(3)
          .fill(null)
          .map((val, i) => (
            <div key={i} className="note-item note-item-skeleton"></div>
          ))}
      </div>
    );
  }

  return (
    <>
      {skeletonLoading || (
        <NoteList
          notes={allNotes}
          toggleCaption={props.toggleCaption}
          noteClass={props.noteClass}
          onDelete={onDeleteHandler}
          onArchive={onArchiveHandler}
        />
      )}
      <ToggleNote toggleCaption={props.toggleCaption} link={props.link} />
    </>
  );
}

ArchiveHomepage.propTypes = {
  show: PropTypes.string.isRequired,
  keyword: PropTypes.string.isRequired,
  toggleCaption: PropTypes.string.isRequired,
  noteClass: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default ArchiveHomepage;
