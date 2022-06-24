import styled from "styled-components";
import { useState } from "react";
import Loading from "../PublicComponents/Loading.js";
import axios from "axios";
export default function FollowButton(props) {
  const { following, setFollowing, URL, user, token } = props;
  const [loading, setLoading] = useState(false)
  function unfollow() {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const promise = axios.delete(`${URL}/unfollow/${user.id}`, config);
    setLoading(true);
    promise.then((r) => {
      setLoading(false);
      setFollowing(0);
    });
    promise.catch((err) => {
      setLoading(false);
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
    setLoading(true)
    promise.then((r) => {
      setLoading(false);
      setFollowing(1);
    });
    promise.catch((err) => {
      setLoading(false);
      alert(err);
    });
  }

  return (
    <>
      {following === "loading" ? (
        <Loading />
      ) : following ? (
        <UnfollowButtonContainer>
        <button onClick={() => unfollow()} disabled={loading ? true : false}>
          {loading ? <Loading /> : <p>Unfollow</p>}
        </button>
        </UnfollowButtonContainer>
      ) : (
        <FollowButtonContainer>
        <button onClick={() => follow()} disabled={loading ? true : false}>
          {loading ? <Loading /> : <p>Follow</p>}
        </button>
        </FollowButtonContainer>
      )}
    </>
  );
}

const FollowButtonContainer = styled.div`
  background: #1877F2;
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

  button {
    cursor: pointer;
    background: #1877F2;
    color: white;
    border-radius: 5px;
    border: none;
    max-height: 31px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
  }
`;

const UnfollowButtonContainer = styled.div`
  background-color: white;
  position: absolute;
  width: 112px;
  height: 31px;
  left: 82%;
  top: 141px;

  background: white;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  button {
    cursor: pointer;
    background: white;
    color: #1877F2;
    border-radius: 5px;
    border: none;
    max-height: 31px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
  }
`;