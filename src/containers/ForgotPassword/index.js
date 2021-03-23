import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
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

const ForgotPassword = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await resetPassword(emailRef.current.value);

      enqueueSnackbar("Password Reset Email Sent to Your Mail", {
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
        TransitionComponent: Grow,
        variant: "success",
      });
    } catch (e) {
      console.log(e);
      enqueueSnackbar(e.message, {
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
        TransitionComponent: Grow,
        variant: "error",
      });
    }

    setLoading(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Password Reset
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            Reset Password
          </Button>
          <Grid container justify="flex-end">
            <Grid item xs>
              <Button color="primary" to="/login" component={Link}>
                {"Log In!"}
              </Button>
            </Grid>
            <Grid item>
              <Button color="primary" to="/signup" component={Link}>
                {"Don't have an account? SignUp"}
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

export default ForgotPassword;
