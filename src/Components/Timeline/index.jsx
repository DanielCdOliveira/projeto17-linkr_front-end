import { useContext, useEffect, useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Post from "./post.jsx"
import { AuthContext } from "../../Context/Auth";
import Header from '../PublicComponents/Header.js'
import HashtagsTrending from './sideBar.jsx';

export default function Timeline(){
        const [allPosts, setAllPosts] = useState([]);
        const { URL, getTrending, hashtags } = useContext(AuthContext);

        useEffect(() => {
                const promise = axios.get(`${URL}/get/posts`);

                promise.then((response) => {
                        console.log(response)
                        setAllPosts(response.data)
                });
                promise.catch(error => {
                        console.log(error);
                        alert("Deu algum erro...");
                });
                getTrending()
        }, []);

        console.log(hashtags)

        return (
                <>
                        <Header />
                        <PageContainer>
                                <Center>
                                        <FeedContainer> 
                                                <h2>Timeline</h2>
                                                {allPosts.map(post => <Post  info={post} key={post.id}/>)}
                                        </FeedContainer>
                                </Center>
                                <HashtagsTrending hashtags = {hashtags}/>
                        </PageContainer>
                </>
        )
}

const PageContainer = styled.div`
        width: 100vw;
        height: 100%;
        background-color: #333333;
        display: flex;
        justify-content:center;
`; 

const Center = styled.div`
        width: 60%;
        height: auto;
        display: flex;
        justify-content: space-between;

`
const FeedContainer = styled.div`
        width: 70%;
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