import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineDeleteForever } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
const NoteItems = ({
  title,
  content,
  id,
  dlt,
  edit,
  done,
  handleDone,
  handleAction,
  singleNote,
  isAction,
  isActionId,
  time,
}) => {
  return (
    <>
      <li
        className="todo-row flex justify-start items-center rounded-md item-min-h  text-white mt-3 drop-shadow-md gap-1 "
        style={{
          background: done ? "#1F2937" : "#0F172A",
        }}
      >
        <div className="p-4 check relative">
          <input
            type="checkbox"
            className="cursor-pointer"
            checked={done}
            onChange={() => handleDone(id)}
            id="checkMe"
          />
          <label htmlFor="checkMe"></label>
        </div>

        <div
          className="flex flex-col overflow-hidden mr-auto cursor-pointer hover:text-zinc-300 capitalize"
          onClick={() => {
            singleNote(id);
          }}
        >
          <p className="font-medium text-sm truncate">
            {title.substring(0, 15)}
            {title.length > 15 ? "..." : ""}
          </p>
          <p className="font-normal text-sm truncate">
            {content.substring(0, 50)}
            {content.length > 50 ? "..." : ""}
          </p>

          <p className="text-[10px] tracking-wider truncate">{time}</p>
        </div>

        <div className="p-2 relative mt-2">
          <button
            className="text-gray-600 hover:text-slate-400 text-2xl"
            onClick={() => handleAction(id)}
          >
            <BsThreeDotsVertical />
          </button>

          <div
            className={
              id === isActionId && isAction ? "action scale-100" : "action"
            }
          >
            <button onClick={() => dlt(id)} className="flex items-center gap-1 hover:text-slate-400">
             <MdOutlineDeleteForever/> <span>Delete</span>
            </button>

            <button onClick={() => edit(id)} className="flex items-center gap-1 mt-3 hover:text-slate-400">
             <BiEditAlt/> <span>Edit</span>
            </button>
          </div>
        </div>
      </li>
    </>
  );
};

export default NoteItems;
