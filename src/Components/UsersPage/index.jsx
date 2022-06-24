import { useContext, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Post from "../Posts/post.jsx";
import { AuthContext } from "../../Context/Auth";
import HashtagsTrending from "../SideBar/sideBar.jsx";
import Header from "../PublicComponents/Header.js";
import Loading from "../PublicComponents/Loading.js";
import { useParams } from "react-router-dom";
import FollowButton from "./FollowButton.jsx"

export default function UsersPage() {
  const [selected, setSelected] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userPage, setUserPage] = useState({});
  const [following, setFollowing] = useState("loading");

  const { URL } = useContext(AuthContext);
  const {id} = useParams();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
    const token = user.token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const promise = axios.get(`${URL}/get/posts?userId=${id}`, config);

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

    const promiseUser = axios.get(`${URL}/users?followedId=${id}`, config);

    promiseUser.then((res) => {
      setFollowing(res.data.following)
      setUserPage(res.data.user[0]);
    });

    promiseUser.catch((err) => {
        alert("Erro ao buscar dados do usuário selecionado");
    })
  }, []);
const token = user.token;
  return (
    <>
      <Header />
      <PageContainer>
        <Center>
          <FeedContainer>
            <UserInfo>
              <img src={userPage.image} />
              <h2>{userPage.name}</h2>
            </UserInfo>
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
          {userPage.id === user.userId ? <></> : <FollowButton following={following} setFollowing={setFollowing} URL={URL} user={userPage} token={token} />}
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
  margin-top: 130px;
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
  @media (max-width: 650px) {
  margin-top: 150px;
  } 
`;


const UserInfo = styled.section`
    width:auto;
    height: 60px;
  display: flex; 
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  img{
    width: 53px;
    height: 53px;
    border-radius: 50%;
  }

  h2{
    margin: 80px;
  }
`
