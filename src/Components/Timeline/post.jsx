import styled from 'styled-components';
import { TiPencil, TiHeartOutline, TiTrash } from "react-icons/ti";
import { useRef, useState, useEffect } from 'react';

export default function Post(props){
    const { info } = props;

    const [edit, setEdit] = useState(false);
    const [message, setMessage] = useState(info.message)
    const [oldMessage, setOldMessage] = useState()
    const nameRef = useRef(null);

    function focus() {
      setOldMessage(message)
      nameRef.current.focus();
      setMessage(message)
    }

    function submit(e){
      if (e.keyCode === 13) {
        e.preventDefault();  
      } else if (e.keyCode === 27){
        setMessage(oldMessage)
        setEdit(false);
      }
    }


    return (
      <PostContainer>

        <PerfilLikeContainer>
          <img src="https://img.freepik.com/vetores-gratis/fundo-de-modelo-simples-de-moldura-redonda_1159-26474.jpg"></img>
          <div>
            <TiHeartOutline fontSize="30px"/>
          </div>
        </PerfilLikeContainer>

        <UserContainer>
          <p>Juvenal Juvêncio</p>
          { 
          edit ?
          <input 
          name="message" 
          ref={nameRef}
          type="text" 
          value={message} 
          onKeyDown={submit}
          onChange={e => setMessage(e.target.value)}
          /> 
          :
          <p>{message}</p>
          }
        </UserContainer>
        
        <LinkContainer href={info.url} target="_blank">
            <div href={info.url} target="_blank">
              <p>{info.title}</p>
              <p>{info.description}</p>
              <p>{info.url}</p>
            </div>
            <img src={info.image}></img>
        </LinkContainer>

        <EditDeleteContainer>
          <TiPencil color='white' fontSize="20px" onClick={() => {
            setEdit(!edit);
            setTimeout(focus, 100); 
          }}/>
          <TiTrash color='white' fontSize="20px" />
        </EditDeleteContainer>
        
      </PostContainer>
    );
}

const PostContainer = styled.div`
  background-color: #171717;
  margin-top: 15px;
  border-radius: 15px;
  width: 611px;
  height: 276px;

  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  
`;

const PerfilLikeContainer = styled.div`
    position: absolute;
    top: 18px;
    left: 18px;



    img{
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
`;

const LinkContainer = styled.a`
      width: 503px;
      height: 155px;
      position: absolute;
      right: 20px;
      bottom: 20px;
      border: 1px solid #4D4D4D;
      border-radius: 11px;
      display: flex;
      text-decoration: none;
    div {
      display: flex;
      width: 345px;
      height: 155px;
      flex-direction: column;
      justify-content: space-around;
      border-radius: 11px;
      text-decoration: none;
      font-family: 'Lato';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;

      color: #CECECE;
      overflow-x: hidden;
    }

    img{

      width: 153.44px;
      height: 155px;
    }
`;

const EditDeleteContainer = styled.div`
  position: absolute;
  top: 22px;
  right: 22px;
  
  width: 50px;
  display: flex;
  justify-content: space-around;
  
`;

const UserContainer = styled.div`
  color: white;
  .message{
    color: white;
  }
`