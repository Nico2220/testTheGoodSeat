import React from "react";
import "./styles/App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login } from "./components/users/Login";
import { Signup } from "./components/users/Signup";
import { Map } from "./components/googlemap/Map";
import PrivateRoute from "./components/routing/PrivateRoute";
import { axiosInstance } from "./config/index";

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const loginUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log(email, phoneNumber);
    const stringBody = JSON.stringify({ email, phoneNumber });
    try {
      const response = await axiosInstance.post("/auth/loginuser", stringBody);
      if (response.data.statusCode === 200) {
        localStorage.setItem("usertoken", response.data.body.token);
        setIsAuthenticated(true);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const logOutUser = () => {
    localStorage.removeItem("usertoken");
    setIsAuthenticated(false);
  };

  React.useEffect(() => {
    if (localStorage.getItem("usertoken")) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login
            loginUser={loginUser}
            email={email}
            setEmail={setEmail}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            loading={loading}
            isAuthenticated={isAuthenticated}
          />
        </Route>
        <Route exact path="/signup" component={Signup}></Route>
        <PrivateRoute
          exact
          path="/offers"
          isAuthenticated={isAuthenticated ? true : false}
          component={Map}
        ></PrivateRoute>
      </Switch>
      <button
        className="logout btn btn-primary"
        onClick={logOutUser}
        style={{ display: isAuthenticated ? "" : "none" }}
      >
        Log out
      </button>
    </Router>
  );
}

export default App;
