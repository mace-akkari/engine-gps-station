import { useState } from "react";

const SearchBox = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const clickHandler = () => {
    onSearch(search);
  };

  return (
    <div>
      <input
        placeholder="Enter your station"
        value={search}
        type="text"
        className=""
        onChange={(e) => {
          console.log("here ", e.target.value);
          setSearch(e.target.value);
        }}
      />
      <button onClick={clickHandler}>search</button>
      <p>{search}</p>
    </div>
  );
};

export default SearchBox;
