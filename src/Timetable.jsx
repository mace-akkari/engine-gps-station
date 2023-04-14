const arriving = (time) => (time < 1 ? "Due" : minOrMins(time));
const minOrMins = (time) => (time === 1 ? `${time} min` : `${time} mins`);
const minutes = (time) => Math.floor(time / 60);

const Timetable = ({ trains, platformName }) => {
  return (
    <div div className="screen_container">
      <h2 className={`screen_header line-${trains[0].lineId}`}>
        {`${trains[0].lineName} Line`}
      </h2>
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
    </div>
  );
};
export default Timetable;
