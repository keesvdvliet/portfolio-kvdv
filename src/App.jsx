import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Outro from "./components/Outro";
import AnimatedCursor from "./components/AnimatedCursor";

function App() {
  return (
    <div className="App">
      <Hero />
      <Projects />
      <Experience />
      <Outro />

      <AnimatedCursor />
    </div>
  );
}

export default App;
