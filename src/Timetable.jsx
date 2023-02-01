const arriving = (time) => (time < 1 ? "Due" : minOrMins(time));
const minOrMins = (time) => (time === 1 ? `${time} min` : `${time} mins`);
const minutes = (time) => Math.floor(time / 60);

const Timetable = ({ trains, platformName }) => {
  return (
    <>
      <h2 className="screen_header">{platformName}</h2>
      <table className="time_screen">
        <tbody>
          {trains.map((next, index) => (
            <tr key={index}>
              <td>{next.towards} </td>
              <td>{arriving(minutes(next.timeToStation))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default Timetable;
