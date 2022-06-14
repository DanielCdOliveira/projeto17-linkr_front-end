import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState({ token: "" });
  const [type, setType] = useState();

  const navigate = useNavigate();

  function logIn(data, setDisabled) {
    const URL = "http://localhost:4000";

    const promise = axios.post(URL, data);
    promise.then((response) => {
      setDisabled(false);
      setUser({
        ...response.data,
      });
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/home");
    });
    promise.catch((e) => {
      setDisabled(false);
      alert("Não foi possível concluir a ação!");
      console.log(e);
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        logIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;