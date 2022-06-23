import axios from "axios"
import {useContext, useState, useEffect, useRef, useLayoutEffect } from "react";
import styled from "styled-components";
import {AuthContext } from "../../Context/Auth.js"

export default function PostForm(props) {
  const {user,token, setAllPosts} = props;
  const [link, setLink] = useState("");
  const [message, setMessage] = useState("");
  const { URL, trendingUpdate, setTrendingUpdate } = useContext(AuthContext);
  const [loading, setLoading ] = useState(false)

  const inputRef = useRef()

  function handleSubmit(e){
    e.preventDefault()
    const data = {
      link,
      message: message || ""
    }
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
      };
    const promise = axios.post(`${URL}/publish/post`, data,config);
    setLoading(true)
    promise.then(response => {
      const getPromise = axios.get(`${URL}/get/posts`,config)
      .then(response => {
        setAllPosts(response.data)
        setLoading(false);
        setLink("");
        setMessage("")
        setTrendingUpdate(!trendingUpdate)
      })
      .catch(error => {
        setLoading(false);
        alert("Something went wrong with your post! Try again");
      })
    })
    promise.catch(error => {
      setLoading(false);
      alert("Something went wrong with your post! Try again")
    })
  }

  return (
    <PostFormContainer>
      <img src={user.image} alt="" />
      <Form onSubmit={(e) => handleSubmit(e)}>
        <span>What are you going to share today?</span>
        <input
          ref={inputRef}
          type="text"
          placeholder="http://"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          disabled={loading ? true : false}
          maxLength="100"
        />
        <input
          className="article"
          type="text"
          placeholder="Awesome article about #javascript"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={loading ? true : false}
          maxLength="100"
        />
        {loading ? (
          <button disabled>Publishing</button>
        ) : (
          <button>Publish</button>
        )}
      </Form>
    </PostFormContainer>
  );
}

const PostFormContainer = styled.div`
  display: flex;
  width: 68%;
  height: 209px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  margin-top: 80px;
  @media (max-width: 500px) {
    justify-content: center;
  }
  img {
    width: 50px;
    height: 50px;
    margin: 10px;
    border-radius: 26.5px;
    @media (max-width: 500px) {
    display: none;
  }
  }
  @media (max-width: 900px) {
    width: 100vw;
    border-radius: 0;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 85%;
  height: calc(100% - 20px);
  margin: 10px 10px 10px 0px;
  position: relative;
  @media (max-width: 500px) {
   width: 92vw;
  }
  span {
    font-family: "Lato";
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;
    color: #707070;
    margin-bottom: 8px;
    @media (max-width: 500px) {
    text-align: center;
    font-size: 17px;
  }
  }

  input {
    width: 100%;
    background: #efefef;
    border: none;
    border-radius: 5px;
    font-family: "Lato";
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;
    color: #707070;
    margin-top: 5px;
    text-indent: 10px;
    margin-bottom: 4px;
    @media (max-width: 500px) {
    
  }
  }

  .article {
    height: 66px;
  }
  
  button {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 22%;
    height: 31px;
    background: #1877f2;
    border-radius: 5px;
    border: none;
    margin-top: 15px;
    font-family: "Lato";
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #ffffff;
  }
`;
