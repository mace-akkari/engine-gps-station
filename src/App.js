import PlatformTimer from "./PlatformTimer";
import "./App.css";

const App = () => {
  return (
    <div>
      <section>
        <div className="banner1"></div>
        <div className="banner2"></div>
        <div className="banner3"></div>
      </section>
      <div className="heading">GREAT PORTLAND STREET</div>
      <div className="moniters">
        <PlatformTimer />
      </div>
    </div>
  );
};

export default App;
