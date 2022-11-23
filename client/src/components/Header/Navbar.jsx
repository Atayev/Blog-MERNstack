import React from "react";
import { Button, Container } from "@mui/material";
import Box from "@mui/material/Box";
import styles from "./Navbar.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsAuth } from "../redux/slices/auth";

function Navbar() {
  const dispatch=useDispatch()
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();
  const handleLogout = () => {
    if (window.confirm('Are you sure want to logout?'))
    { dispatch(logout()) }

    localStorage.removeItem('token')
  }
  return (
    <Box className={styles.header}>
      <Container maxWidth="lg">
        <Box className={styles.inner}>
          <Box>
            <Link className={styles.logo} to="/">
              Atayev Blog
            </Link>
          </Box>
          <Box className={styles.buttons}>
            {isAuth ? (
              <>
                  <Button
                  variant="contained"
                  onClick={()=>navigate('/add-post')}
                >Add Post
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="contained"
                  color="error"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outlined"
                  sx={{ marginRight: "5px" }}
                  onClick={() => navigate("/signin")}
                >
                  Sign IN
                </Button>
                <Button variant="contained" onClick={() => navigate("/signup")}>
                  Sign UP
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Navbar;
