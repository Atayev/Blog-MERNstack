import React from 'react'
import { Paper,Typography,TextField,Button } from '@mui/material'
import styles from './Auth.module.scss'
function Signin() {
  return (
      <Paper className={styles.main}>
          <Typography className={styles.title} variant='h5'>Sign in to your account</Typography>
          <TextField
        className={styles.field}
        label="E-Mail"
        error
        helperText="Email is incorrect"
        fullWidth
      />
          <TextField className={styles.field} label="Password" fullWidth />
          <Button size="large" variant="contained" fullWidth>
        Sign IN
      </Button>
    </Paper>   
  )
}

export default Signin