import React, { useState, useEffect } from "react";
import Menu from "react-burger-menu/lib/menus/slide";
import Link from "next/link";

import styles from "../data/styleCss";
import CreateNote from "./CreateNote";
import EditNote from "./EditNote";
import SearchNote from "./SearchNote";
import NoteItems from "./NoteItems";
import { BsPlusLg } from "react-icons/bs";
import { CgLogOut } from "react-icons/cg";
import SingleNote from "./SingleNote";
import Image from "next/image";
import logo from "../public/img/logo11.png";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
// get local item in array
function getLocalItem() {
  if (typeof window !== "undefined") {
    let list = localStorage.getItem("lists");

    if (list) {
      return JSON.parse(list);
    } else {
      return [];
    }
  }
}

const Note = () => {
  const [input, setInput] = useState({
    title: "",
    content: "",
    isActionId: null,
    isAction: false,
  });
  const [items, setItems] = useState(getLocalItem());
  const [search, setSearch] = useState("");
  const [edititem, setEdititem] = useState(input);
  const [editId, setEditId] = useState(null);
  const [show, setShow] = useState(false);
  const [isdisable, setisdisable] = useState(true);
  const [istitle, setistitle] = useState(true);
  const [istitleEdit, setistitleEdit] = useState(true);
  const [isdisableEdit, setisdisableEdit] = useState(false);
  const [audioBtn, setAudioBtn] = useState(null);
  const [notepop, setnotePop] = useState(false);
  const [singleNotes, setSinglenote] = useState({});
  const [issingleNotes, setisSinglenote] = useState(false);
  const [ismenu, setIsmenu] = useState(false);
  // ==========

  // ==========
  const inputHandler = (e) => {
    let { name, value } = e.target;
    setInput((prevInp) => {
      return {
        ...prevInp,
        [name]: value,
      };
    });
    if ((name === "title" || name === "content") && value === "") {
      setisdisable(true);
      setistitle(false);
    } else {
      setisdisable(false);
      setistitle(true);
    }
  };

  // ==========
  const SearchHandler = (e) => {
    setSearch(e.target.value);
    setInput((prevInp) => {
      return {
        ...prevInp,
        isActionId: null,
        isAction: false,
      };
    });
  };
  const handleCross = () => {
    setSearch("");
  };
  // ==========
  const itemHandler = () => {
    if (!input.title) {
      setistitle(false);
      return null;
    }

    let allInput = {
      id: new Date().getTime().toString(),
      title: input.title,
      content: input.content,
      done: false,
      time: new Date().toLocaleString(),
    };
    setItems((olditem) => {
      return [...olditem, allInput];
    });

    setInput((prevInp) => {
      return {
        ...prevInp,
        title: "",
        content: "",
      };
    });
    setisdisable(true);
    setistitle(true);
    setnotePop(false);
    audioBtn?.play();
  };

  // ==========
  const deleteItems = (id) => {
    setItems((olditem) => {
      return olditem.filter((dltItem) => {
        return dltItem.id !== id;
      });
    });
  };

  // ==========
  const ClearAll = () => {
    setItems([]);
    setIsmenu(false);
  };

  // ==========
  const editItem = (id) => {
    let newitem = items.find((item) => {
      return item.id === id;
    });
    setEdititem({
      title: newitem.title,
      content: newitem.content,
    });
    setInput((prevInp) => {
      return {
        ...prevInp,
        isActionId: null,
        isAction: false,
      };
    });
    setEditId(id);
    setShow(!show);
  };

  // ==========
  let editTodoinput = (e) => {
    let { name, value } = e.target;

    setEdititem((prevInp) => {
      return {
        ...prevInp,
        [name]: value,
      };
    });
    if (name === "title" && value === "") {
      setisdisableEdit(true);
      setistitleEdit(false);
    } else {
      setisdisableEdit(false);
      setistitleEdit(true);
    }
  };

  // ==========
  let editTodo = () => {
    if (!edititem.title) {
      setistitleEdit(false);
      return null;
    }

    let editlist = items.map((item) => {
      if (item.id === editId) {
        return {
          ...item,
          title: edititem.title,
          content: edititem.content,
        };
      }
      return item;
    });

    setItems([].concat(editlist));
    setShow(!show);
    setistitleEdit(true);
  };

  // ==========

  let handleDone = (id) => {
    let updatedItems = items.map((item) => {
      if (id === item.id) item.done = !item.done;

      return item;
    });
    // State Updates are Merged
    setItems([].concat(updatedItems));
    setInput((prevInp) => {
      return {
        ...prevInp,
        isActionId: null,
        isAction: false,
      };
    });
  };
  let handleAction = (id) => {
    if (id === input.isActionId) {
      setInput((prevInp) => {
        return {
          ...prevInp,
          isAction: !prevInp.isAction,
        };
      });
    } else {
      setInput((prevInp) => {
        return {
          ...prevInp,
          isAction: true,
          isActionId: id,
        };
      });
    }
  };
  let createNote = () => {
    setnotePop((pop) => !pop);
    setInput((prevInp) => {
      return {
        ...prevInp,
        isActionId: null,
        isAction: false,
      };
    });
    setSearch("");
  };
  // ==========

  let singleNote = (id) => {
    let singleitem = items.find((item) => {
      return item.id === id;
    });

    setSinglenote({
      title: singleitem.title,
      content: singleitem.content,
      time: singleitem.time,
    });
    setInput((prevInp) => {
      return {
        ...prevInp,
        isActionId: null,
        isAction: false,
      };
    });
    setisSinglenote(true);
  };

  let handleOnOpen = () => {
    setIsmenu(!ismenu);
    setInput((prevInp) => {
      return {
        ...prevInp,
        isActionId: null,
        isAction: false,
      };
    });
  };
  let handleOnClose = () => {
    setIsmenu(false);
  };

  // set local item in array
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    setAudioBtn(new Audio("../media/button.mp3"));
  }, []);

  useEffect(() => {
    ismenu
      ? document.body.classList?.add("overflow-hidden")
      : document.body.classList?.remove("overflow-hidden");
  }, [ismenu]);

  return (
    <>
      <header className="note-head">
        <div className="logo w-40">
          <Link href="/">
            <a>
              <Image src={logo} alt="logo" className="w-full" />
            </a>
          </Link>
        </div>
        <div className="project text-left">
          <Menu
            onOpen={handleOnOpen}
            onClose={handleOnClose}
            isOpen={ismenu}
            isClose={ismenu}
            right
            customBurgerIcon={<HiOutlineMenuAlt1 />}
            width={"280px"}
            pageWrapId={"page-wrap"}
            outerContainerId={"outer-container"}
            styles={styles}
          >
            <p className="menu-item">
              {items?.length > 0
                ? `You have ${items?.length} note`
                : "You don't have any note"}
            </p>
            <button
              onClick={ClearAll}
              className="menu-item text-white hover:text-zinc-300"
            >
              Clear All
            </button>
            <p className="menu-item">
              <Link href="https://lebriact.com/">
                <a className="font-normal text-white hover:text-zinc-300 underline">
                  Others Project
                </a>
              </Link>
            </p>
          </Menu>
        </div>
      </header>

      <h1 className="title">What's the Plan for Today?</h1>
      {/* search note */}
      <SearchNote
        search={search}
        SearchHandler={SearchHandler}
        handleCross={handleCross}
      />

      {/* create note */}

      {notepop && (
        <div className="note-pop">
          <div className="max-w-[1120px] mx-auto">
            <button
              onClick={() => setnotePop(false)}
              type="button"
              className="popbtn"
            >
              <CgLogOut />
            </button>
            <CreateNote
              title={input.title}
              content={input.content}
              istitle={istitle}
              isdisable={isdisable}
              inputHandler={inputHandler}
              itemHandler={itemHandler}
            />
          </div>
        </div>
      )}

      <button onClick={createNote} type="button" className="btnCreate z-40">
        <BsPlusLg />
      </button>

      <div className="count text-center text-white text-2xl mt-5 mb-5">
        <p>
          {items?.length > 0
            ? `You have ${items?.length} note`
            : "You don't have any note"}
        </p>
      </div>

      {/* note list && edit note */}
      {!show ? (
        <ul className="mt-8">
          {items
            ?.filter((item) => {
              if (search === "") return item;
              if (item.title.toLowerCase().includes(search.toLowerCase())) {
                return item;
              }
              return false;
            })
            .map((item) => {
              return (
                <NoteItems
                  title={item.title}
                  content={item.content}
                  key={item.id}
                  id={item.id}
                  dlt={deleteItems}
                  edit={editItem}
                  done={item.done}
                  handleDone={handleDone}
                  time={item.time}
                  handleAction={handleAction}
                  isAction={input.isAction}
                  isActionId={input.isActionId}
                  singleNote={singleNote}
                />
              );
            })}
        </ul>
      ) : (
        <div className="note-pop">
          <div className="max-w-[1120px] mx-auto">
            <button
              onClick={() => setShow(false)}
              type="button"
              className="popbtn"
            >
              <CgLogOut />
            </button>
            <EditNote
              title={edititem.title}
              content={edititem.content}
              editTodoinput={editTodoinput}
              editTodo={editTodo}
              isdisableEdit={isdisableEdit}
              istitleEdit={istitleEdit}
            />
          </div>
        </div>
      )}
      {issingleNotes && (
        <div className="note-pop">
          <div className="max-w-[1120px] mx-auto">
            <button
              onClick={() => setisSinglenote(false)}
              type="button"
              className="popbtn"
            >
              <CgLogOut />
            </button>
            <SingleNote
              title={singleNotes.title}
              content={singleNotes.content}
              time={singleNotes.time}
            />
          </div>
        </div>
      )}

      {/* {items?.length > 1 && (
        <button
          className="text-center w-1/2 mt-4  mx-auto block border rounded p-2 text-gray-600 border-gray-600  hover:text-red-800 hover:border-red-800 active:scale-90"
          onClick={ClearAll}
        >
          Clear All
        </button>
      )} */}
    </>
  );
};

export default Note;
