import React, { useContext, useState } from "react";
import LoginContext from "../context/loginContext";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  Badge,
  ButtonGroup,
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";

const Header = (props) => {
  const loginContext = useContext(LoginContext);
  const { isLoggedIn, toggleLogIn } = useContext(LoginContext);

  let history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toggleLogIn();
    history.push("/login");
  };

  const myProfileURL = `/userproduct/${localStorage.getItem("userId")}`;

  return (
    <div>
      <Navbar color="info" expand="lg" fixed="top">
        <Link className="navbar-brand" to="/">
          <h4>Product Management System</h4>
          </Link>
        <Nav className="mr-auto" navbar></Nav>
        <NavItem>
          {loginContext.isLoggedIn ? (
            <Button size="sm" color="white" onClick={handleLogout}>
              LOGOUT
            </Button>
          ) : (
            <React.Fragment>
              <ButtonGroup>
                <Button
                  size="sm"
                  color="white"
                  onClick={() => history.push("/login")}
                >
                  LOGIN
                </Button>
                <Button
                  size="sm"
                  color="white"
                  onClick={() => history.push("/signup")}
                >
                  SIGNUP
                </Button>
              </ButtonGroup>
            </React.Fragment>
          )}
        </NavItem>
      </Navbar>
    </div>
  );
};

export default Header;
