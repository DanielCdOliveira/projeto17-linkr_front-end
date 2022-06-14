import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../Context/Auth";
import styled from "styled-components";
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
    <Main>
      <section>
        <h1>linkr</h1>
        <h2>save, share and discover the best links on the web</h2>
      </section>

      <form onSubmit={login}>
        <input
          type="email"
          name="email"
          id="email  "
          placeholder="e-mail"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <button disabled={disabled} type="submit">
          {disabled ? (
            <ThreeDots color="#FFF" height={13} width={50} />
          ) : (
            "Log In"
          )}
        </button>
        <Link to={"/signup"}>
          <p>First time? Create an account!</p>
        </Link>
      </form>
    </Main>
  );
}

const Main = styled.main`
  display: flex;
  section {
    background-color: #151515;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 62vw;
    height: 100vh;
    padding-left: 144px;
    h1 {
      font-family: "Passion One", cursive;
      font-size: 106px;
      color: #ffffff;
    }
    h2 {
      font-family: "Oswald", sans-serif;
      font-size: 43px;
      color: #ffffff;
    }
  }
  form {
    right: 0;
    top: 0;
    width: 38vw;
    height: 100vh;
    background-color: #333333;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 4px 0px 4px rgba(255, 0, 0, 0.8);
    input {
        width: 80%;
      max-width: 450px;
      height: 65px;
      margin-bottom: 13px;
      border-radius: 6px;
      border: none;
      outline-style: none;
      padding: 12px 17px;
      font-size: 27px;
      font-family: "Oswald", sans-serif;
      font-weight: 700;
    }
    button {
        width: 80%;
      max-width: 450px;
      height: 65px;
      background-color: #1877f2;
      border-radius: 6px;
      border: none;
      outline-style: none;
      font-family: "Oswald", sans-serif;
      font-weight: 700;
      color: #FFFFFF;
      font-size: 27px;
      margin-bottom: 22px;
    }
    p{
        font-family: 'Lato', sans-serif;
        font-weight: 400;
        font-size: 20px;
        line-height: 24px;
        color: #FFFFFF;
        text-decoration: underline;
    }
  }
`;
