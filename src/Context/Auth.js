import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const URL = "http://localhost:5000";

  const [user, setUser] = useState({});
  const [hashtags, setHashtags] = useState()


  const navigate = useNavigate();

  function logIn(data, setDisabled) {
    if(data.email === "" || data.password === ""){
      alert("Por favor, preencha todos os campos")
      setDisabled(false);
      return
    }
    const promise = axios.post(URL+"/signin", data);
    promise.then((response) => {
      setDisabled(false);
      setUser({
        ...response.data,
      });
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/timeline");
    });
    promise.catch((e) => {
      setDisabled(false);
      if(e.response.status === 401){
        alert("Email e senha incompatíveis!")
      }
      if(e.response.status === 422){
        alert("Por favor, insira um e-mail válido!")
      }
    });
  }

  const getTrending = () => {
    axios.get(URL + "/hashtag")
    .then((answer) => {setHashtags(answer.data)})
    .catch((e) => window.confirm(e.response.data));
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        logIn,
        URL,
        hashtags,
        getTrending
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;