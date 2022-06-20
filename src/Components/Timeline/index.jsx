import { useContext, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Post from "../Posts/post";
import { AuthContext } from "../../Context/Auth";
import HashtagsTrending from "../SideBar/sideBar.jsx";
import Header from "../PublicComponents/Header.js";
import PostForm from "./PostForm.jsx";
import Loading from "../PublicComponents/Loading.js";

export default function Timeline() {
  const [selected, setSelected] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const { URL } = useContext(AuthContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
    const promise = axios.get(`${URL}/get/posts`);

    promise.then((response) => {
      setAllPosts(response.data);
      setLoading(false);
    });
    promise.catch((error) => {
      setLoading(false);
      alert(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
    });

    const promiseLikes = axios.get(`${URL}/get/likes`);

    promiseLikes.then((response) => {
      setSelected(response.data);
    });
    promiseLikes.catch((error) => {
      alert("Deu algum erro...");
    });
  }, []);

  const token = user.token;

  return (
    <>
      <Header />
      <PageContainer>
        <Center>
          <FeedContainer>
            <h2>timeline</h2>
            <PostForm user={user} token={token} setAllPosts={setAllPosts} />
            <PostsContainer>
              {loading ? (
                <Loading />
              ) : allPosts.length !== 0 ? (
                allPosts.map((post) => {
                  let likesFiltered = selected.find(
                    (element) =>
                      element.postId === post.postid &&
                      element.userId === user.userId
                  );
                  return (
                    <Post
                      info={post}
                      key={post.postid}
                      setAllPosts={setAllPosts}
                      selected={selected}
                      like={likesFiltered ? true : false}
                    />
                  );
                })
              ) : (
                <span className="noPosts">there are no posts yet</span>
              )}
            </PostsContainer>
          </FeedContainer>
          <HashtagsTrending />
        </Center>
      </PageContainer>
    </>
  );
}

const PageContainer = styled.div`
  min-width: 900px;
  width: 100%;
  display: flex;
  justify-content: center;
  overflow-x: hidden;
  background-color: #333333;
  position: relative;
  min-height: 100vh;
  @media (max-width: 900px) {
    min-width: auto;
  }
`;

const PostsContainer = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  justify-content: flex-start;
  position: relative;
  @media (max-width: 900px) {
    width: 100vw;
    min-width: auto;
  }
`;

const Center = styled.div`
  width: 63%;
  min-width: 900px;
  margin: auto;
  height: auto;
  display: flex;
  justify-content: space-between;
  position: relative;
  @media (max-width: 900px) {
    width: 100vw;
    min-width: auto;
  }
`;

const FeedContainer = styled.div`
  width: 100%;
  margin-top: 100px;
  margin-bottom: 150px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .noPosts {
    margin-top: 100px;
    font-family: "Oswald";
    font-size: 32px;
    color: #ffffff;
  }
  h2 {
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #ffffff;
    position: absolute;
    @media (max-width: 900px) {
    padding-left: 17px;
  } 
  }
`;
