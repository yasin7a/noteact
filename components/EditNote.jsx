import React from "react";

const EditNote = ({
  title,
  content,
  editTodoinput,
  editTodo,
  isdisableEdit,
  istitleEdit,
}) => {
  return (
    <>
    <h1 className="title">Edit Note</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          name="title"
          className="input"
          placeholder="Edit ToDo"
          onChange={editTodoinput}
          value={title}
          style={{
            border: istitleEdit ? "" : "1px solid red",
          }}
        />
        <textarea
          rows="6"
          name="content"
          className="input mt-4"
          placeholder="Edit ToDo"
          onChange={editTodoinput}
          value={content}
        ></textarea>
        <button
          type="submit"
          onClick={editTodo}
          className={`addBtn ${
            isdisableEdit
              ? "cursor-no-drop "
              : "active:bg-slate-800 active:scale-75"
          }`}
          disabled={isdisableEdit}
        >
          Edit Note
        </button>
      </form>
    </>
  );
};

export default EditNote;
