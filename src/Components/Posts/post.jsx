import styled from "styled-components";
import axios from "axios";
import ReactTooltip from "react-tooltip";
import Modal from "react-modal";
import { TiPencil, TiHeartFullOutline, TiTrash } from "react-icons/ti";
import { useRef, useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/Auth";
import Loading from "../PublicComponents/Loading";
import ReactHashtag from "@mdnm/react-hashtag";
import {
  postLike,
  updateMessage,
  deleteLike,
  toggleModal,
  deletePost,
} from "./postRepository";
Modal.setAppElement(".root");

export default function Post(props) {
  const { info, setAllPosts, like } = props;
  const {
    URL,
    deleteHashtag,
    setTrendingUpdate,
    trendingUpdate,
    updateHashtags,
    hashtagsUpdated,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const tokenStorage = user.token;
  const [countLikes, setCountLikes] = useState([]);
  const [edit, setEdit] = useState(false);
  const [message, setMessage] = useState(info.message);
  const [oldMessage, setOldMessage] = useState();
  const [promiseReturned, setPromiseReturned] = useState(false);
  const [likes, setLikes] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [result, setResult] = useState("");
  const [namesRefresh, setNamesRefresh] = useState([]);

  const nameRef = useRef(null);

  useEffect(() => {
    if (like) {
      setLikes(true);
    } else {
      setLikes(false);
    }
  }, [like]);

  function focus() {
    setOldMessage(message);
    nameRef.current.focus();
    setMessage(message);
  }

  function submit(e) {
    if (e.keyCode === 13) {
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
      );
    } else if (e.keyCode === 27) {
      setMessage(oldMessage);
      setEdit(false);
    }
  }

  useEffect(() => {
    const id = info.postid;
    const promise = axios.get(`${URL}/coutlikes/post/${id}`);
    promise.then((response) => {
      setCountLikes(response.data);
    });
    promise.catch((error) => {
      alert("an error has ocurred...");
    });
  }, [likes]);

  const customStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(255, 255, 255, 0.9)",
      zIndex: 100,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "597px",
      height: "262px",
      background: "#333333",
      borderRadius: "50px",
      textAlign: "center",
      color: "white",
      paddingLeft: "100px",
      paddingRight: "100px",
      fontSize: "34px",
    },
  };

  useEffect(() => {
    const id = info.postid;
    const promiseLikes = axios.get(`${URL}/get/likes/${id}`);

    promiseLikes.then((response) => {
      setNamesRefresh(response.data);
    });
    promiseLikes.catch((error) => {
      alert("an error has ocurred...");
    });
  }, [countLikes]);

  useEffect(() => {
    let newLikesNames = [];
    for (let i = 0; i < namesRefresh.length; i++) {
      if (namesRefresh[i].name != user.name) {
        newLikesNames.push(namesRefresh[i].name);
      }
    }

    let res = "";

    if (namesRefresh.length === 0) {
      res = null;
      setResult(res);
    } else if (namesRefresh.length === 1 && likes) {
      res = "You liked";
      setResult(res);
    } else if (newLikesNames.length === 1 && !likes) {
      res = `Liked by ${newLikesNames[0]}`;
      setResult(res);
    } else if (namesRefresh.length === 2 && likes) {
      res = `You and ${newLikesNames[0]} liked`;
      setResult(res);
    } else if (newLikesNames.length === 2 && !likes) {
      res = `${newLikesNames[0]} e ${newLikesNames[1]} liked`;
      setResult(res);
    } else if (namesRefresh.length >= 3 && likes) {
      res = `You, ${newLikesNames[0]} and other ${countLikes - 2} people liked`;
      setResult(res);
    } else if (newLikesNames.length >= 3 && !likes) {
      res = `${newLikesNames[0]}, ${newLikesNames[1]} and other ${
        countLikes - 2
      } people liked`;
      setResult(res);
    }
  }, [namesRefresh]);

  return promiseReturned === false ? (
    <PostContainer>
      <PerfilLikeContainer>
        <img src={info.userImage} alt="perfil"></img>

        <div>
          <TiHeartFullOutline
            style={{ color: likes ? "red" : "white" }}
            fontSize="30px"
            onClick={() => {
              if (likes === false) {
                postLike(info, tokenStorage, setLikes, URL);
              } else if (likes === true) {
                deleteLike(info, tokenStorage, setLikes, URL);
              }
            }}
          />
        </div>
        <ContainerCountLikes data-tip data-for="countLikes">
          <a data-tip={countLikes ? `${result}` : null}>{countLikes} Likes</a>
          <ReactTooltip place="bottom" type="light" effect="solid" />
        </ContainerCountLikes>
      </PerfilLikeContainer>
      <Right>
        <UserContainer>
          <MessageUser>
            <p>{info.userName}</p>
            {edit ? (
              <input
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
                onClick={() => toggleModal(setIsOpen, isOpen)}
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
        isOpen={isOpen}
        onRequestClose={() => toggleModal(setIsOpen, isOpen)}
        style={customStyles}
      >
        <div style={{ marginTop: "40px" }}>
          Are you sure you want to delete this post?
        </div>
        <button
          onClick={() => toggleModal(setIsOpen, isOpen)}
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
              setIsOpen,
              isOpen
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
          }}
        >
          Yes, delete it
        </button>
      </Modal>
    </PostContainer>
  ) : (
    <Loading />
  );
}

const PostContainer = styled.div`
  background-color: #171717;
  margin-top: 10px;
  border-radius: 15px;
  width: 100%;
  height: fit-content;
  display: flex;  
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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
  @media (max-width: 900px) {
    width: calc(100% - 78px);
  }
`;
//
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
//
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
  }

  p:first-child {
    margin-bottom: 7px;
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
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
const HashtagStyle = styled.span`
  font-weight: 700;
  cursor: pointer;
`;
//
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
