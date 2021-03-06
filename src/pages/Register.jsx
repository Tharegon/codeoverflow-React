import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Register = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState(false);
  const [authServerDown, setAuthServerDown] = useState(false);
  const [PasswordNotMatch, setPasswordNotMatch] = useState(false);
  const history = useHistory();
  
  const sendRequest = (password) => {
    const method = `/auth/register`
    const baseURL = `http://localhost:9000${method}`;
    axios
      .post(baseURL, {
        userName: userName,
        email: userEmail,
        password: password,
      })
      .then((res) => {
        console.log("Ok");
        let path = `/auth/login`;
        history.push(path);
      })
      .catch((err) => {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          console.log("error");
          setError(true);
        } else if (err.request) {
          // client never received a response, or request never left
          setAuthServerDown(true);
        } else {
          // anything else
        }
      });
  };

  const handlePost = (event) => {
    event.preventDefault();
    if (validateForm()) {
      sendRequest(userPassword);
    }
  };

  function validateForm() {
    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (userEmail && userPassword && userName) {
      if (userEmail.match(emailRegex)) {
        if (
          userEmail.length > 0 &&
          userPassword.length >= 8 &&
          userName.length > 3
        ) {
          return validateMatchingPasswords();
        } else {
          return false;
        }
      }
    }
  }

  function validateMatchingPasswords() {
    return userPassword == passwordConfirmation;
  }
  const handleEmail = (e) => {
    setError(false);
    setUserEmail(e.target.value);
  };

  const handleUserName = (e) => {
    setError(false);
    setUserName(e.target.value);
  };

  const handlePassword = (e) => {
    e.preventDefault();
    setError(false);
    setUserPassword(e.target.value);
  };

  const handlePasswordConfirmation = (e) => {
    e.preventDefault();
    setError(false);
    if (e.target.value != userPassword) {
      setPasswordNotMatch(true);
    } else {
      setPasswordNotMatch(false);
      setPasswordConfirmation(e.target.value);
    }
  };

  return (
    <div className={"registration-form"}>
      <form>
        <div>
          {PasswordNotMatch ? (
            <h1>Your password and confirmation password do not match.</h1>
          ) : null}
          {error ? (
            <h1>This username/email already in use!</h1>
          ) : (
            <h1>Sign up!</h1>
          )}
        </div>
        <div className={"forms"}>
          <form>
            <label htmlFor="my-input">Email address</label>
            <input
              id="email"
              aria-describedby="my-helper-text"
              onChange={handleEmail}
            />
          </form>
        </div>
        <div className={"forms"}>
          <form>
            <label htmlFor="my-input">User name</label>
            <input
              id="user-name"
              aria-describedby="my-helper-text"
              onChange={handleUserName}
            />
          </form>
        </div>
        <div className={"forms"}>
          <form>
            <label htmlFor="my-input">Password</label>
            <input
              id="password"
              aria-describedby="my-helper-text"
              onChange={handlePassword}
              type="password"
            />
          </form>
        </div>
        <div className={"forms"}>
          <form>
            <label htmlFor="my-input">Confirm Password</label>
            <input
              id="password-conf"
              aria-describedby="my-helper-text"
              onChange={handlePasswordConfirmation}
              type="password"
            />
          </form>
        </div>
        <div className={"forms"}>
          <input type="submit" value="submit" onClick={handlePost} />
        </div>
      </form>
    </div>
  );
};

export default Register;