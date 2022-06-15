import { useContext, useEffect, useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Post from "./post.jsx"
export default function Feed(){
        const [allPosts, setAllPosts] = useState([]);

        useEffect(() => {
                const URL = 'http://localhost:4000/get/posts';
                const promise = axios.get(URL);

                promise.then((response) => {
                        setAllPosts(response.data)
                });
                promise.catch(error => {
                        console.log(error);
                        alert("Deu algum erro...");
                });
        }, []);


        return (
                <PageContainer>
                        <FeedContainer> 
                                <h2>Timeline</h2>
                                {allPosts.map(post => <Post  info={post} key={post.id}/>)}
                        </FeedContainer>
                </PageContainer>
        )
}

const PageContainer = styled.div`
        width: 100vw;
        height: 100vh;
        background-color: #333333;

        display: flex;
        justify-content:center;

        
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