import { useState, useRef } from "react";

const SearchBox = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const inputRef = useRef(null);

  const clickHandler = (e) => {
    if (e.key === "Enter") {
      onSearch(inputRef.search);
    }
    onSearch(search);
  };

  return (
    <div className="search_bar">
      <input
        className="search_bar_text"
        placeholder="Enter your station"
        value={search}
        type="text"
        onKeyDown={clickHandler}
        onChange={(e) => {
          //console.log("here ", e.target.value);
          setSearch(e.target.value);
        }}
      />
      <button className="search_bar_text" onClick={clickHandler}>
        Search
      </button>
      {/* <p>{search}</p> */}
    </div>
  );
};

export default SearchBox;
