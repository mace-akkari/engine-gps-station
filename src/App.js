import PlatformTimer from "./PlatformTimer";
import "./App.css";

import SearchBox from "./SearchBox";
import { useState } from "react";

import JSONDATA from "./stations.json";

// throhtelling -- debouncing --> events

const App = () => {
  const [stationSearch, setStationSearch] = useState("");

  console.log(stationSearch);
  return (
    <div>
      <section>
        <div className="banner1"></div>
        <div className="banner2"></div>
        <div className="banner3"></div>
      </section>
      <div className="heading">GREAT PORTLAND STREET</div>
      <SearchBox
        onSearch={(search) => {
          console.log("search is ", search);
          setStationSearch(search);
        }}
      />
      <div className="moniters">
        <PlatformTimer stationSearch={stationSearch} />
      </div>
    </div>
  );
};

export default App;
