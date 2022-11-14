import React from "react";
import { Button, Container } from "@mui/material";
import Box from "@mui/material/Box";
import styles from "./Navbar.module.scss";
import {Link,useNavigate} from 'react-router-dom'
function Navbar() {
    const navigate = useNavigate()
  return (
    <Box className={styles.header}>
      <Container maxWidth="lg">
        <Box className={styles.inner}>
          <Box>
            <Link className={styles.logo} to='/'>Atayev Blog</Link>
          </Box>
          <Box>
            <Button variant="outlined" sx={{ marginRight: "5px" }} onClick={()=>navigate('/signin')}>
              Sign IN
            </Button>
            <Button variant="contained" onClick={()=>navigate('/signup')}>Sign UP</Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Navbar;
