let getData = () => {
  return [
    {
      id: 1,
      title: "Biaya Hidup",
      body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda tempora sequi labore mollitia repellendus corporis aspernatur blanditiis earum voluptatum, consectetur veniam maiores saepe quidem consequuntur, deserunt amet nostrum excepturi voluptate enim repudiandae fugit quisquam sit! Non fuga quibusdam inventore architecto est saepe ducimus mollitia veritatis provident rerum? Vel, porro illum.",
      archived: false,
      style: "note-1",
      foundClass: '',
      createdAt: '2022-04-14 04:27:34',
    },
    {
      id: 2,
      title: "Renungan hati",
      body: "Assumenda tempora sequi labore mollitia repellendus corporis aspernatur blanditiis earum voluptatum, consectetur veniam maiores saepe quidem consequuntur, deserunt amet nostrum excepturi voluptate enim repudiandae fugit quisquam sit! Non fuga quibusdam inventore architecto est saepe ducimus mollitia veritatis provident rerum? Vel, porro illum. Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
      archived: true,
      style: "note-2",
      foundClass: '',
      createdAt: '2022-04-14 04:27:34',
    },
    {
      id: 3,
      title: "Wajib lakukan hal ini diumur 20-an",
      body: "Vel, porro illum. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda tempora sequi labore mollitia repellendus corporis aspernatur blanditiis earum voluptatum, consectetur veniam maiores saepe quidem consequuntur, deserunt amet nostrum excepturi voluptate enim repudiandae fugit quisquam sit! Non fuga quibusdam inventore architecto est saepe ducimus mollitia veritatis provident rerum?",
      archived: true,
      style: "note-3",
      foundClass: '',
      createdAt: '2022-04-14 04:27:34',
    },
    {
      id: 4,
      title: "Makan ini bermanfaat",
      body: "Vel, porro illum. Assumenda tempora sequi labore mollitia repellendus corporis aspernatur blanditiis earum voluptatum, consectetur veniam maiores saepe quidem consequuntur, deserunt amet nostrum excepturi voluptate enim repudiandae fugit quisquam sit! Non fuga quibusdam inventore architecto est saepe ducimus mollitia veritatis provident rerum? Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
      archived: false,
      style: "note-2",
      foundClass: '',
      createdAt: '2022-04-14 04:27:34',
    },
  ];
};

let notes = [
  {
    id: 1,
    title: "Biaya Hidup",
    body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda tempora sequi labore mollitia repellendus corporis aspernatur blanditiis earum voluptatum, consectetur veniam maiores saepe quidem consequuntur, deserunt amet nostrum excepturi voluptate enim repudiandae fugit quisquam sit! Non fuga quibusdam inventore architecto est saepe ducimus mollitia veritatis provident rerum? Vel, porro illum.",
    archived: false,
    style: "note-1",
    foundClass: '',
    createdAt: '2022-04-14 04:27:34',
  },
  {
    id: 2,
    title: "Renungan hati",
    body: "Assumenda tempora sequi labore mollitia repellendus corporis aspernatur blanditiis earum voluptatum, consectetur veniam maiores saepe quidem consequuntur, deserunt amet nostrum excepturi voluptate enim repudiandae fugit quisquam sit! Non fuga quibusdam inventore architecto est saepe ducimus mollitia veritatis provident rerum? Vel, porro illum. Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    archived: true,
    style: "note-2",
    foundClass: '',
    createdAt: '2022-04-14 04:27:34',
  },
  {
    id: 3,
    title: "Wajib lakukan hal ini diumur 20-an",
    body: "Vel, porro illum. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda tempora sequi labore mollitia repellendus corporis aspernatur blanditiis earum voluptatum, consectetur veniam maiores saepe quidem consequuntur, deserunt amet nostrum excepturi voluptate enim repudiandae fugit quisquam sit! Non fuga quibusdam inventore architecto est saepe ducimus mollitia veritatis provident rerum?",
    archived: true,
    style: "note-3",
    foundClass: '',
    createdAt: '2022-04-14 04:27:34',
  },
  {
    id: 4,
    title: "Makan ini bermanfaat",
    body: "Vel, porro illum. Assumenda tempora sequi labore mollitia repellendus corporis aspernatur blanditiis earum voluptatum, consectetur veniam maiores saepe quidem consequuntur, deserunt amet nostrum excepturi voluptate enim repudiandae fugit quisquam sit! Non fuga quibusdam inventore architecto est saepe ducimus mollitia veritatis provident rerum? Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    archived: false,
    style: "note-2",
    foundClass: '',
    createdAt: '2022-04-14 04:27:34',
  },
];

const note = {id: '', title: '', body: '', archived: '', style: '', createdAt: ''};

function getAllNotes() {
  return notes;
}

function getNote(id) {
  const foundedNote = notes.find((note) => note.id === id);
  return foundedNote;
}

function getActiveNotes() {
  const activeNotes = notes.filter((note) => !note.archived);
  return activeNotes;
}

function getArchivedNotes() {
  const archivedNotes = notes.filter((note) => note.archived);
  return archivedNotes;
}

function addNote(data) {
  notes = [...notes, data];
}

function deleteNote(obj, event, id) {
  const noteDelete = getNote(id);
  notes = notes.filter((note) => note.id !== id);
  obj.props.onDelete(event, "warn", `Catatan ${noteDelete.title} berhasil dihapus!`);
  event.preventDefault();
}

function archiveNote(id) {
  notes = notes.map((note) => {
    if (note.id === id) {
      return { ...note, archived: true };
    }
    return note;
  });
}

function unarchiveNote(id) {
  notes = notes.map((note) => {
    if (note.id === id) {
      return { ...note, archived: false };
    }

    return note;
  });
}

function editNote({ id, title, body }) {
  const noteToEdit = notes.find((note) => note.id === id);
  noteToEdit.title = title;
  noteToEdit.body = body;

  notes = notes.map((note) => {
    if (note.id === id) {
      return note;
    }
    return note;
  });
}

const dateTime = (datetime) => datetime < 10 ? '0' + datetime : datetime;

function stringDateTime(datetime) {
  const year = datetime.getFullYear();
  const month = dateTime(datetime.getMonth()+1);
  const date = dateTime(datetime.getDate());
  const hours = dateTime(datetime.getHours());
  const minute = dateTime(datetime.getMinutes());
  const second = dateTime(datetime.getSeconds());

  return `${year}-${month}-${date} ${hours}:${minute}:${second}`;
}

export {
  getAllNotes,
  getActiveNotes,
  getArchivedNotes,
  deleteNote,
  editNote,
  getNote,
  archiveNote,
  unarchiveNote,
  addNote,
  getData,
  stringDateTime,
  note
};