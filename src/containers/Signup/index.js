import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import {
  FormGroup,
  FormControl,
  Input,
  InputLabel,
  Button,
  RootRef,
} from "@material-ui/core";

import { useAuth } from "../../contexts/auth-context";

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      console.log(emailRef.current.value, passwordRef.current.value);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  //   return <span>Hello</span>;

  return (
    <>
      {/* <Card> */}
      {/* <Card.Body> */}
      <h2 className="text-center mb-4">Sign Up</h2>
      {/* {error && <Alert variant="danger">{error}</Alert>} */}
      <form onSubmit={handleSubmit}>
        <FormControl id="email">
          <InputLabel>Email</InputLabel>
          <Input type="email" inputRef={emailRef} required />
        </FormControl>
        <FormControl id="password">
          <InputLabel>Password</InputLabel>
          <Input type="password" inputRef={passwordRef} required />
        </FormControl>
        <FormControl id="password-confirm">
          <InputLabel>Password Confirmation</InputLabel>
          <Input type="password" inputRef={passwordConfirmRef} required />
        </FormControl>
        <Button variant="contained" color="secondary" type="submit">
          Sign Up
        </Button>
      </form>
      {/* </Card.Body> */}
      {/* </Card> */}
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
};

export default Signup;
