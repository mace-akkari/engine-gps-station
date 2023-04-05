import { useState } from "react";

import PlatformTimer from "./PlatformTimer";
import SearchBox from "./SearchBox";
import Header from "./Header";
import Clock from "./clock";

import "./App.css";

// throhtelling -- debouncing --> events

const App = () => {
  const [stationSearch, setStationSearch] = useState("");

  console.log(stationSearch);
  return (
    <div>
      <Header />
      <SearchBox
        onSearch={(search) => {
          //console.log("search is ", search);
          setStationSearch(search);
        }}
      />
      <Clock />
      <div className="moniters">
        <PlatformTimer stationSearch={stationSearch} />
      </div>
    </div>
  );
};

export default App;
