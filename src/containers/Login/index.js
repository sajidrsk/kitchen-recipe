import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import {
  FormGroup,
  FormControl,
  Input,
  InputLabel,
  Button,
  Card,
  Container,
} from "@material-ui/core";

import { useAuth } from "../../contexts/auth-context";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  //   return <span>Hello</span>;

  return (
    <>
      <Container>
        {/* <Card.Body> */}
        <h2 className="text-center mb-4">Log In</h2>
        {/* {error && <Alert variant="danger">{error}</Alert>} */}
        <form onSubmit={handleSubmit} maxWidth="sm">
          <FormControl id="email">
            <InputLabel>Email</InputLabel>
            <Input type="email" inputRef={emailRef} required />
          </FormControl>
          <FormControl id="password">
            <InputLabel>Password</InputLabel>
            <Input type="password" inputRef={passwordRef} required />
          </FormControl>
          <Button variant="contained" color="secondary" type="submit">
            Login
          </Button>
        </form>
        {/* </Card.Body> */}
      </Container>
      <div className="w-100 text-center mt-2">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
};

export default Login;
