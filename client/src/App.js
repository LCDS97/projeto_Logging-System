// ANCHOR Requisições do front-end
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";

function App() {
  const [authState, setAuthState] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setAuthState(true);
    }
  })

  return (
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>
        <Router>
          <div className="navbar">
            <Link to="/"> Home Page</Link>
            <Link to="/createpost"> Cria um Post</Link>
            {!authState && (
              <>
                <Link to="/login"> Login</Link>
                <Link to="/registration"> Registre-se</Link>
              </>
            )}
          </div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/createpost" exact component={CreatePost} />
            <Route path="/post/:id" exact component={Post} />
            <Route path="/registration" exact component={Registration} />
            <Route path="/login" exact component={Login} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
