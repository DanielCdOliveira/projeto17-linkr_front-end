import { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Post from "../Posts/post";
import { AuthContext } from "../../Context/Auth";
import HashtagsTrending from "../SideBar/sideBar.jsx";
import Header from "../PublicComponents/Header.js";
import PostForm from "./PostForm.jsx";
import Loading from "../PublicComponents/Loading.js";
import InfiniteScroll from "react-infinite-scroller";
import useInterval from "use-interval";
import {TiBell} from "react-icons/ti"

export default function Timeline() {
  const [selected, setSelected] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [newPosts, setNewPosts] = useState(0);

  useInterval(() => {
    hasMorePosts()
  }, 15000); 
  
  const { URL } = useContext(AuthContext);

  const getPosts = useCallback(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const promise = axios.get(`${URL}/get/posts`, config);
    promise.then((response) => {
      response.data ? setAllPosts(response.data) : setFollowing(false);
      setLoading(false);
      hasMorePage(user.token);
    });
    promise.catch((error) => {
      setLoading(false);
      alert(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
    });
  }, [URL]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  useEffect(() => {
    const promiseLikes = axios.get(`${URL}/get/likes`);

    promiseLikes.then((response) => {
      setSelected(response.data);
    });
    promiseLikes.catch((error) => {
      alert("Deu algum erro...");
    });
  }, []);

  const token = user.token;

  function loadPosts() {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const promise = axios.get(
      `${URL}/get/posts?offset=${currentPage * 10}`,
      config
    );
    promise.then((response) => {
      response.data
        ? setAllPosts([...allPosts, ...response.data])
        : setFollowing(false);
      setLoading(false);
      hasMorePage(user.token);
      setCurrentPage(currentPage + 1);
    });
    promise.catch((error) => {
      setLoading(false);
      alert(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
    });
  }
  function hasMorePosts() {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const lastPost = allPosts[0].postid;
    const promise = axios.get(`${URL}/check/posts/${lastPost}`, config);
    promise.then(r =>{
      setNewPosts(r.data)
      setNewPosts(0)
    })
  }

  function hasMorePage(token){
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const promise = axios.get(
      `${URL}/check/pages?offset=${(currentPage + 1) * 10}`,
      config
    );

    promise.then((response) => {
      setHasMore(response.data);
    });
    promise.catch((err) => {
      alert(err);
    });

  }

  return (
    <>
      <Header />
      <PageContainer>
        {newPosts ? (
          <PostAlert data-tip data-for="postAlert" onClick={() => getPosts()}>
            <a data-tip={newPosts}>
              <TiBell size="50px" color="white" />
            </a>
          </PostAlert>
        ) : (
          <></>
        )}
        <Center>
          <FeedContainer>
            <h2>timeline</h2>
            <PostForm user={user} token={token} setAllPosts={setAllPosts} />
            <PostsContainer>
              <InfiniteScroll
                pageStart={0}
                loadMore={() => loadPosts()}
                hasMore={hasMore}
                loader={<Loading />}
              >
                {allPosts.length !== 0 ? (
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
                ) : following ? (
                  <WarningSpan className="noPosts">
                    No posts found from your friends
                  </WarningSpan>
                ) : (
                  <WarningSpan>
                    "You don't follow anyone yet. Search for new friends!"
                  </WarningSpan>
                )}
              </InfiniteScroll>
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
  .postAlert {
    position: absolute;
    left: 50px;
    top: 100px;
  }
`;

const PostsContainer = styled.div`
  width: 68%;
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
    position: absolute;
    @media (max-width: 900px) {
    padding-left: 17px;
  } 
  }
`;

const WarningSpan = styled.span`
  font-family: "Oswald";
  font-style: normal;
  font-weight: 700;
  font-size: 30.9px;
  line-height: 64px;
  color: #ffffff;
  position: absolute;
`;

const PostAlert = styled.div`
  position: fixed;
  left: 50px;
  top: 100px;
  cursor: pointer;
`