import React, { useEffect } from "react";
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

  const masked = props.mask ? "" : "sidebar-mask";

  return (
    <aside className={`sidebar ${masked}`}>
      <button onClick={() => {props.newFunc(); props.maskFunc()}}>Nouvelle Note</button>
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
