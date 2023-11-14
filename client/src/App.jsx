import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Landing from "./components/Landing/landing";
import HomePage from "./components/Home/HomePage";
import Nav from "./components/NavBar/NavBar";
import Detail from "./components/Detail/Detail";
import CreateDog from "./components/Form/CreateDog";

function App() {
  const location = useLocation();
  return (
    <>
      <div>{location.pathname !== "/" && <Nav />}</div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/newDog" element={<CreateDog />} />
      </Routes>
    </>
  );
}

export default App;
