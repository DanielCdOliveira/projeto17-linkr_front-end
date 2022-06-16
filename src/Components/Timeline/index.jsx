import { useContext, useEffect, useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Post from "./post.jsx"
import { AuthContext } from "../../Context/Auth";
import Header from '../PublicComponents/Header.js'

export default function Timeline(){
        const [allPosts, setAllPosts] = useState([]);
        const { URL } = useContext(AuthContext);

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
        }, []);


        return (
                <>
                        <Header />
                        <PageContainer>
                                <Center>
                                        <FeedContainer> 
                                                <h2>Timeline</h2>
                                                {allPosts.map(post => <Post  info={post} key={post.id}/>)}
                                        </FeedContainer>
                                        <SideBar>
                                                oe
                                        </SideBar>
                                </Center>
                        </PageContainer>
                </>
        )
}

const PageContainer = styled.div`
        width: 100vw;
        height: 100vh;
        background-color: #333333;
        display: flex;
        justify-content:center;
`; 

const Center = styled.div`
        width: 50%;
        height: auto;
        display: flex;
        background-color: blue;
        justify-content: space-between;

`
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
const SideBar = styled.div`
        width: 20%;
        height: 300px;
        margin-top: 180px;
        background-color: orange;
`