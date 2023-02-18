import { useState, useEffect } from "react";
import Timetable from "./Timetable";
import Clock from "./clock";
import stations from "./stations.json";

// -- both the search and id, put both into lower case. deal when you can't find a station.
// -- useEffect -- [] - only kicks in when that variable changes.

// oxford circus = 940GZZLUOXC
// axios?
const dueNext = async ({ tubeName }) => {
  console.log("dsadasd", tubeName);
  const URL = `https://api.tfl.gov.uk/StopPoint/${tubeName}/Arrivals?modeFilter=tube`;

  try {
    const response = await fetch(URL);
    const data = await response.json();
    console.log("data -->", data);
    return data;
  } catch (error) {
    console.error(error);
    alert(
      "There has been an error with your request. Please refresh your browser and try again."
    );
    return [];
  }
};

const PlatformTimer = ({ stationSearch }) => {
  const [due, setDue] = useState();
  const [loading, setLoading] = useState(true);

  // const GPS = "940GZZLUOXC";
  console.log("stationSearch", stationSearch, stations);

  const sortAsc = (a, b) => a.timeToStation - b.timeToStation;

  // learn how this works!! using clousre -
  const platformFilter = (name) => (due) => due.platformName === name;

  useEffect(() => {
    let filteredGPS = stations.filter((element, idx) => {
      return element.station.toLowerCase() === stationSearch.toLowerCase();
    });

    console.log("filtered ", filteredGPS); //type array

    //[{}]

    if (filteredGPS?.length > 0) {
      (async () => {
        setDue(await dueNext({ tubeName: filteredGPS[0].naptanId }));
        setLoading(false);
        setInterval(async () => {
          setDue(await dueNext({ tubeName: filteredGPS[0].naptanId }));
        }, 30000);
      })();
    }
  }, [stationSearch]);

  if (loading) return <h2>Loading Data......</h2>;
  if (!due) return <h2>No data available</h2>;

  console.log("due ", due);

  // learn set
  const names = new Set();
  due?.length > 0 && due.forEach((x) => names.add(x.platformName));

  console.log("names ", names);

  const timetables = [...names].map((platformName) => {
    return (
      <div>
        <Timetable
          className="time_screen"
          trains={due.filter(platformFilter(platformName)).sort(sortAsc)}
          platformName={platformName}
        />
      </div>
    );
  });

  // order platforms - find a way,

  //console.log("names:", due);
  return (
    <>
      <Clock />
      {timetables}
    </>
  );
};

export default PlatformTimer;
