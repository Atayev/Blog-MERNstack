import { Route, Routes } from "react-router-dom";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import Home from "./pages/Home/Home";
import Navbar from "./components/Header/Navbar";
import Container from '@mui/material/Container'
import { AddPost } from "./pages/Addpost/AddPost";
import { FullPost } from "./pages/FullPost";
function App() {
  return (
    <div className="main">
      <Navbar />
      <Container maxWidth="lg">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/posts" element={<AddPost />} />
        <Route path="/posts/:id" element={<FullPost />} />
      </Routes>
      </Container>
    </div>
  );
}

export default App;
