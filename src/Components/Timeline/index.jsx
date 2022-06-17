import { useContext, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Post from "./post.jsx";
import { AuthContext } from "../../Context/Auth";
import Header from "../PublicComponents/Header.js";
import PostForm from './PostForm.jsx';

export default function Timeline() {
  const [selected, setSelected] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [user, setUser] = useState([])
  const { URL } = useContext(AuthContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    setUser(user)
    const promise = axios.get(`${URL}/get/posts`);

    promise.then((response) => {
      console.log(response);
      setAllPosts(response.data);
    });
    promise.catch((error) => {
      console.log(error);
      alert("Deu algum erro...");
    });

    const promiseLikes = axios.get(`${URL}/get/likes`);

    promiseLikes.then((response) => {
      console.log(response);
      setSelected(response.data);
    });
    promiseLikes.catch((error) => {
      console.log(error);
      alert("Deu algum erro...");
    });
  }, []);

  const token = user.token

  return (
    <>
      <Header />
      <PageContainer>
        <Center>
          <FeedContainer>
            <h2>Timeline</h2>
            <PostForm user={user} token={token} setAllPosts={setAllPosts} />
            {allPosts.map((post) => {
              let likesFiltered = selected.find(
                //PRECISARIA DO ID PRA VALIDAR CASOS DE NOMES REPETIDOS
                (element) => element.postId == post.postid && element.name == user.name
              );
              let likesNames = selected.filter(
                (element) => element.postId == post.postid
              );

              return (
                <Post
                  info={post}
                  key={post.postid}
                  likesNames={likesNames}
                  setAllPosts={setAllPosts}
                  selected={selected}
                  like={likesFiltered ? true : false}
                />
              );
            })}
          </FeedContainer>
          <SideBar>oe</SideBar>
        </Center>
      </PageContainer>
    </>
  );
}

const PageContainer = styled.div`
  width: 100vw;
  height: 100%;
  background-color: #333333;
  display: flex;
  justify-content: center;
`;

const Center = styled.div`
  width: 50%;
  height: auto;
  display: flex;
  justify-content: space-between;
`;
const FeedContainer = styled.div`
  width: 615px;
  margin-top: 100px;
  h2 {
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #ffffff;
  }
`;
const SideBar = styled.div`
  width: 20%;
  height: 300px;
  margin-top: 180px;
  background-color: orange;
`;
