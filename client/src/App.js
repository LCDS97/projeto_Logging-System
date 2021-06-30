// ANCHOR Requisições do front-end
import "./App.css";
//NOTE Importando axios para fazer requisições
import axios from "axios";

import { useEffect, useState } from "react";

function App() {
  const [listOfPosts, setListofPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListofPosts(response.data);
    });
  }, []);
  return (
    <div className="App">
      {listOfPosts.map((value, key) => {
        return (
          <div className="post">
            <div className="title">{value.title} </div>
            <div className="body">{value.postText} </div>
            <div className="footer">{value.username} </div>
          </div>
        )
      })}
    </div>
  );
}

export default App;
