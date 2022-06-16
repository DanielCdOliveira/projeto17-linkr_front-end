import axios from "axios"
import {useContext, useState, useEffect, useRef, useLayoutEffect } from "react";
import styled from "styled-components";
import {AuthContext } from "../../Context/Auth.js"

export default function PostForm(props) {
  const {user,token, setAllPosts} = props;
  const [link, setLink] = useState("http://");
  const [message, setMessage] = useState([]);
  const { URL } = useContext(AuthContext);
  const [loading, setLoading ] = useState(false)

  const inputRef = useRef()


  function handleSubmit(e){
    e.preventDefault()
    const data = {
      link,
      message
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
        setLink("http://");
        setMessage("")
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
        />
        <input
          className="article"
          type="text"
          placeholder="Awesome article about #javascript"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={loading ? true : false}
        />
        {loading?<button disabled>Publishing</button>: <button>Publish</button>}
      </Form>
    </PostFormContainer>
  );
}

const PostFormContainer = styled.div`
  display: flex;
  width: 611px;
  height: 209px;

  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  position: relative;
  margin-top: 40px;
  img {
    position: absolute;
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    left: 15px;
    top: 15px;
  }
  
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  position: absolute;
  top: 20px;
  right: 20px;
  height: calc(100% - 20px);

  span {
    font-family: "Lato";
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;

    color: #707070;
  }
  input {
    width: 500px;
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
  }
  .article {
    height: 66px;
  }
  button {
    position: absolute;
    width: 112px;
    height: 31px;
    bottom: 15px;
    right: 22px;
    background: #1877f2;
    border-radius: 5px;
    border: none;

    font-family: "Lato";
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #ffffff;
  }
`;
