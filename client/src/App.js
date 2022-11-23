import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import Home from "./pages/Home/Home";
import Navbar from "./components/Header/Navbar";
import Container from "@mui/material/Container";
import { AddPost } from "./pages/Addpost/AddPost";
import { FullPost } from "./pages/FullPost";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth, fetchMe } from "./components/redux/slices/auth";
function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  useEffect(() => {
    dispatch(fetchMe());
  }, []);

  return (
    <div className="main">
      <Navbar />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/posts/:id" element={<FullPost />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
