import { useEffect, useContext } from 'react'
import styled from 'styled-components'
import { AuthContext } from "../../Context/Auth"
import { useNavigate } from "react-router-dom";

export default function HashtagsTrending() {
        const { getTrending, hashtags } = useContext(AuthContext)

        const navigate = useNavigate()

        useEffect(() => {
                getTrending()
        },[])

        if(hashtags){
                return (
                <SideBar>
                        <Left>
                                <Bar>
                                        <Trending>
                                                <h1>trending</h1>
                                                <List>
                                                        {hashtags.map((hashtag) => {
                                                        return (
                                                                <p onClick = {() => {
                                                                        navigate(`/hashtag/${hashtag.name}`)
                                                                        console.log(hashtag.name)
                                                                }}># {hashtag.name}</p>
                                                        )
                                                        })}
                                                </List>
                                        </Trending>
                                </Bar>
                        </Left>
                </SideBar>
        )} else {
                return (
                        <></>
                )
        }
}

const SideBar = styled.div`
        width: 38%;
        height: 350px;
        height: 430px;
        margin-top: 180px;
        z-index: 1;
        right: 0;
        position: fixed;
`

const Left = styled.div`
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: flex-start;  
`

const Bar = styled.div`
        width: 80%;
        height: 100%;
`

const Trending = styled.div`
        width: 100%;
        height: 100%;
        background-color:#171717;
        border-radius: 16px;
        color: white;
        margin-right: 25px;

        h1 {
                padding: 10px;;
                width: 100%;
                font-family: Oswald;
                font-size: 27px;
                font-weight: 700;
                line-height: 40px;
                text-align: left;
                border-bottom: 1px solid #4D4D4D;
        }
`

const List = styled.div`
        width: 100%;
        height: auto;
        padding: 10px;
        font-size: 19px;
        font-weight: 700;
        line-height: 23px;
        letter-spacing: 0.05em;
        text-align: left;

        p {
                cursor: pointer;
        }
`