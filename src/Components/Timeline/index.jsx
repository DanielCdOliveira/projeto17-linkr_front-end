import { useContext, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Post from "./post.jsx";
import { AuthContext } from "../../Context/Auth";
import HashtagsTrending from './sideBar.jsx';
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
      setLoading(false)
    });
    promise.catch((error) => {
      setLoading(false)
      alert(
        "An error occured while trying to fetch the posts, please refresh the page"
        );
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

  const token = user.token;
  console.log(user)

  return (
    <>
      <Header />
      <PageContainer>
        <Center>
          <FeedContainer>
            <h2>Timeline</h2>
            <PostForm user={user} token={token} setAllPosts={setAllPosts} />
            <PostsContainer>
              {loading? <Loading /> : allPosts.length !== 0 ? (
                allPosts.map((post) => {
                  let likesFiltered = selected.find(
                    (element) =>
                      element.postId === post.postid && element.name === user.name
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
  width: 100vw;
  background-color: #333333;
  display: flex;
  justify-content: center;
  overflow-x: hidden;
`;

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
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
  margin-bottom: 150px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
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
    left: 0;
  }
`;
const SideBar = styled.div`
  width: 20%;
  height: 300px;
  margin-top: 180px;
  background-color: orange;
`;
