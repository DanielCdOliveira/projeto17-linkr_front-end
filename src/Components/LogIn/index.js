import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../Context/Auth";

import { ThreeDots } from "react-loader-spinner";

export default function LogIn() {

  const { logIn } = useContext(AuthContext);
  const [disabled, setDisabled] = useState(false);


  const [data, setData] = useState({
    email: "",
    password: "",
  });
  function login(e) {
    setDisabled(true);
    e.preventDefault();
    logIn(data, setDisabled);
  }

  return (
    <main>
      <h1>linkr</h1>
      <h2>save, share and discover the best links on the web</h2>
      <form onSubmit={login}>
        <input
          type="email"
          name="email"
          id="email  "
          placeholder="E-mail"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Senha"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <button disabled={disabled} type="submit">
          {disabled ? (
            <ThreeDots color="#FFF" height={13} width={50} />
          ) : (
            "Log In"
          )}
        </button>
      </form>
      <Link to={"/signup"}>
        <p>First time? Create an account!</p>
      </Link>
    </main>
  );
}