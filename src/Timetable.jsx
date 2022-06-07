const arriving = (time) => (time < 1 ? "Due" : minOrMins(time));
const minOrMins = (time) => (time === 1 ? `${time} min` : `${time} min(s)`);
const minutes = (time) => Math.floor(time / 60);

const Timetable = ({ trains }) => {
  return (
    <table>
      <tbody>
        {trains.map(
          (
            next,
            index // using index as key as api returns duplicates
          ) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{next.towards} </td>
              <td>{arriving(minutes(next.timeToStation))}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};
export default Timetable;
