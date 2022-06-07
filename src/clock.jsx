import { useState, useEffect } from "react";

const Clock = () => {
  const [date, setDate] = useState(new Date());

  const refreshClock = () => {
    setDate(new Date());
  };
  const cleanup = () => clearInterval();
  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    cleanup(timerId);
  }, []);
  return <div className="clock">{date.toLocaleTimeString()}</div>;
};
export default Clock;
