import styled from "styled-components";
import { useState } from "react";
import Loading from "../PublicComponents/Loading.js";
import axios from "axios";
export default function FollowButton(props) {
  const { following, setFollowing, URL, user, token } = props;

  function unfollow() {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const promise = axios.delete(`${URL}/unfollow/${user.id}`, config);
    promise.then((r) => {
      setFollowing(0);
    });
    promise.catch((err) => {
      alert(err);
    });
  }

  function follow() {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const promise = axios.post(`${URL}/follow/${user.id}`, null, config)
    promise.then((r) => {
      setFollowing(1);
    });
    promise.catch((err) => {
      alert(err);
    });
  }

  return (
    <FollowButtonContainer>
      {following === "loading" ? (
        <Loading />
      ) : following ? (
        <p onClick={() => unfollow()}>unfollow</p>
      ) : (
        <p onClick={() => follow()}>follow</p>
      )}
    </FollowButtonContainer>
  );
}

const FollowButtonContainer = styled.div`
  background-color: white;
  position: absolute;
  width: 112px;
  height: 31px;
  left: 82%;
  top: 141px;

  background: #1877f2;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    cursor: pointer;
  }
`;
