const randomClass = [
  "note-1",
  "note-2",
  "note-3",
  "note-4",
  "note-5",
  "note-6",
  "note-7",
  "note-8",
];

const BASE_URL = "https://notes-api.dicoding.dev/v1";
const note = {
  id: "",
  title: "",
  body: "",
  archived: "",
  style: "",
  createdAt: "",
};

function getAccessToken() {
  return localStorage.getItem("accessToken");
}

function putAccessToken(accessToken) {
  return localStorage.setItem("accessToken", accessToken);
}

async function fetchWithToken(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
}

async function login({ email, password }) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: responseJson.message };
  }

  return { error: false, data: responseJson.data };
}

async function register({ name, email, password, confirmPassword }) {
  if (password !== confirmPassword) {
    return { error: true, data: "Password tidak sama!" };
  }

  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: responseJson.message };
  }

  return { error: false };
}

async function getUserLogged() {
  const response = await fetchWithToken(`${BASE_URL}/users/me`);
  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function addNote({ title, body }) {
  const response = await fetchWithToken(`${BASE_URL}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, body }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function getActiveNotes() {  
  const response = await fetchWithToken(`${BASE_URL}/notes`);
  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function getArchivedNotes() {
  const response = await fetchWithToken(`${BASE_URL}/notes/archived`);
  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function getFilterNotes(props, title, changeSearchParams) {
  const { data } =
    props.show === "archive"
      ? await getArchivedNotes()
      : await getActiveNotes();
  const keyword = title || props.keyword;

  changeSearchParams(title || props.keyword);

  const filterNotes = data.map((note) => {
    note = {
      ...note,
      style: randomClass[Math.floor(Math.random() * randomClass.length)],
    };

    if (note.title.toLowerCase().includes(keyword)) {
      return { ...note, foundClass: "" };
    } else {
      return { ...note, foundClass: "note-item-filter" };
    }
  });

  return { notes: filterNotes };
}

async function getNote(id) {
  const response = await fetchWithToken(`${BASE_URL}/notes/${id}`);
  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function archiveNote(id) {  
  const response = await fetchWithToken(`${BASE_URL}/notes/${id}/archive`, {
    method: "POST",
  });

  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function unarchiveNote(id) {  
  const response = await fetchWithToken(`${BASE_URL}/notes/${id}/unarchive`, {
    method: "POST",
  });

  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function deleteNote(event, id) {
  event.preventDefault();

  const title = (await getNote(id)).data.title || "title";

  const response = await fetchWithToken(`${BASE_URL}/notes/${id}`, {
    method: "DELETE",
  });

  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  return { error: false, data: title };
}

function translate(locale, from, to) {
  return locale === "en" ? from : to;
}

function setStateNote(obj, error, data) {
  if (!error) {
    obj.setState(() => {
      return {
        note: data,
      };
    });
  } else {
    obj.setState(() => {
      return {
        note: undefined,
      };
    });
  }
}

function newNotes(id, allNotes, notes) {
  // menghapus note dari allNotes
  const newAllNotes = allNotes.filter((note) => note.id !== id);
  // notes baru akan difilter berdasarkan allNotes,
  // cek apakah id dari notes sudah ada di allNotes,
  // jika sudah ada, hapus notes dengan id tersebut dari notes baru
  let idNewNotes = newAllNotes.map(({ id }) => id);
  const newNotes = notes.filter((note) => !idNewNotes.includes(note.id));
  const AllNotesAddNotes = [...newAllNotes, ...newNotes];

  return AllNotesAddNotes;
}

function filterNotesSearch(data, keyword) {
  const filterNotes = data.map((note) => {
    if (note.title.toLowerCase().includes(keyword)) {
      return { ...note, foundClass: "" };
    } else {
      return { ...note, foundClass: "note-item-filter" };
    }
  });

  return filterNotes;
}

function controlSearchParams(useSearchParams) {
  const [searchParams, setSearchParams] = useSearchParams;
  const title = searchParams.get("title") || "";

  function changeSearchParams(title) {
    if (title) {
      setSearchParams({ title });
    } else {
      searchParams.delete("title");
      setSearchParams(searchParams);
    }
  }

  return { title, changeSearchParams };
}

const dateTime = (datetime) => (datetime < 10 ? "0" + datetime : datetime);

function stringDateTime(datetime) {
  const year = datetime.getFullYear();
  const month = dateTime(datetime.getMonth() + 1);
  const date = dateTime(datetime.getDate());
  const hours = dateTime(datetime.getHours());
  const minute = dateTime(datetime.getMinutes());
  const second = dateTime(datetime.getSeconds());

  return `${year}-${month}-${date} ${hours}:${minute}:${second}`;
}

export {
  getAccessToken,
  putAccessToken,
  login,
  register,
  getUserLogged,
  addNote,
  getActiveNotes,
  getArchivedNotes,
  getNote,
  archiveNote,
  unarchiveNote,
  deleteNote,
  translate,
  getFilterNotes,
  setStateNote,
  filterNotesSearch,
  newNotes,
  controlSearchParams,
  stringDateTime,
  note,
  randomClass,
};
