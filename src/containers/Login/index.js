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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  // const [loading, setLoading] = useState(false);
  // const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      // history.push("/");
      enqueueSnackbar("Login Successful", {
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
        TransitionComponent: Grow,
        variant: "success",
      });
    } catch (e) {
      enqueueSnackbar("Failed to Log In!", {
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
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            inputRef={emailRef}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={passwordRef}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container justify="flex-end">
            {/* <Grid item xs>
              <Link to="#">Forgot password?</Link>
            </Grid> */}
            <Grid item>
              <Button color="primary" to="/signup" component={Link}>
                {"Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Login;
