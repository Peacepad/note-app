import React from "react";
import { useEffect, useState, useRef } from "react";
import clouddIcon from "../icons/cloudd.svg";
import clouduIcon from "../icons/cloudu.svg";
import Sidebar from "./Sidebar.js";
import { v4 as uuidv4 } from "uuid";
import { gsap, Power2 } from "gsap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [titleInput, setTitleInput] = useState();
  const [inputIsEmpty, setInputIsEmpty] = useState(true);
  const [textareaIsEmpty, setTextareaIsEmpty] = useState(true);
  const [textInput, setTextInput] = useState();
  const [notesArr, setNotesArr] = useState([]);
  const [noteEditing, setNoteEditing] = useState("");
  const [isMask, setIsMask] = useState(false);
  const [isTitleActive, setIsTitleActive] = useState(false);
  const [isTextActive, setIsTextActive] = useState(false);

  const inputRef = useRef(null);
  const textRef = useRef(null);
  const inputContainerRef = useRef(null);
  const textContainerRef = useRef(null);

  const clickTitle = (e) => {
    e.preventDefault();
    setIsTitleActive(true);
    setIsMask(false);
    if (!isTitleActive) {
      inputRef.current.focus();
      inputRef.current.style.cursor = "text";
      textRef.current.style.cursor = "pointer";
      setIsTextActive(false);
    }
  };

  const clickText = (e) => {
    e.preventDefault();
    setIsTextActive(true);
    setIsMask(false);
    if (!isTextActive) {
      textRef.current.focus();
      inputRef.current.style.cursor = "pointer";
      textRef.current.style.cursor = "text";
      setIsTitleActive(false);
    }
  };

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
    } else setTextareaIsEmpty(true);
  };

  const saveNewNote = () => {
    const newNote = {};
    newNote.txt = textInput;
    newNote.title = titleInput;
    newNote.date = new Date();

    if (noteEditing === "") {
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

  const saveNewNoteFromCloud = (newNote) => {
    const note = {};

    newNote.content = decodeURIComponent(newNote.content);

    note.txt = newNote.content;
    note.title = newNote.title;
    note.date = newNote.date;
    note.id = newNote.id;

    console.log(note);
    localStorage.setItem(`note_${newNote.id}`, JSON.stringify(note));
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

  useEffect(() => {
    autoBackup();
  }, [textInput, titleInput]);

  const autoBackup = () => {
    if (textareaIsEmpty === false && inputIsEmpty === false) saveNewNote();
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

    deleteOnline(id);
    checkLocalStorage();

    if (notesArr.length === 1) {
      setInputIsEmpty(true);
      setTextareaIsEmpty(true);
      setTitleInput();
      setTextInput();
      setNoteEditing();
    } else if (notesArr.length > 1 && id === noteEditing) {
      setInputIsEmpty(true);
      setTextareaIsEmpty(true);
      setTitleInput(notesArr[1][1].title);
      setTextInput(notesArr[1][1].txt);
      setNoteEditing(notesArr[1][1].id);
    }
  };

  const deleteOnline = async(id) => {
    const token = localStorage.getItem("token");

    let data = {
      id: id,
    };

    const response = await fetch(`${process.env.REACT_APP_URL_DELETE}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify(data),
    })

    if(!response.ok) console.log(response.status)
      
  }

  // -- Effet d'enfoncement sur les inputs container
  useEffect(() => {
    if (isTitleActive) {
      gsap.to(inputContainerRef.current, {
        boxShadow: "none",
        opacity: 0.5,
        duration: 0.1,
        ease: Power2.easeOut,
      });
      const timeAnimation = setTimeout(() => {
        gsap.to(inputContainerRef.current, {
          boxShadow:
            "rgba(163, 177, 198, 0.5) 5px 5px 10px 0px inset, rgb(255, 255, 255) -5px -5px 10px 0px inset",
          opacity: 1,
          duration: 0.1,
          ease: Power2.easeOut,
        });
      }, 200);

      return () => clearTimeout(timeAnimation);
    } else {
      gsap.to(inputContainerRef.current, {
        boxShadow: "none",
        opacity: 0.5,
        duration: 0.1,
        ease: Power2.easeOut,
      });

      const timeAnimation = setTimeout(() => {
        gsap.to(inputContainerRef.current, {
          boxShadow:
            "rgba(163, 177, 198, 0.5) 5px 5px 10px 0px,rgb(255, 255, 255) -5px -5px 10px 0px",
          opacity: 1,
          duration: 0.1,
        });
      }, 200);
      return () => clearTimeout(timeAnimation);
    }
  }, [isTitleActive]);

  useEffect(() => {
    if (isTextActive) {
      gsap.to(textContainerRef.current, {
        boxShadow: "none",
        opacity: 0.5,
        duration: 0.1,
        ease: Power2.easeOut,
      });
      const timeAnimation = setTimeout(() => {
        gsap.to(textContainerRef.current, {
          boxShadow:
            "rgba(163, 177, 198, 0.5) 5px 5px 10px 0px inset, rgb(255, 255, 255) -5px -5px 10px 0px inset",
          opacity: 1,
          duration: 0.1,
          ease: Power2.easeOut,
        });
      }, 200);

      return () => clearTimeout(timeAnimation);
    } else {
      gsap.to(textContainerRef.current, {
        boxShadow: "none",
        opacity: 0.5,
        duration: 0.1,
        ease: Power2.easeOut,
      });

      const timeAnimation = setTimeout(() => {
        gsap.to(textContainerRef.current, {
          boxShadow:
            "rgba(163, 177, 198, 0.5) 5px 5px 10px 0px,rgb(255, 255, 255) -5px -5px 10px 0px",
          opacity: 1,
          duration: 0.1,
        });
      }, 200);
      return () => clearTimeout(timeAnimation);
    }
  }, [isTextActive]);
  // -- Effet d'enfoncement sur les inputs container

  const saveOnline = async (e) => {
    e.preventDefault();
    let notesCloud = [];

    notesArr.forEach((note) => {
      notesCloud.push(note[1]);
    });
    const token = localStorage.getItem("token");

    const data = {
      notesCloud,
    };

    const response = await fetch(`${process.env.REACT_APP_URL_UPLOAD}`, {
      method: "POST",
      headers: {
        token: token,
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if(!response.ok) {
      console.log(response.status)
    }

  };

  const downloadFromCloud = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const response = await fetch(`${process.env.REACT_APP_URL_DOWNLOAD}`, {
      method: "GET",
      headers: { token: token, 
        "content-type": "application/json" },
    });

    
    if (response.ok) {
      const result = await response.json();
      
      result.results.forEach((newNote) => {
        saveNewNoteFromCloud(newNote);
      });

      checkLocalStorage();
    } else {
      console.log(response.status)
    }
  };

  return (
    <div>
      <Sidebar
        allNotes={notesArr}
        checkFunc={checkLocalStorage}
        newFunc={newNote}
        editFunc={editNote}
        mask={isMask}
        maskFunc={maskSidebar}
        deleteFunc={deleteNote}
      />
      <main className="note-container">
        <div
          className={
            isMask ? "reduce-sidebar reduce-sidebar-turn" : "reduce-sidebar"
          }
          onClick={() => {
            maskSidebar();
          }}
        >
          <div>→</div>
        </div>

        <div className="buttons-cloud">
          <button
            className="download-note"
            onClick={(e) => downloadFromCloud(e)}
          >
            Télécharger <img src={clouduIcon} alt="télécharger les notes" />
          </button>
          <button className="upload-note" onClick={(e) => saveOnline(e)}>
            Envoyer
            <img src={clouddIcon} alt="sauvegarder les notes" />
          </button>
        </div>

        <form className="note-form" onSubmit={(e) => e.preventDefault(e)}>
          <div
            className={"input-container"}
            ref={inputContainerRef}
            onClick={(e) => clickTitle(e)}
          >
            <label htmlFor="title-input" className="label-title">
              Titre
            </label>
            <input
              type="text"
              id="title-input"
              maxLength={38}
              onInput={(e) => linkedTitle(e)}
              value={titleInput || ""}
              ref={inputRef}
            />
          </div>

          <div
            className={"input-container input-container-text"}
            ref={textContainerRef}
            onClick={(e) => clickText(e)}
          >
            <label htmlFor="text-input" className="label-text">
              Message
            </label>
            <textarea
              id="text-input"
              onInput={(e) => linkedText(e)}
              value={textInput || ""}
              ref={textRef}
            />
          </div>
        </form>
      </main>
    </div>
  );
};

export default Home;
