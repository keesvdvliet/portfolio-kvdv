import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Outro from "./components/Outro";
import AnimatedCursor from "./components/AnimatedCursor";

function App() {
  //Check if the current device is a touch enabled device
  const isTouchDevice = window.matchMedia(
    "(hover: none) and (pointer: coarse)"
  ).matches;

  return (
    <div className="App">
      <Hero />
      <Projects />
      <Experience />
      <Outro />

      {/* Include the custom cursor only on mouse enbaled devices */}
      {isTouchDevice || <AnimatedCursor />}
    </div>
  );
}

export default App;
