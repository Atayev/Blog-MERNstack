import React from 'react'
import { Paper,Typography,TextField,Button,Avatar } from '@mui/material'
import styles from './Auth.module.scss'

function Signup() {
  return (
    <Paper className={styles.main}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Easy sign up
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <TextField className={styles.field} label="Full name" fullWidth />
      <TextField className={styles.field} label="E-Mail" fullWidth />
      <TextField className={styles.field} label="Password" fullWidth />
      <Button size="large" variant="contained" fullWidth>
        Sign UP
      </Button>
    </Paper>
  )
}

export default Signup