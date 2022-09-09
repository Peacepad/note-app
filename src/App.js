import { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./Components/Sidebar.js";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [titleInput, setTitleInput] = useState();
  const [inputIsEmpty, setInputIsEmpty] = useState(true);
  const [textareaIsEmpty, setTextareaIsEmpty] = useState(true);
  const [textInput, setTextInput] = useState();
  const [notesArr, setNotesArr] = useState([]);
  const [noteEditing, setNoteEditing] = useState("");
  const [isMask, setIsMask] = useState(false);

  const linkedTitle = (e) => {
    setTitleInput(e.target.value);
    if (e.target.value !== "") setInputIsEmpty(false);
    else {
      setInputIsEmpty(true);
    }
  };

  const linkedText = (e) => {
    setTextInput(e.target.value);
    if (e.target.value !== "") {
      setTextareaIsEmpty(false);

      autoBackup(e.target.value);
    } else setTextareaIsEmpty(true);
  };

  const saveNewNote = () => {


    const newNote = {};
    newNote.txt = textInput;
    newNote.title = titleInput;
    newNote.date = new Date();

    if (noteEditing == "") {
      newNote.id = uuidv4();
      setNoteEditing(newNote.id);
      localStorage.setItem(`note_${newNote.id}`, JSON.stringify(newNote));
      checkLocalStorage();
    } else {
      newNote.id = noteEditing;
      localStorage.setItem(`note_${newNote.id}`, JSON.stringify(newNote));
      checkLocalStorage();
    }
  };

  const checkLocalStorage = () => {
    let objLocalStorage = Object.entries(localStorage);
    let notes = [];

    objLocalStorage.forEach((item) => {
      if (item[0].includes("note_")) notes.push(item);
    });

    let arrWithObj = [];

    notes.forEach((note) => {
      let newNote = [note[0], JSON.parse(note[1])];
      arrWithObj.push(newNote);
    });

    let sortedArr = arrWithObj.sort(function (a, b) {
      return new Date(b[1].date) - new Date(a[1].date);
    });

    setNotesArr(sortedArr);
  };

  useEffect(() => checkLocalStorage(), []);

  const autoBackup = () => {
    if (textareaIsEmpty == false && inputIsEmpty == false) saveNewNote();
  };

  const newNote = () => {
    setInputIsEmpty(true);
    setTextareaIsEmpty(true);
    setTitleInput();
    setTextInput();
    setNoteEditing("");
  };

  const editNote = (id, title, txt) => {
    setInputIsEmpty(false);
    setTextareaIsEmpty(false);
    setTitleInput(title);
    setTextInput(txt);
    setNoteEditing(id);
  };

  const maskSidebar = () => setIsMask(!isMask);

  const deleteNote = (e, id) => {
    e.stopPropagation();

    let removeItem = `note_${id}`;
    localStorage.removeItem(removeItem);

    checkLocalStorage();

    if (notesArr.length == 1) {
      setInputIsEmpty(true);
      setTextareaIsEmpty(true);
      setTitleInput();
      setTextInput();
      setNoteEditing();
    } else if (notesArr.length > 1 && id == noteEditing) {
      setInputIsEmpty(true);
      setTextareaIsEmpty(true);
      setTitleInput(notesArr[1][1].title);
      setTextInput(notesArr[1][1].txt);
      setNoteEditing(notesArr[1][1].id);
    }
  };

  return (
    <div className="App">
      <Sidebar
        allNotes={notesArr}
        checkFunc={checkLocalStorage}
        newFunc={newNote}
        editFunc={editNote}
        mask={isMask}
        maskFunc={maskSidebar}
        deleteFunc={deleteNote}
      />
      <main>
        <form>
          <label
            htmlFor="title-input"
            className={
              inputIsEmpty ? "label-title" : "label-title label-active"
            }
          >
            Titre
          </label>
          <input
            type="text"
            id="title-input"
            placeholder="Titre"
            maxLength={38}
            onInput={(e) => linkedTitle(e)}
            value={titleInput || ""}
            autoFocus
          />
          <label
            htmlFor="text-input"
            className={textareaIsEmpty ? "" : "label-active"}
          >
            Message
          </label>
          <textarea
            id="text-input"
            placeholder="Message"
            onInput={(e) => linkedText(e)}
            value={textInput || ""}
          />
          
        </form>
      </main>
    </div>
  );
}

export default App;
