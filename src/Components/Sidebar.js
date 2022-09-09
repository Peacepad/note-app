import React, { useEffect, useReducer } from "react";
import Mininote from "./Mininote";
import { useState, useRef } from "react";

const Sidebar = (props) => {
  const [miniNotes, setMiniNotes] = useState([]);

  const convertMiniNotes = (props) => {
    let allNotes = props.allNotes;
    let newArr = [];

    allNotes.forEach((note) => {
      let newNote = [note[0], note[1]];
      newArr.push(newNote);
    });

    setMiniNotes(newArr);
  };

  useEffect(() => convertMiniNotes(props), [props.allNotes]);

  const masked = props.mask ? "aside-mask" : "";


  return (
    <aside className={`${masked}`}>
      <div
        className={
          props.mask ? "reduce-sidebar reduce-sidebar-turn" : "reduce-sidebar"
        }
        onClick={() => {
          props.maskFunc();
        }}
      >
        ←
      </div>

      <button onClick={() => props.newFunc()}>Nouvelle Note</button>
      <ul className="notes-list">
        {miniNotes &&
          miniNotes.map((miniNote) => {
            return (
              <Mininote
                key={miniNote[0]}
                noteContent={miniNote}
                checkFunc={props.checkFunc}
                editFunc={props.editFunc}
                deleteFunc={props.deleteFunc}
              />
            );
          })}
      </ul>
    </aside>
  );
};

export default Sidebar;
