import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [token, setToken] = useState({});
  const URL = "http://localhost:5000";

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
      setToken({
        ...response.data.token,
      });
      localStorage.setItem("token", JSON.stringify(response.data.token));
      navigate("/timeline");
    });
    promise.catch((e) => {
      setDisabled(false);
      if(e.response.status === 401){
        alert("Email e senha incompatíveis!")
      }
      console.log(e);
    });
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        logIn,
        URL
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;