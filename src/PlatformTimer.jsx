import { useState, useEffect } from "react";
import Timetable from "./Timetable";
import Clock from "./clock";

const GPS = "940GZZLUOXC";
const URL = `https://api.tfl.gov.uk/StopPoint/${GPS}/Arrivals?modeFilter=tube`;

const dueNext = async () => {
  try {
    const response = await fetch(URL);
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

  const sortAsc = (a, b) => a.timeToStation - b.timeToStation;
  const platform1 = (due) => due.platformName === "Westbound - Platform 1";
  const platform2 = (due) => due.platformName === "Eastbound - Platform 2";

  useEffect(() => {
    (async () => {
      setDue(await dueNext());
      console.log("due: ", due);
      console.log("station:", due.towards);
      setLoading(false);
      setInterval(async () => {
        setDue(await dueNext());
      }, 30000);
    })();
  }, []);

  if (loading) return <h2>Loading Data......</h2>;
  if (!due) return <h2>No data available</h2>;

  // const names = new Set();
  // due.forEach((x) => names.add(x.platformName));
  return (
    <>
      <div>
        <h2 className="screen_header">Westbound </h2>
        <Timetable
          className="time_screen"
          trains={due.filter(platform1).sort(sortAsc)}
        />
      </div>
      <Clock />
      <div>
        <h2 className="screen_header">Eastbound</h2>
        <Timetable trains={due.filter(platform2).sort(sortAsc)} />
      </div>
    </>
  );
};

export default PlatformTimer;
