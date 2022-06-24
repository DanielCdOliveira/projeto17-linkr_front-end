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
      alert("Deu algum erro...");
    });
  }, [hashtag]);

  return (
    <>
      <Header />
      <PageContainer>
        <Center>
          <FeedContainer>
            <div className="name">
              <h2># <span>{hashtag}</span></h2>
            </div>
            <PostsContainer>
              {loading? <Loading /> : allPosts.length !== 0 ? (
                allPosts.map((post) => {
                  let likesFiltered = selected.find(
                    (element) =>
                      element.postId === post.postid && element.userId === user.userId
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
  .name{
    display: flex;
    overflow-x:hidden;  
    width:50vw;
    height: auto;
    min-width: 600px;
    h2{
      display: flex;
    }
  }
`;

const PostsContainer = styled.div`
  width: 68%;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  justify-content: flex-start;
  position: relative;
  margin-top: 80px;
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
  margin-top: 150px;
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
    @media (max-width: 900px) {
    padding-left: 17px;
    height: 65px;
    display: flex;
    overflow-x: hidden;
  } 
  }
`;