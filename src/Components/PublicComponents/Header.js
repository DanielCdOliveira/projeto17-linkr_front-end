import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate()

    function logout(){
        localStorage.removeItem("user")
        navigate("/")
    }



  return (
    <MainHeader showLogout={showLogout}>
      <h1>linkr</h1>
      <nav className="profile">
        <IoIosArrowDown onClick={() => setShowLogout(!showLogout)} />
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
  h1 {
    font-family: "Passion One", cursive;
    font-weight: 700;
    font-size: 49px;
    color: #ffffff;
  }
  .profile {
    display: flex;
    align-items: center;
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
    p{
        font-family: 'Lato', sans-serif;
        font-weight: 700;
        font-size: 17px;
        color: #ffffff;
    }
  }
`;
