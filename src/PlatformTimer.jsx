import { useState, useEffect } from "react";
import Timetable from "./Timetable";
import Clock from "./clock";

const GPS = "940GZZLUGPS";
const URL = `https://api.tfl.gov.uk/StopPoint/${GPS}/Arrivals?modeFilter=tube`;

// oxford circus = 940GZZLUOXC
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

  // learn how this works!! using clousre -
  const platformFilter = (name) => (due) => due.platformName === name;

  useEffect(() => {
    (async () => {
      setDue(await dueNext());
      setLoading(false);
      setInterval(async () => {
        setDue(await dueNext());
      }, 30000);
    })();
  }, []);

  if (loading) return <h2>Loading Data......</h2>;
  if (!due) return <h2>No data available</h2>;

  // learn set
  const names = new Set();
  due.forEach((x) => names.add(x.platformName));

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

  console.log("names:", names);
  return (
    <>
      <Clock />
      {timetables}
    </>
  );
};

export default PlatformTimer;
