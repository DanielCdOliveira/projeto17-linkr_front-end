import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {DebounceInput} from 'react-debounce-input';
import axios from "axios"

export default function Header() {
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
    const URL = "http://localhost:5000";


    if(!input){
      setSearchResult(null);
      setShowResults(false)
      return
    }

    try{
      const result = await axios.get(URL+`/users/${input}`);

      setSearchResult(result.data)
      setShowResults(true)
    }
    catch(err){
    }
  }

  return (
    <MainHeader showLogout={showLogout} image={user.image}>
      <h1>linkr</h1>
      <SearchInput>
        <DebounceInput showResults={showResults} placeholder={"Search for people"} minLength={3} debounceTimeout={300} onChange={event => {search(event.target.value)}} />
        <div>
          {searchResult === null ? <div></div> : searchResult.map(element => {return <Result><img src={element.image}/> <p>{element.name}</p></Result>})}
        </div>
      </SearchInput>
      <h1 onClick={()=>goToTimeline()}>linkr</h1>
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
`;

const SearchInput = styled.div`
width: 40%;
height: 50%;
input{
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
div{
  transition: all 0.5s;
  ${(props) => (props.showResults ? "height:200px;" : "height:0;")}
  background-color: #ffffff;
}
`
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
