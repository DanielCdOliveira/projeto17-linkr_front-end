import { useState } from "react"
import styled from "styled-components"
export default function PostForm(props){
        const {image} = props
        const [url, setUrl] = useState("")
        const [article, setArticle] = useState("")

        return (
                <PostFormContainer>
                        <img src={image} alt="" />
                        <Form>
                                <span>What are you going to share today?</span>
                                <input type="text" placeholder="http://" value={url}/>
                                <input className="" type="text" placeholder="Awesome article about #javascript" value={article}/>
                                <button>Publish</button>
                        </Form>

                </PostFormContainer>
        )
}

const PostFormContainer = styled.div`
        display: flex;
        width: 611px;
        height: 209px;

        background: #FFFFFF;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 16px;
        position: relative;
        img{
                position: absolute;
                width: 50px;
                height: 50px;
                border-radius: 26.5px;
                left: 15px;
                top: 15px;
        }
`

const Form = styled.form`
        display: flex;
        flex-direction: column;

        position: absolute;
        top: 20px;
        right: 20px;
        height: calc(100% - 20px);
        input{
                width: 500px;
                background: #EFEFEF;
                border: none;
                border-radius: 5px;

                font-family: 'Lato';
                font-style: normal;
                font-weight: 300;
                font-size: 20px;
                line-height: 24px;

                color: #707070;

        }
        button{
                position: absolute;
                width: 112px;
                height: 31px;
                bottom: 15px;
                right: 22px;
                background: #1877F2;
                border-radius: 5px;
        }

`