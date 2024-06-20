import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Drugname from "./components/Drugname";
import DrugDetail from "./components/DrugDetail";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/drugs/search" element={<Drugname/>}/>
        <Route path="/drugs" element={<DrugDetail />}/>
      </Routes>
    </div>
  );
}

export default App;
