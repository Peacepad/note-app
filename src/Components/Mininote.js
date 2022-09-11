import { useEffect, useState } from "react";
import trash from "../icons/trash.svg";

const Mininote = (props) => {
  const displayDate = (date) => {
    let hour = date.split("T")[1];
    hour = hour.split(".")[0];
    date = date.split("T")[0];
    date =
      date.split("-")[2] + " " + date.split("-")[1] + " " + date.split("-")[0];

    return `Modifiée le: ${date} à ${hour}`;
  };

  const minimizeTxt = (bigTxt) => {
    let miniTxt = bigTxt;

    if (miniTxt.length > 34) miniTxt = miniTxt.slice(0, 35) + "...";

    return miniTxt;
  };

  const mininoteAnim = (e) => {
    e.target.classList.add("mininote-anim");
    const mininoteTimer = setTimeout(() => {
      e.target.classList.remove("mininote-anim");
    }, 300);
    e.preventDefault();
    e.stopPropagation();

    return () => {
      clearTimeout(mininoteTimer);
    };
  };

  return (
    <li
      id={`mininote_${props.noteContent[0]}`}
      className={"mininote"}
      onClick={(e) => {
        props.editFunc(
          props.noteContent[1].id,
          props.noteContent[1].title,
          props.noteContent[1].txt
        );

        mininoteAnim(e);
      }}
    >
      <p className="mininote-title">{props.noteContent[1].title}</p>
      <p className="mininote-txt">{minimizeTxt(props.noteContent[1].txt)}</p>
      <p className="mininote-date"> {displayDate(props.noteContent[1].date)}</p>
      <div
        onClick={(e) => {
          props.deleteFunc(e, props.noteContent[1].id);
        }}
        className="mininote-delete"
      >
        <img src={trash} />
      </div>
    </li>
  );
};

export default Mininote;
