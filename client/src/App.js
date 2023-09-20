import { BrowserRouter, Routes, Route } from "react-router-dom"
import Mediathek from "./components/Mediathek";
import Add from "./components/Add";
import Update from "./components/Update";
import "./style.css"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Mediathek/>} />
          <Route path="/add" element={<Add/>} />
          <Route path="/update" element={<Update/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
