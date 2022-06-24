import styled from "styled-components";
import axios from "axios";
import ReactTooltip from "react-tooltip";
import Modal from "react-modal";
import { TiPencil, TiHeartFullOutline, TiTrash } from "react-icons/ti";
import { FiSend } from "react-icons/fi";
import { AiOutlineComment } from "react-icons/ai";
import { useRef, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../Context/Auth";
import Loading from "../PublicComponents/Loading";
import ReactHashtag from "@mdnm/react-hashtag";
import {BiRepost} from "react-icons/bi"
import {
  postLike,
  updateMessage,
  deleteLike,
  toggleModalDelete,
  toggleModalRepost,
  deletePost,
  postShare,
} from "./postRepository";

import { postComments, getComments } from "./commentsRepository";
import { MappingComments } from "./comments.jsx";
import Repost from "./Repost.jsx"
Modal.setAppElement(".root");

export default function Post(props){
    const { info, setAllPosts, like} = props;
    const { URL, deleteHashtag, setTrendingUpdate, trendingUpdate, updateHashtags, hashtagsUpdated } = useContext(AuthContext);

    const navigate = useNavigate()

    const user = JSON.parse(localStorage.getItem('user'));
    const tokenStorage = user.token;
    const [countLikes, setCountLikes] = useState([]);
    const [countShares, setCountShares] = useState([]);
    const [countComments, setCountComments] = useState([]);
    const [edit, setEdit] = useState(false);
    const [message, setMessage] = useState(info.message)
    const [oldMessage, setOldMessage] = useState()
    const [promiseReturned, setPromiseReturned] = useState(false);
    const [likes, setLikes] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [isOpenRepost, setIsOpenRepost] = useState(false);
    const [result, setResult] = useState('');
    const [namesRefresh, setNamesRefresh] = useState([]);
    const [addComment, setAddComment] = useState(null);
    const [comments, setComments] = useState([]);
    const [openComments, setOpenComments] = useState(false);
    const [commentsFollows, setCommentsFollows] = useState(false);
    const [loading, setLoading] = useState(false);

    const nameRef = useRef(null);

    useEffect(() => {
      if(like){
        setLikes(true);
      }else{
        setLikes(false);
      }
    }, [like])

  function focus() {
    setOldMessage(message);
    nameRef.current.focus();
    setMessage(message);
  }

    function submit(e){
      if (e.keyCode === 13) {
        e.preventDefault()
          updateMessage(
            info,
            tokenStorage,
            setPromiseReturned,
            setMessage,
            setEdit,
            updateHashtags,
            hashtagsUpdated,
            setTrendingUpdate,
            message,
            trendingUpdate,
            URL
          )
      } else if (e.keyCode === 27){
        setMessage(oldMessage)
        setEdit(false);
      }
    }

    useEffect(() => {
      const id = info.postid;
      const promise = axios.get(`${URL}/countlikes/post/${id}`);
      promise.then((response) => {
        setCountLikes(response.data);
      });
      promise.catch((error) => {
        alert("an error has ocurred...");
      });
    }, [likes])
        
    useEffect(() => {
      const id = info.postid;
      const promise = axios.get(`${URL}/countShares/post/${id}`);
      promise.then((response) => {
        setCountShares(response.data);
      });
      promise.catch((error) => {
        alert("an error has ocurred...");
      });
  }, []);  
  
const customStyles = {
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(255, 255, 255, 0.9)',
            zIndex: 100
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

      useEffect(() => {
        const id = info.postid
        const promiseLikes = axios.get(`${URL}/get/likes/${id}`);
      
        promiseLikes.then((response) => {
          setNamesRefresh(response.data);
        });
        promiseLikes.catch((error) => {
          alert("an error has ocurred...");
        });
      }, [countLikes]);

      useEffect(() => {
        let newLikesNames = []
        for(let i=0; i<namesRefresh.length; i++){
          if(namesRefresh[i].name !== user.name){
            newLikesNames.push(namesRefresh[i].name);
          }
        }

        let res = '';
  
        if(namesRefresh.length === 0){
          res = null;
          setResult(res)
        } else if(namesRefresh.length === 1 && likes){
          res = "You liked";
          setResult(res)
        } else if(newLikesNames.length === 1 && !likes){
          res = `Liked by ${newLikesNames[0]}`;
          setResult(res)
        } else if (namesRefresh.length === 2 && likes){
          res = `You and ${newLikesNames[0]} liked`;
          setResult(res)
        } else if (newLikesNames.length === 2 && !likes){
          res = `${newLikesNames[0]} e ${newLikesNames[1]} liked`;
          setResult(res)
        } else if (namesRefresh.length >= 3 && likes){
          res = `You, ${newLikesNames[0]} and other ${countLikes - 2} people liked`;
          setResult(res)
        } else if(newLikesNames.length >= 3 && !likes){
          res = `${newLikesNames[0]}, ${newLikesNames[1]} and other ${countLikes - 2} people liked`;
          setResult(res)
        }
    }, [namesRefresh])

    useEffect(() => {
      const id = info.postid;
      const promise = axios.get(`${URL}/countcomments/${id}`);
      promise.then((response) => {
        setCountComments(response.data);
      });
      promise.catch((error) => {
        alert("an error has ocurred...");
      });
    }, [comments])

    useEffect(() => {
      const id = user.userId;
      const promise = axios.get(`${URL}/commment/follow/${id}`);
      promise.then((response) => {
        setCommentsFollows(response.data);
      });
      promise.catch((error) => {
        alert("an error has ocurred...");
      });
    }, [comments])

    function handleClick() {
      navigate(`/user/${info.userId}`);
      window.location.reload();
    }
    

    return promiseReturned === false ? (
      !info.originalUserId ? (
        <MainContainer>
          <PostContainer>
            <PerfilLikeContainer>
              <img
                src={info.userImage}
                alt="perfil"
                onClick={() => handleClick()}
              ></img>
              <div>
                  <TiHeartFullOutline
                    style={{ color: likes ? "red" : "white" }}
                    fontSize="30px"
                    onClick={() => {
                      if (likes === false) {
                        postLike(info, tokenStorage, setLikes, URL, setLoading, loading);
                      } else if (likes === true) {
                        deleteLike(info, tokenStorage, setLikes, URL, setLoading, loading);
                      }
                    }}
                  />
              </div>
              <ContainerCountLikes data-tip data-for="countLikes">
                <a data-tip={countLikes ? `${result}` : null}>
                  {countLikes} Likes
                </a>
                <ReactTooltip place="bottom" type="light" effect="solid" />
              </ContainerCountLikes>
              <ContainerIconComments>
                <AiOutlineComment
                  onClick={() => {
                    if (openComments === true) {
                      setOpenComments(false);
                    } else if (openComments === false) {
                      setOpenComments(true);
                      getComments(URL, tokenStorage, setComments, info);
                    }
                  }}
                />
                <ContainerCountComments>
                {countComments ? <p>{countComments} comments</p>: <p>0 comments</p>}
                </ContainerCountComments>
              </ContainerIconComments>
              <ContainerIconComments>
                <BiRepost
                  style={{ color: "white" }}
                  fontSize="30px"
                  onClick={() => {
                    toggleModalRepost(setIsOpenRepost, isOpenRepost)
                  }}/>
                <Modal
                  isOpen={isOpenRepost}
                  onRequestClose={() => toggleModalRepost(setIsOpenRepost, isOpenRepost)}
                  style={customStyles}>
                  <div style={{ marginTop: "40px" }}>
                  Do you want to re-post this link?
                  </div>
                  <button
                    onClick={() => toggleModalRepost(setIsOpenRepost, isOpenRepost)}
                    style={{
                      width: "134px",
                      height: "37px",
                      marginTop: "40px",
                      marginRight: "25px",
                      borderRadius: "5px",
                      background: "#ffffff",
                      color: "#1877F2",
                      textDecoration: "none",
                      fontFamily: "Lato",
                      fontSize: "18px",
                      fontWeight: "700",
                      cursor: "pointer",
                    }}
                  >
                    No, cancel
                  </button>
                  <button
                    onClick={() =>
                      postShare(info, tokenStorage, URL, setAllPosts, setIsOpenRepost, isOpenRepost)
                    }
                    style={{
                      width: "134px",
                      height: "37px",
                      marginTop: "40px",
                      borderRadius: "5px",
                      background: "#1877F2",
                      color: "#ffffff",
                      textDecoration: "none",
                      fontFamily: "Lato",
                      fontSize: "18px",
                      fontWeight: "700",
                      cursor: "pointer",
                    }}
                  >
                    Yes, share!
                  </button>
                </Modal>
              <ContainerCountLikes>
                <p>{countShares} re-post</p>
              </ContainerCountLikes>
              </ContainerIconComments>
            </PerfilLikeContainer>
            <Right>
              <UserContainer>
                <MessageUser>
                  <p onClick={() => handleClick()}>{info.userName}</p>
                  {edit ? (
                    <textarea
                      name="message"
                      ref={nameRef}
                      type="text"
                      value={message}
                      onKeyDown={submit}
                      onChange={(e) => setMessage(e.target.value)}
                      disabled={promiseReturned ? true : false}
                    />
                  ) : (
                    <ReactHashtag
                      renderHashtag={(hashtag) => (
                        <HashtagStyle
                          onClick={() => {
                            navigate(`/hashtag/${hashtag.replace("#", "")}`);
                          }}
                        >
                          {hashtag}
                        </HashtagStyle>
                      )}
                    >
                      {message}
                    </ReactHashtag>
                  )}
                </MessageUser>
                {user.userId === info.userId ? (
                  <EditDeleteContainer>
                    <TiPencil
                      color="white"
                      fontSize="25px"
                      onClick={() => {
                        if (edit === false) {
                          setEdit(!edit);
                          setTimeout(focus, 100);
                        } else {
                          setEdit(false);
                          setMessage(oldMessage);
                        }
                      }}
                    />
                    <TiTrash
                      color="white"
                      fontSize="25px"
                      onClick={() => toggleModalDelete(setIsOpenDelete, isOpenDelete)}
                    />
                  </EditDeleteContainer>
                ) : (
                  <></>
                )}
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
              isOpen={isOpenDelete}
              onRequestClose={() => toggleModalDelete(setIsOpenDelete, isOpenDelete)}
              style={customStyles}
            >
              <div style={{ marginTop: "40px" }}>
                Are you sure you want to delete this post?
              </div>
              <button
                onClick={() => toggleModalDelete(setIsOpenDelete, isOpenDelete)}
                style={{
                  width: "134px",
                  height: "37px",
                  marginTop: "40px",
                  marginRight: "25px",
                  borderRadius: "5px",
                  background: "#ffffff",
                  color: "#1877F2",
                  textDecoration: "none",
                  fontFamily: "Lato",
                  fontSize: "18px",
                  fontWeight: "700",
                  cursor: "pointer",
                  border:"none",
                }}
              >
                No, go back
              </button>
              <button
                onClick={() =>
                  deletePost(
                    info,
                    tokenStorage,
                    setAllPosts,
                    deleteHashtag,
                    URL,
                    setIsOpenDelete,
                    isOpenDelete
                  )
                }
                style={{
                  width: "134px",
                  height: "37px",
                  marginTop: "40px",
                  borderRadius: "5px",
                  background: "#1877F2",
                  color: "#ffffff",
                  textDecoration: "none",
                  fontFamily: "Lato",
                  fontSize: "18px",
                  fontWeight: "700",
                  cursor: "pointer",
                  border:"none",
                }}
              >
                Yes, delete it
              </button>
            </Modal>
          </PostContainer>
          <ContainerComments>
            <div>
              {comments && openComments === true ? (
                comments.map((comment) => (
                  <MappingComments
                    info={info}
                    comment={comment}
                    user={user}
                    commentsFollows={commentsFollows}
                  />
                ))
              ) : (
                <></>
              )}
            </div>

            {openComments === true ? (
              <ContainerInputComments>
                <img src={user.image} alt="perfil"></img>
                <input
                  type="text"
                  maxLength={100}
                  value={addComment}
                  placeholder="write a comment..."
                  onChange={(e) => setAddComment(e.target.value)}
                />
                <FiSend
                  onClick={() =>
                    postComments(
                      info,
                      URL,
                      tokenStorage,
                      setAddComment,
                      addComment,
                      setComments
                    )
                  }
                />
              </ContainerInputComments>
            ) : (
              <></>
            )}
          </ContainerComments>
        </MainContainer>
      ) : (
        <Repost info={info} like={like} setAllPosts={setAllPosts} />
      )
    ) : (
      <Loading />
    );
}

const MainContainer = styled.div`
  width: 100%;
  margin-bottom: 16px;
`;

const PostContainer = styled.div`
  background-color: #171717;
  margin-top: 10px;
  border-radius: 15px;
  width: 100%;
  height: fit-content;
  display: flex;  
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  position: relative;
  @media (max-width: 900px) {
    width: 100vw;
    border-radius: 0;
    height: fit-content;
  }
`;
const Right = styled.div`
  width: calc(100% - 91px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`


const PerfilLikeContainer = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;

  div {
    cursor: pointer;
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-bottom: 10px;
    cursor: pointer;
  }
  @media (max-width: 900px) {
    img {
      width: 40px;
      height: 40px;
    }
    svg {
      font-size: 24px;
    }
  }
`;
const ContainerCountLikes = styled.div`
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  text-align: center;
  color: white;
`;

const UserContainer = styled.div`
  display: flex;
  justify-content: space-between;
  color: white;
  .message {
    color: white;
  }
`;
const MessageUser = styled.div`
  width: 90%;
  height: auto;
  padding: 10px 0px 10px 0px;
  line-height: 25px;
  overflow-x: hidden;
  word-break: break-all;
  textarea {
    width: 111%;
    height: 44px;
    padding-left: 10px;
    padding-top: 4px;
    padding-bottom: 4px;
    padding-right: 10px;
    display: flex;
    flex-wrap: wrap;
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #4c4c4c;
    border-radius: 7px;
    resize: none;
    overflow: hidden;
  }

  p:first-child {
    max-width: fit-content;
    margin-bottom: 7px;
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    display: flex;
    width: auto;
    cursor: pointer;
  }

  p:last-child {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
    color: #b7b7b7;
  }
`;
const EditDeleteContainer = styled.div`
  padding-top: 10px;
  display: flex;
  width: 8%;
  justify-content: space-between;
  cursor: pointer;
  @media (max-width: 900px) {
    position: absolute;
    right: 10px;
    width: 40px;
  }
`;

const ContainerCountComments = styled.div `
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  text-align: center;
  color: white;
`;

const HashtagStyle = styled.span`
  font-weight: 700;
  cursor: pointer;
`;

const ContainerIconComments = styled.div`
  margin-top: 12px;
  text-align: center;
  margin-top: 18px;
  font-size: 24px;
  color: white;
  cursor: pointer;
  border-radius: 16px;
`;

const ContainerComments = styled.div`
  margin-top: -10px;
  padding-top: 10px;
  font-size: 24px;
  color: white;
  background: #1E1E1E;
  border-radius: 0px 0px 16px 16px;
`;

const ContainerInputComments = styled.div`
  margin-left: 16px;
  padding-top: 25px;
  padding-bottom: 25px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;

  img{
    width: 39px;
    height: 39px;
    border-radius: 26.5px;
  }

  input {
    width: 85%;
    height: 39px;
    margin-right: 5%;
    background: #252525;
    border-radius: 8px;
    border: none;
    padding-left: 15px;
    color: white;
  }

  input:focus{
    box-shadow: 0 0 0 0;
    border: 0 none;
    outline: 0;
  }

  svg {
    font-size: 15px;
    right: 9%;
    position: absolute;
    cursor: pointer;
  }
`;

const LinkContainer = styled.a`
  height: auto;
  bottom: 20px;
  margin-bottom: 20px;
  border: 1px solid #4d4d4d;
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
    text-decoration: none;
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #cecece;
    overflow-x: hidden;
  }

  p:nth-child(2) {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 13px;
    color: #9b9595;
  }

  p:last-child {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    color: #cecece;
  }

  img {
    border-radius: 0px 11px 11px 0px;
    width: 30%;
    height: 175px;
  }
  @media (max-width: 500px) {
    div {
      font-size: 11px;
      line-height: 13.2px;
      height: fit-content;
    }
    p:nth-child(2) {
      font-size: 9px;
      line-height: 11px;
    }
    p:last-child {
      font-size: 9px;
      line-height: 11px;
    }
    img {
      height: 115px;
    }
  }
  @media (max-width: 341px) {
    div{
      width:100%;
    }
    img {
      display: none;
    }
  }
`;
