const CreateNote = ({
  content,
  title,
  istitle,
  isdisable,
  inputHandler,
  itemHandler,
}) => {
  return (
    <>
      <h1 className="title">Create Note</h1>
      <form onSubmit={(e) => e.preventDefault()} className="mt-2">
        <input
          type="text"
          name="title"
          className="input"
          placeholder="Enter title"
          onChange={inputHandler}
          value={title}
          style={{
            border: istitle ? "" : "1px solid red",
          }}
        />

        <textarea
          rows="6"
          name="content"
          className="input mt-4"
          placeholder="Enter content"
          onChange={inputHandler}
          value={content}
        ></textarea>
        <button
          type="submit"
          className={`addBtn ${
            isdisable
              ? "cursor-no-drop opacity-70"
              : "active:bg-slate-800 active:scale-75"
          }`}
          disabled={isdisable}
          onClick={itemHandler}
        >
          Add Note
        </button>
      </form>
    </>
  );
};

export default CreateNote;
