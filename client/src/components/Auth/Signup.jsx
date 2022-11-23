import React from "react";
import { Paper, Typography, TextField, Button, Avatar } from "@mui/material";
import styles from "./Auth.module.scss";
import { fetchSignUp, selectIsAuth } from "../redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {Navigate } from 'react-router-dom'
function Signup() {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  const onSubmit = async (values) => {
    const data = await dispatch(fetchSignUp(values));
    if (data.payload) {
      localStorage.setItem("token", data.payload.token);
    } else if (!data.payload) {
      alert("Something went wrong.. Plesase try again");
    }
  };
  
  if (isAuth) {
    return <Navigate to='/'/>
  }

  return (
    <Paper className={styles.main}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Easy sign up
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register("fullName", { required: "Write a Full Name" })}
          className={styles.field}
          label="Full name"
          fullWidth
        />
        <TextField
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register("email", { required: "Write an email" })}
          className={styles.field}
          label="E-Mail"
          fullWidth
        />
        <TextField
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register("password", { required: "Write a password" })}
          className={styles.field}
          label="Password"
          fullWidth
        />
        <Button
          disabled={!isValid}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          Sign UP
        </Button>
      </form>
    </Paper>
  );
}

export default Signup;
