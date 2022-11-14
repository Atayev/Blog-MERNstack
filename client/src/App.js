import { Route, Routes } from "react-router-dom";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import Navbar from "./components/Header/Navbar";

function App() {
  return (
    <div className="main">
      <Navbar />

      <Routes>
        <Route path="/signin" element={<Signin /> } />
        <Route path="/signup" element={<Signup /> } />

      </Routes>
    </div>
  );
}

export default App;
