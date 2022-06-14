import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";

import { AuthContext } from "../../Context/Auth";

function Register() {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    image: "",
  });
  const { URL } = useContext(AuthContext);
  const [disabled, setDisbled] = useState(false);
  const navigate = useNavigate();

  function newRegister(e) {
    setDisbled(true);
    e.preventDefault();
    if(data.email === "" ||data.password === "" ||data.name === "" ||data.image === ""){
      alert("Favor preencher todos os campos!")
      setDisbled(false);
      return;
    }
    const promise = axios.post(URL + "/signup", data);
    promise.then((e) => {
      navigate("/");
    });
    promise.catch((e) => {
      setDisbled(false);
      if (e.response.status === 409) {
        alert("Email já cadastrado!");
      }
      console.log(e);
    });
  }

  return (
    <Main>
      <section>
        <h1>linkr</h1>
        <h2>save, share and discover the best links on the web</h2>
      </section>

      <form onSubmit={newRegister}>
          <input
            disabled={disabled}
            type="email"
            name=""
            id="email-signup"
            placeholder="e-mail"
            onChange={(e) => setData({ ...data, email: e.target.value })}
            
          />
          <input
            disabled={disabled}
            type="password"
            name=""
            id="password-signup"
            placeholder="password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
            
          />
        <input
          disabled={disabled}
          type="text"
          name=""
          id="name-signup"
          placeholder="username"
          onChange={(e) => setData({ ...data, name: e.target.value })}
          
        />
        <input
          disabled={disabled}
          type="url"
          name=""
          id="image"
          placeholder="picture url"
          onChange={(e) => setData({ ...data, image: e.target.value })}
          
        />
        <button disabled={disabled} type="submit">
          {disabled ? (
            <ThreeDots color="#FFF" height={30} width={100} />
          ) : (
            "Sign Up"
          )}
        </button>
        <Link to={"/"}>
          <p>Switch back to log in</p>
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
    box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
    z-index: 2;
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
      color: #ffffff;
      font-size: 27px;
      margin-bottom: 22px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    p {
      font-family: "Lato", sans-serif;
      font-weight: 400;
      font-size: 20px;
      line-height: 24px;
      color: #ffffff;
      text-decoration: underline;
    }
  }
`;
export default Register;
