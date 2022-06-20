import { useContext, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Post from "../Posts/post.jsx";
import { AuthContext } from "../../Context/Auth";
import HashtagsTrending from "../SideBar/sideBar.jsx";
import Header from "../PublicComponents/Header.js";
import Loading from "../PublicComponents/Loading.js";
import { useParams } from "react-router-dom";


export default function UsersPage() {
  const [selected, setSelected] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userPage, setUserPage] = useState({});
  const { URL } = useContext(AuthContext);
  const {id} = useParams();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
    const promise = axios.get(`${URL}/get/posts/${id}`);

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

    const promiseUser = axios.get(`${URL}/users?id=${id}`)

    promiseUser.then((res) => {
        console.log(res.data[0]);
        setUserPage(res.data[0]);
    });

    promiseUser.catch((err) => {
        console.log(err);
        alert("Erro ao buscar dados do usuário selecionado");
    })
  }, []);

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
              {loading? <Loading /> : allPosts.length !== 0 ? (
                allPosts.map((post) => {
                  let likesFiltered = selected.find(
                    (element) =>
                      element.postId === post.postid && element.userId === user.userId
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
  display: flex;
  justify-content: center;
  overflow-x: hidden;
  background-color: #333333;
`;

const PostsContainer = styled.div`
        width: 70%;
        display: flex;
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
    margin: 10px;
  }
`