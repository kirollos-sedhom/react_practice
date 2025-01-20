import { useState } from "react";
import Accordion from "./components/accordion";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Accordion />
    </>
  );
}

export default App;
