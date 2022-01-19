import React from "react";
import { FaTimesCircle } from "react-icons/fa";

const SearchNote = ({ search, SearchHandler, handleCross }) => {
  return (
    <>
      <div className="w-full relative">
        <input
          type="text"
          placeholder="Search with title..."
          onChange={SearchHandler}
          className="input rounded-3xl pr-10 bg-gray-900"
          value={search}
        />
        {search && (
          <button onClick={handleCross} className="cross">
            <FaTimesCircle />
          </button>
        )}
      </div>
    </>
  );
};

export default SearchNote;
