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
    <FollowButtonContainer>
      {following === "loading" ? (
        <Loading />
      ) : following ? (
        <button onClick={() => unfollow()} disabled={loading ? true : false}>
          {loading ? <Loading /> : <p>unfollow</p>}
        </button>
      ) : (
        <button onClick={() => follow()} disabled={loading ? true : false}>
          {loading ? <Loading /> : <p>follow</p>}
        </button>
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
  button {
    cursor: pointer;
    background: #1877f2;
    border-radius: 5px;
    border: none;
    max-height: 31px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
