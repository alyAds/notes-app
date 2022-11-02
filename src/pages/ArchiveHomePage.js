import React from "react";
import PropTypes from "prop-types";
import NoteList from "../components/NoteList.js";
import ToggleNote from "../components/ToggleNote.js";
import { useSearchParams } from "react-router-dom";
import {
  deleteNote,
  archiveNote,
  unarchiveNote,
  getFilterNotes,
  newNotes,
  filterNotesSearch,
  controlSearchParams,
} from "../utils/network-data.js";
import { toast } from "react-toastify";
import SettingContext from "../contexts/SettingContext.js";

function ArchiveHomepage(props) {
  const { exceptId, setExceptId, setAuthedUser } =
    React.useContext(SettingContext);
  const { title, changeSearchParams } = controlSearchParams(useSearchParams());
  const [isLoading, setIsLoading] = React.useState(true);
  const [allNotes, setAllNotes] = React.useState(null);

  async function onDeleteHandler(event, id) {
    const { error, data } = await deleteNote(event, id);

    if (error) {
      setAuthedUser(null);
      return false;
    }

    toast.warn(`Catatan ${data} berhasil dihapus!`);
    const { notes } = await getFilterNotes(props, title, changeSearchParams);

    setAllNotes(newNotes(id, allNotes, notes));
  }

  async function onArchiveHandler(e, id, noteElemRef) {
    e.preventDefault();
    noteElemRef.current.classList.add("hide-note");

    const { error } =
      props.show === "archive"
        ? await unarchiveNote(id)
        : await archiveNote(id);

    if (error) {
      setAuthedUser(null);
      return false;
    }

    setTimeout(() => {
      getFilterNotes(props, title, changeSearchParams).then(({ notes }) => {
        if (notes !== false) {
          setAllNotes(newNotes(id, allNotes, notes));
        } else {
          setAuthedUser(null);
        }
      });
    }, 400);
  }

  React.useEffect(() => {
    async function fetchNotes() {
      const { notes } = await getFilterNotes(props, title, changeSearchParams);
      if (notes !== false) {
        setIsLoading(false);
        setAllNotes(notes);
      } else {
        setAuthedUser(null);
      }
    }

    if (title !== "" && allNotes !== null) {
      setIsLoading(false);
      const filterNotes = filterNotesSearch(allNotes, title);

      if (filterNotes !== false) {
        setAllNotes(filterNotes);
      } else {
        setAuthedUser(null);
      }
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
      getFilterNotes(props, title, changeSearchParams).then(({ notes }) => {
        if (notes !== false) {
          setAllNotes(newNotes(exceptId, allNotes, notes));
          setExceptId("");
        } else {
          setAuthedUser(null);
        }
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
