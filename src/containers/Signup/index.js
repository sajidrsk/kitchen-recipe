import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Grow,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";

import { useAuth } from "../../contexts/auth-context";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {`Copyright © Kitchen Recipe by Sajid ${new Date().getFullYear()}.`}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  // const [loading, setLoading] = useState(false);
  // const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return enqueueSnackbar("Passwords do not match", {
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
        TransitionComponent: Grow,
        variant: "error",
      });
    }

    try {
      // setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      // history.push("/");
      enqueueSnackbar("SignUp Successful", {
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
        TransitionComponent: Grow,
        variant: "success",
      });
    } catch {
      enqueueSnackbar("Failed to create an account", {
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
        TransitionComponent: Grow,
        variant: "error",
      });
    }

    // setLoading(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                inputRef={emailRef}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={passwordRef}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="passwordConfirm"
                label="Password Confirm"
                type="password"
                id="passwordConfirm"
                inputRef={passwordConfirmRef}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button color="primary" to="/login" component={Link}>
                {"Already have an account? Sign in"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default SignUp;
