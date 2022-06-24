import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function UserInSearch(props) {
  const { image, name, id } = props.infos;
  const { following } = props;
  const [test, setTest] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  function handleClick() {
    navigate(`/user/${id}`);
    window.location.reload();
  }

  useEffect(() => {
    const follow = following.filter((element) => element.followedId === id);
    const res = follow.find(
      (element) =>
        element.followedId === id && element.followerId === user.userId
    );

    if (res) {
      setTest(true);
    }
  }, []);

  return (
    <UserInSearchContainer onClick={() => handleClick()}>
      <img src={image} alt="" />
      <p className="name">{name}</p>
      {test ? <p style={{color: '#c5c5c5', marginLeft: '10px'}}>• following</p> : <></>}
    </UserInSearchContainer>
  );
}

const UserInSearchContainer = styled.div`
  display: flex;
  width: 100%;
  height: 65px;
  background: #e7e7e7;
  color: white;
  margin-top: -7px;
  padding-top: 7px;
  padding-left: 15px;
  align-items: center;
  cursor: pointer;

  p {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    color: #515151;
    margin-left: 12px;
  }

  img {
    width: 39px;
    height: 39px;

    border-radius: 304px;
  }
`;
