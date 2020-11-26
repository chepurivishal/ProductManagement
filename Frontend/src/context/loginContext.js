import React, { createContext } from "react";

const LoginContext = createContext({
  isLoggedIn: false,
  toggleLogIn: () => {},
});

const LoggedInUser = createContext({
  userName: "",
  setUserName: () => {},
});

export const LoginContextProvider = LoginContext.Provider;
export default LoginContext;
