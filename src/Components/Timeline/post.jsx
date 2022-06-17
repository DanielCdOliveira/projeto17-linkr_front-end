import styled from 'styled-components';
import axios from 'axios';
import ReactTooltip from "react-tooltip";
import Modal from "react-modal";
import { TiPencil, TiHeartFullOutline, TiTrash } from "react-icons/ti";
import { useRef, useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from "../../Context/Auth";
import Loading  from "../PublicComponents/Loading"

Modal.setAppElement(".root");

export default function Post(props){

    const { info, setAllPosts, like, selected, likesNames } = props;
    const { URL } = useContext(AuthContext);
    const { id } = useParams();

    const user = JSON.parse(localStorage.getItem('user'));
    const tokenStorage = user.token;

    const [edit, setEdit] = useState(false);
    const [message, setMessage] = useState(info.message)
    const [oldMessage, setOldMessage] = useState()
    const [promiseReturned, setPromiseReturned] = useState(false);
    const [likes, setLikes] = useState(false);
    const [countLikes, setCountLikes] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [result, setResult] = useState('');


    const nameRef = useRef(null);

    useEffect(() => {
      if(like){
        setLikes(true);
      }else{
        setLikes(false);
      }
    }, [like])

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
            Authorization: `Bearer ${tokenStorage}`,
        },
      };

      const obj = { postId: info.postid, message: message}
      const promise = axios.post(`${URL}/edit/post`, obj , config);
      setPromiseReturned(true)
  
      promise.then((response) => {
        setMessage(response.data);
        setEdit(false);
        setPromiseReturned(false);
      });
      promise.catch(error => {
          console.log(error);
          alert("Deu algum erro, não foi possivel salvar as alterações...");
          setEdit(true);
      });
      }

    function postLike(){
      const id = info.postid;
      const config = {
        headers: {
            Authorization: `Bearer ${tokenStorage}`,
        },
      };
      const promise = axios.post(`${URL}/like/post/${id}`, id, config);
  
      promise.then((response) => {
        setLikes(true)
      });
      promise.catch(error => {
          console.log(error);
          alert("Deu algum erro, não foi possivel salvar o like...");
      });
    }

    function deleteLike(){
      const id = info.postid;
      const config = {
        headers: {
            Authorization: `Bearer ${tokenStorage}`,
        },
      };
      const promise = axios.delete(`${URL}/deslike/post/${id}`, config);
  
      promise.then((response) => {
        setLikes(false)
      });
      promise.catch(error => {
          console.log(error);
          alert("Deu algum erro, não foi possivel deletar o like...");
      });
    }

    useEffect(() => {
      const id = info.postid;
      const promise = axios.get(`${URL}/coutlikes/post/${id}`);
      promise.then((response) => {
        setCountLikes(response.data);
      });
      promise.catch((error) => {
        console.log(error);
        alert("Deu algum erro...");
      });
    }, [likes])

    function toggleModal() {
      setIsOpen(!isOpen);
    }

    function deletePost(){ 
      const id = info.postid
  
      const config = {
        headers: {
            Authorization: `Bearer ${tokenStorage}`,
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
  
      const customStyles = {
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(255, 255, 255, 0.9)'
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
            textAlign: 'center',
            color: 'white',
            paddingLeft: '100px',
            paddingRight: '100px',
            fontSize: '34px',
          }
        };

   const names = useEffect(() => {
        let newLikesNames = []
        for(let i=0; i<likesNames.length; i++){
          if(likesNames[i].name !== user.name){
            newLikesNames.push(likesNames[i].name);
          }
        }
        let res = '';
  
        if(likesNames.length === 0){
          res = null;
          setResult(res)
        } else if(likesNames.length === 1 && likes){
          res = "Você curtiu";
          setResult(res)
        } else if(likesNames.length === 1 && !likes){
          res = `Curtido por ${newLikesNames[0]}`
          setResult(res)
        } else if (likesNames.length === 2 && likes){
          res = `Voce e ${newLikesNames[0]} curtiram`
          setResult(res)
        } else if (likesNames.length === 2 && !likes){
          res = `${newLikesNames[0]} e ${newLikesNames[1]} curtiram`
          setResult(res)
        } else if (likesNames.length >= 3 && likes){
          res = `Você, ${newLikesNames[0]} e mais ${countLikes - 2} curtiram`
          setResult(res)
        } else if(likesNames.length >= 3 && !likes){
          res = `${newLikesNames[0]}, ${newLikesNames[1]} e mais ${countLikes - 2} curtiram`
          setResult(res)
        }

    }, [countLikes])

    return (
      promiseReturned === false?
      <PostContainer>

        <PerfilLikeContainer>
          <img src={user.image} alt='perfil'></img>
          
          <div>
            <TiHeartFullOutline style={{color: likes ? "red" : "white"}} fontSize="30px" onClick={() => {
              if(likes === false){
                postLike();
              } else if( likes === true){
                deleteLike();
              }
            }}/>
          </div>
          <ContainerCountLikes data-tip data-for="countLikes">
            <a data-tip={`${result}`}>{countLikes} Likes</a>
            <ReactTooltip place="bottom" type="light" effect="solid"/>
          </ContainerCountLikes>

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
              disabled={promiseReturned? true:false}
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
              <img src={info.image} alt="infoimage"></img>
          </LinkContainer>

        </Right>
        
        <Modal
          isOpen={isOpen}
          onRequestClose={toggleModal}
          style={customStyles}>
          <div style={{marginTop: "40px"}}>Are you sure you want to delete this post?</div>
          <button 
          onClick={toggleModal} 
          style={{
          width: "134px", 
          height: "37px", 
          marginTop: "40px", 
          marginRight: "25px", 
          borderRadius: "5px", 
          background: '#ffffff', 
          color: '#1877F2', 
          textDecoration: 'none',
          fontFamily: 'Lato',
          fontSize: '18px',
          fontWeight: '700'
          }}>No, go back</button>

          <button 
          onClick={deletePost} 
          style={{
          width: "134px", 
          height: "37px", 
          marginTop: "40px", 
          borderRadius: "5px", 
          background: '#1877F2', 
          color: '#ffffff',  
          textDecoration: 'none',
          fontFamily: 'Lato',
          fontSize: '18px',
          fontWeight: '700'
          }}>Yes, delete it</button>
          </Modal>

      </PostContainer>
      :
      <Loading />
    );
}

const PostContainer = styled.div`
  background-color: #171717;
  margin-top: 22px;
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
`;

const ContainerCountLikes = styled.div `
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  text-align: center;
  color: white;
`;