import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { AuthContext } from "../../Context/Auth";
import HashtagsTrending from "../SideBar/sideBar.jsx";
import Header from "../PublicComponents/Header.js";
import Loading from "../PublicComponents/Loading.js";
import Post from "../Posts/post.jsx";

export default function HashtagPage() {
  const [selected, setSelected] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const { URL } = useContext(AuthContext);

  const { hashtag } = useParams();

  useEffect(() => {
    const userInfos = JSON.parse(localStorage.getItem("user"));
    setUser(userInfos);
    const promise = axios.get(`${URL}/hashtag/${hashtag}`);

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
      setSelected(response.data);
    });
    promiseLikes.catch((error) => {
      console.log(error);
      alert("Deu algum erro...");
    });
  }, [hashtag]);

  console.log(allPosts)

  return (
    <>
      <Header />
      <PageContainer>
        <Center>
          <FeedContainer>
            <h2># {hashtag}</h2>
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
  display: flex;
  justify-content: center;
  overflow-x: hidden;
  background-color: #333333;
`;

const PostsContainer = styled.div`
        width: 70%;
        display: flex;
        padding-top: 20px;
        flex-direction: column;
        margin-top: 50px;
        justify-content: flex-start;
`;

const Center = styled.div`
  width: 50%;
  height: auto;
  display: flex;
  justify-content: space-between;
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
  }
`;