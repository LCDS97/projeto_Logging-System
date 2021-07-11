// ANCHOR Requisições do front-end
import "./App.css";
import { useHistory, BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";


import { AuthContext } from "./helpers/AuthContext";


function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  let history = useHistory();


  useEffect(() => {
    axios
      .get("http://localhost:3001/users/checkAuth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
    window.location.pathname = "/login"
  };


  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            <div className="links">
              {!authState.status ? (
                <>
                  <div className="links">
                    <Link to="/login"> Login</Link>
                    <Link to="/registration"> Registre-se</Link>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/"> Home Page</Link>
                  <Link to="/createpost"> Cria um Post</Link>
                  <div className="loggedInContainer">
                    <h2>{authState.username}</h2>
                    <button onClick={logout}> Logout </button>
                  </div>
                </>
              )}
            </div>
          </div>

          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/createpost" exact component={CreatePost} />
            <Route path="/post/:id" exact component={Post} />
            <Route path="/registration" exact component={Registration} />
            <Route path="/login" exact component={Login} />
            <Route path="/profile/:id" exact component={Profile} />
            <Route path="/changepassword" exact component={ChangePassword} />
            <Route path="*" exact component={PageNotFound} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
