import { useState, useEffect } from "react";
import Timetable from "./Timetable";

const GPS = "940GZZLUGPS";
const URL = `https://api.tfl.gov.uk/StopPoint/${GPS}/Arrivals?modeFilter=tube`;

const dueNext = async () => {
  try {
    // Fetching train data asynchronously
    const response = await fetch(URL);
    // Waiting for the response
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    alert(
      "There has been an error with your request. Please refresh your browser and try again."
    );
  }
};

const PlatformTimer = () => {
  const [due, setDue] = useState();
  const [loading, setLoading] = useState(true);
  console.log("due: ", due);

  const sortAsc = (a, b) => a.timeToStation - b.timeToStation;
  const platform1 = (due) => due.platformName === "Westbound - Platform 1";
  const platform2 = (due) => due.platformName === "Eastbound - Platform 2";

  useEffect(() => {
    // An async IIFE to start the request on component init.

    (async () => {
      setDue(await dueNext()); // init call
      setLoading(false);
      setInterval(async () => {
        //then the setinterval
        setDue(await dueNext());
      }, 20000);
    })();
  }, []);
  if (loading) return <h2>Loading Data......</h2>;
  if (!due) return <h2>No data available</h2>;

  return (
    <>
      <div>
        <h2>Westbound </h2>
        <Timetable trains={due.filter(platform1).sort(sortAsc)} />
      </div>
      <div>
        <h2>Eastbound</h2>
        <Timetable trains={due.filter(platform2).sort(sortAsc)} />
      </div>
    </>
  );
};

export default PlatformTimer;
