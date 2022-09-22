import React, { useEffect } from "react";
import Mininote from "./Mininote";
import { useState } from "react";
import searchIcon from "../icons/search.svg";

const Sidebar = (props) => {
  const [miniNotes, setMiniNotes] = useState([]);
  const [searchNotes, setSearchNotes] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const convertMiniNotes = (props) => {
    let allNotes = props.allNotes;
    let newArr = [];

    allNotes.forEach((note) => {
      let newNote = [note[0], note[1]];
      newArr.push(newNote);
    });

    setMiniNotes(newArr);
  };

  const linkedSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const search = () => {
    let searchArr = [];

    miniNotes.forEach((note) => {
      let noteTxt = note[1].txt;
      let noteTitle = note[1].title;
      noteTxt = noteTxt.toLowerCase();
      noteTitle = noteTitle.toLowerCase();

      if (noteTxt.includes(searchInput) || noteTitle.includes(searchInput)) {
        searchArr.push(note);
      }
    });

    if (searchArr == []) {
      setSearchNotes(searchArr);
    } else setSearchNotes(searchArr);

    if (searchInput.length == 0) {
      searchArr = [];
      setSearchNotes(searchArr);
    }
  };

  const stopSearch = () => {
    setSearchInput('')
  }

  useEffect(() => convertMiniNotes(props), [props.allNotes]);
  useEffect(() => search(), [searchInput]);

  const masked = props.mask ? "" : "sidebar-mask";

  return (
    <aside className={`sidebar ${masked}`}>
      <button
        onClick={() => {
          props.newFunc();
          props.maskFunc();
        }}
      >
        Nouvelle Note
      </button>

      

      <div className="search">
        <img src={searchIcon} />
        <input
          type="search"
          id="search-input"
          onInput={(e) => linkedSearch(e)}
          value={searchInput || ""}
        />
      </div>

      <ul className="notes-list">
        {searchNotes.length == 0 && searchInput.length == 0
          ? miniNotes.map((miniNote) => {
              return (
                <Mininote
                  key={miniNote[0]}
                  noteContent={miniNote}
                  checkFunc={props.checkFunc}
                  editFunc={props.editFunc}
                  deleteFunc={props.deleteFunc}
                  maskFunc={props.maskFunc}
                  stopSearchFunc={stopSearch}
                />
              );
            })
          : searchNotes.map((miniNote) => {
              return (
                <Mininote
                  key={miniNote[0]}
                  noteContent={miniNote}
                  checkFunc={props.checkFunc}
                  editFunc={props.editFunc}
                  deleteFunc={props.deleteFunc}
                  stopSearchFunc={stopSearch}
                />
              );
            })}
      </ul>
    </aside>
  );
};

export default Sidebar;
