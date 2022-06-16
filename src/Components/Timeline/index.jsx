import { useContext, useEffect, useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Post from "./post.jsx"
import Header from '../PublicComponents/Header.js'
import PostForm from './PostForm.jsx';

export default function Timeline(){
        const [allPosts, setAllPosts] = useState([]);
        const [user, setUser] = useState([])
        useEffect(() => {

                const user = JSON.parse(localStorage.getItem("user"))
                setUser(user)

                const URL = 'http://localhost:5000/get/posts';
                const promise = axios.get(URL);

                promise.then((response) => {
                        setAllPosts(response.data)
                });
                promise.catch(error => {
                        console.log(error);
                        alert("Deu algum erro...");
                });
        }, []);
        const userStorage = JSON.parse(localStorage.getItem("user"))
        const token = userStorage.token
        return (
          <>
            <Header />
            <PageContainer>
              {/* {user ? } */}
              <FeedContainer>
                <h2>Timeline</h2>
                <PostForm user={user} token={token} setAllPosts={setAllPosts} />
                {allPosts.map((post) => (
                  <Post info={post} key={post.postid} />
                ))}
              </FeedContainer>
            </PageContainer>
          </>
        );
}

const PageContainer = styled.div`
        width: 100vw;
        height: 100%;
        background-color: #333333;

        display: flex;
        flex-direction: column;
        align-items:center;

        
`; 
const FeedContainer = styled.div`
        width: 615px;
        margin-top: 100px;
        h2{

                font-family: 'Oswald';
                font-style: normal;
                font-weight: 700;
                font-size: 43px;
                line-height: 64px;
                color: #FFFFFF;
        }

`