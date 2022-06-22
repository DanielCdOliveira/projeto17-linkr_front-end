import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {DebounceInput} from 'react-debounce-input';
import { AuthContext } from "../../Context/Auth";
import UserInSearch from "./UserInSearch";
import axios from "axios"

export default function Header() {
  const { URL } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const [showLogout, setShowLogout] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("user");
    navigate("/");
  }
  function goToTimeline(){
    navigate("/timeline");
  }

  async function search(input){
    if(!input){
      setSearchResult(null);
      setShowResults(false)
      return
    }
    const token = user.token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try{
      const result = await axios.get(URL+`/users?name=${input}`, config);
      setSearchResult(result.data.user)
      setShowResults(true)
    }
    catch(err){
    }
  }

  return (
    <MainHeader showLogout={showLogout} image={user.image} searchResult={searchResult}>
      <h1 onClick={() => goToTimeline()}>linkr</h1>
      <SearchInput>
        <DebounceInput
          showResults={showResults}
          placeholder={"Search for people"}
          minLength={3}
          debounceTimeout={300}
          onChange={(event) => {
            search(event.target.value);
          }}
        />
        <div className="result">
          {searchResult === null ? (
            <div></div>
          ) : (
            searchResult.map((user) => <UserInSearch infos={user}/>)
          )}
        </div>
        <FiSearch/>
      </SearchInput>
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
    cursor: pointer;
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
  .result{
    width: calc(40% - 18px);
    border-radius: 8px;
    height: fit-content;
    background-color: #E6E6E6;
    ${(props) => (props.searchResult === null ? "display: none;" : "")}
    border-radius: 8px;
    position: absolute;
    top: 40px;
    z-index: -1;
    padding-top: 23px;
    padding-bottom: 10px;
  }
`;

const SearchInput = styled.div`
  width: 40%;
  height: 50%;
  position: relative;
  input {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    padding-left: 10px;
    border: none;
    font-family: 'Lato', sans-serif;
    z-index: 5;
  }
  input:focus{
    box-shadow: 0 0 0 0;
    border: 0 none;
    outline: 0;
  }
  input::placeholder{
    color: #c6c6c6;
  }
  svg{
    color: #C6C6C6;
    position: absolute;
    right: -5px;
    top: 8px;
    font-size: 21px;
  }
  @media (max-width: 500px) {
   position: fixed;
   width: 100%;
   height: 70px;
   left: 0px;
   top:70px;
   background-color: #333333;
   padding-top: 10px;
   box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
   input{
  width: 90%;
  margin-left: 5%;
  height: 45px;
   }
  }
`;
const Result = styled.section`
width:100%;
height: 30%;
display: flex;
align-items:center;
justify-content: flex-start;
padding: 5%;

p{
  margin: 0 10px;
}
`
