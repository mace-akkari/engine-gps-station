import PlatformTimer from "./PlatformTimer";
import "./App.css";

const App = () => {
  return (
    <section>
      <h1 className="heading">Great Portland Street Station</h1>
      <div className="moniters">
        <PlatformTimer />
      </div>
    </section>
  );
};

export default App;
