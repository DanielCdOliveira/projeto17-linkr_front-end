import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {DebounceInput} from 'react-debounce-input';
import axios from "axios"

export default function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [showLogout, setShowLogout] = useState(false);
  const [searchResult, setSearchResult] = useState(null)
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("user");
    navigate("/");
  }

  async function search(input){
    const URL = "http://localhost:5000";

    console.log(input)

    if(!input){
      setSearchResult(null);
      return
    }

    try{
      const result = await axios.get(URL+`/users/${input}`);

      setSearchResult(result.data)
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <MainHeader showLogout={showLogout} image={user.image}>
      <h1>linkr</h1>
      <DebounceInput placeholder={"Search for people"} minLength={3} debounceTimeout={300} onChange={event => {search(event.target.value)}} />
      <nav className="profile" onClick={() => setShowLogout(!showLogout)}>
        <IoIosArrowDown />
        <img src={user.image} alt="profile picture" />
      </nav>
      <div className="logout" onClick={logout}>
        <p>Logout</p>
      </div>
    </MainHeader>
  );
}

const MainHeader = styled.header`
  background-color: #151515;
  width: 100vw;
  height: 72px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 17px 0 28px;
  box-sizing: border-box;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  h1 {
    font-family: "Passion One", cursive;
    font-weight: 700;
    font-size: 49px;
    color: #ffffff;
  }
  input{
    width: 40%;
    height: 50%;
    border-radius: 10px;
  }
  .profile {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  svg {
    font-size: 40px;
    color: #ffffff;
    margin-right: 15px;
    transition: all 0.5s;
    ${(props) => (props.showLogout ? "transform: rotateX(-180deg);" : "")}
  }
  img {
    width: 53px;
    height: 53px;
    border-radius: 50%;
  }
  .logout {
    width: 147px;
    background-color: #171717;
    border-radius: 0 0 0 20px;
    position: absolute;
    right: 0;
    top: 72px;
    overflow-y: hidden;
    ${(props) => (props.showLogout ? "height:47px;" : "height:0;")}
    transition: all 0.5s;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
    p {
      font-family: "Lato", sans-serif;
      font-weight: 700;
      font-size: 17px;
      color: #ffffff;
    }
  }
`;
