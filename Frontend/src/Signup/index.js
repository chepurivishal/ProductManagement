import React, { useContext, useState } from "react";
import LoginContext from "../context/loginContext";
import { Link, useHistory } from "react-router-dom";
import {
  Card,
  CardBody,
  Button,
  Form,
  FormGroup,
  Input,
  Row,
  Col,
  InputGroupAddon,
  InputGroup,
  InputGroupText,
  Alert,
} from "reactstrap";

const urlconfig = require("../config/urlsconfig.json");
const config = require("../config/config.json");

const SignUp = (props) => {
  const history = useHistory();
  const { isLoggedIn, toggleLogIn } = useContext(LoginContext);
  let [userName, setUserName] = useState("");
  let [password, setPassword] = useState("");
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [isAdmin, setAdmin] = useState(false);
  let [type, setType] = useState("");
  const inputs = ["username", "password"];
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(true);

  const changeUserName = (e) => {
    setUserName((userName = e.target.value));
  };

  const changePassword = (e) => {
    setPassword((password = e.target.value));
  };
  const changeFirstName = (e) => {
    setFirstName((firstName = e.target.value));
  };
  const changeLastName = (e) => {
    setLastName((lastName = e.target.value));
  };
  const changeType = (e) => {
    setType((type = e.target.value));
  };

  const submitSignUp = () => {
    let body = {
      type: type,
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      password: password,
    };
    body = JSON.stringify(body);
    fetch(`${config.baseURL}${urlconfig.signup.uri}`, {
      method: urlconfig.signup.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    })
      .then((res) => {
        console.log("RES!!!!!!!!         ", res);
        inputs.forEach((input) => {
          document.getElementById(input).value = "";
        });
        if (res.status === 200) {
          return res.json();
        } else {
          setIsLoginSuccessful(false);
        }
      })
      .then((response) => {
        console.log("response!!!!!!!          ", response);
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", response.userName);
        localStorage.setItem("userId", response.userId);
        localStorage.setItem("type", response.type);
        console.log("sdefrgtyhujkiol", response);
        toggleLogIn();
        if (isAdmin) {
          history.push("/products");
        } else {
          history.push(`/prodselection/${response.userId}`);
        }
      });
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Row>
        <Col xs="4"></Col>
        <Col xs="4">
          <Card>
            <CardBody>
              <Form>
                <FormGroup>
                  <InputGroup size="sm">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>FIRST NAME</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      size="sm"
                      type="text"
                      name="firstname"
                      id="firstname"
                      onChange={changeFirstName}
                      autoComplete="off"
                    />
                  </InputGroup>
                  <br />
                  <InputGroup size="sm">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>LASTNAME</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      size="sm"
                      type="text"
                      name="lastname"
                      id="lastname"
                      onChange={changeLastName}
                    />
                  </InputGroup>
                  <br />
                  <InputGroup size="sm">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>USERNAME</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      size="sm"
                      type="text"
                      name="username"
                      id="username"
                      onChange={changeUserName}
                      autoComplete="off"
                    />
                  </InputGroup>
                  <br />
                  <InputGroup size="sm">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>PASSWORD</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      size="sm"
                      type="password"
                      name="password"
                      id="password"
                      onChange={changePassword}
                      autoComplete="off"
                    />
                  </InputGroup>
                  <br />
                  <InputGroup size="sm">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>TYPE</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      size="sm"
                      type="text"
                      name="role"
                      id="role"
                      onChange={changeType}
                      placeholder="Admin/User"
                      autoComplete="off"
                    />
                  </InputGroup>
                  <br />
                  <Button block color="info" size="sm" onClick={submitSignUp}>
                    SIGNUP
                  </Button>
                </FormGroup>
              </Form>
              {!isLoginSuccessful ? (
                <Alert color="danger"> Invalid Credentials!!</Alert>
              ) : (
                <React.Fragment />
              )}
            </CardBody>
          </Card>
        </Col>
        <Col xs="4"></Col>
      </Row>
    </div>
  );
};

export default SignUp;
