const SingleNote = ({ title, content,time }) => {
  return (
    <>
      <h1 className="title">{title}</h1>
      <p className="text-white">{content}</p>
      <p className="text-white ml-auto text-right mt-5 text-sm">{time}</p>
    </>
  );
};

export default SingleNote;
