import styled from 'styled-components';
import axios from 'axios';
import Modal from "react-modal";
import { TiPencil, TiHeartOutline, TiTrash } from "react-icons/ti";
import { useRef, useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from "../../Context/Auth";

Modal.setAppElement(".root");

export default function Post(props){
    const { info, setAllPosts } = props;
    const { URL, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const { id } = useParams();

    const tokenStorage = JSON.parse(localStorage.getItem('token'));

    const [edit, setEdit] = useState(false);
    const [message, setMessage] = useState(info.message)
    const [oldMessage, setOldMessage] = useState()
    const [isOpen, setIsOpen] = useState(false);
    const nameRef = useRef(null);

    function focus() {
      setOldMessage(message)
      nameRef.current.focus();
      setMessage(message)
    }

    function submit(e){
      if (e.keyCode === 13) {
        updateMessage();   
      } else if (e.keyCode === 27){
        setMessage(oldMessage)
        setEdit(false);
      }
    }

    function updateMessage(){
      const config = {
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
      };

      const obj = { postId: info.postid, message: message}
      const promise = axios.post(`${URL}/edit/post`, obj , config);
  
      promise.then((response) => {
        setMessage(response.data);
        setEdit(false);
      });
      promise.catch(error => {
          console.log(error);
          alert("Deu algum erro, não foi possivel salvar as alterações...");
          setEdit(true);
      });
      }

    function deletePost(){ 
      const id = info.postid

      const config = {
        headers: {
            Authorization: `Bearer ${user.token}`,
        }
      };


      const promise = axios.delete(`${URL}/delete/post/${id}`, config);
  
      promise.then((response) => {
        toggleModal();
        const promise2 = axios.get(`${URL}/get/posts`);
        promise2.then((response) => {
          setAllPosts(response.data)
        })
        promise2.catch(error => {
          console.log(error);
          alert("Deu algum erro, não foi possivel deletar o post...");
        })
      });
      promise.catch(error => {
          console.log(error);
          alert("Deu algum erro, não foi possivel deletar o post...");
          toggleModal(); 
      });
    }
   
    function toggleModal() {
      setIsOpen(!isOpen);
    }

    const customStyles = {
      overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.75)'
      },
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '597px',
        height: '262px',
        background: '#333333',
        borderRadius: '50px',
        color: 'white',
        outline: 'none',
        fontSize: '34px',
        paddingLeft: '130px',
        paddingRight: '130px',
      }
    };

    return (
      <PostContainer>

        <PerfilLikeContainer>
          <img src="https://img.freepik.com/vetores-gratis/fundo-de-modelo-simples-de-moldura-redonda_1159-26474.jpg"></img>
          <div>
            <TiHeartOutline color="white" fontSize="30px"/>
          </div>
        </PerfilLikeContainer>
      
        <Right>

          <UserContainer>

            <MessageUser>
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
            </MessageUser>

            <EditDeleteContainer>
              <TiPencil color='white' fontSize="25px" onClick={() => { 
            if(edit === false){
            setEdit(!edit);
            setTimeout(focus, 100);
          } else {
            setEdit(false);
            setMessage(oldMessage)
          }
          }}/>
              <TiTrash color='white' fontSize="25px" onClick={toggleModal}/>
            </EditDeleteContainer>

          </UserContainer>
          
          <LinkContainer href={info.url} target="_blank">
              <div href={info.url} target="_blank">
                <p>{info.title}</p>
                <p>{info.description}</p>
                <p>{info.url}</p>
              </div>
              <img src={info.image}></img>
          </LinkContainer>

        </Right>

        <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        style={customStyles}>
        <div>Are you sure you want to delete this post?</div>
        <button onClick={toggleModal}>No, go back</button>
        <button onClick={deletePost}>Yes, delete it</button>
        </Modal>

      </PostContainer>
    );
}

const PostContainer = styled.div`
  background-color: #171717;
  margin-top: 15px;
  border-radius: 15px;
  width: 100%;
  height: 276px;
  display: flex;
  box-sizing: border-box;
`;

const Right = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const PerfilLikeContainer = styled.div`
    padding: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;

    img{
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-bottom: 10px;
    }
`;

const LinkContainer = styled.a`
      height: auto;
      bottom: 20px;
      margin-bottom: 20px;
      border: 1px solid #4D4D4D;
      border-radius: 11px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-decoration: none;

    div {
      display: flex;
      width: 80%;
      margin: 10px;
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
      border-radius: 0px 11px 11px 0px; 
      width: 35%;
      height: 175px;
    }
`;

const EditDeleteContainer = styled.div`
  padding-top: 10px;
  display: flex;
  width: 11%;
  justify-content: space-between;
`;

const UserContainer = styled.div`
  display: flex;
  justify-content: space-between;
  color: white;

    .message{
      color: white;
    }

`

const MessageUser = styled.div`
  width: 80%;
  height: auto;
  padding: 10px 0px 10px 0px;
  line-height: 25px;
`