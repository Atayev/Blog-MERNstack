import React from 'react'
import { Paper,Typography,TextField,Button } from '@mui/material'
import styles from './Auth.module.scss'
import { useForm } from 'react-hook-form'
import {useDispatch,useSelector} from 'react-redux'
import { fetchUserData,selectIsAuth } from '../redux/slices/auth'
import { Navigate } from 'react-router-dom'
import { useEffect } from 'react'


function Signin() {
  const isAuth=useSelector(selectIsAuth)
  const dispatch = useDispatch()
  const { register,handleSubmit,setError,formState:{errors,isValid} } = useForm({
    defaultValues: {
      email: '',
      password:''
    },
    mode:'onChange'
  })
  const onSubmit = async(values) => {
    const data = await dispatch(fetchUserData(values))
    if (data.payload) {
      localStorage.setItem('token',data.payload.token)
    } 
    else if (!data.payload) {
      alert('Something went wrong.. Plesase try again')
    }

  }
  if (isAuth) {
    return <Navigate to='/'/>
  }
  return (
      <Paper className={styles.main}>
          <Typography className={styles.title} variant='h5'>Sign in to your account</Typography>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        className={styles.field}
          label="E-Mail"
          type='email'
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email',{required:'Write an email'})}
        fullWidth
      />
        <TextField
          className={styles.field}
          
          label="Password"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password',{required:'Write an password'})}
          fullWidth />
          <Button type='submit' size="large" variant="contained" fullWidth>
        Sign IN
      </Button>
         </form>
    </Paper>   
  )
}

export default Signin