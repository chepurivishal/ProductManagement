import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import Signup from "./Signup";
import LoginContext from "./context/loginContext";
import Header from "./Header";
import Login from "./loginPage";
import EditProduct from "./Templates/editProduct";
import AddProduct from "./Templates/addProduct";
import Home from "./Home";
import ViewCart from "./Templates/viewCart";

const history = createBrowserHistory();

function App() {
  const token = localStorage.getItem("token");
  const [isLoggedIn, setisLoggedIn] = useState(token ? true : false);
  const toggleLogIn = () => setisLoggedIn(isLoggedIn ? false : true);
  return (
    <Router history={history}>
      <div>
        <LoginContext.Provider value={{ isLoggedIn, toggleLogIn }}>
          <Header />
          <Switch>
            <Route
              exact
              path="/login"
              render={() => <Login history={history} />}
            />
            <Route exact path="/signup" render={() => <Signup />} />
            <Route exact path="/editproduct/:id" component={EditProduct} />
            <Route exact path="/viewcart/:userId" component={ViewCart} />
            <Route exact path="/addproduct" component={AddProduct} />
            <Route exact path="/" render={() => <Home />} />
          </Switch>
        </LoginContext.Provider>
      </div>
    </Router>
  );
}

export default App;
