import styled from "styled-components";
import { useNavigate } from "react-router-dom";
export function MappingComments(props) {
  const { info, comment, commentsFollows } = props;
  const follow = commentsFollows.find(
    (follow) => follow.followedId === comment.userId
  );
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/user/${comment.userId}`);
    window.location.reload();
  }

  return (
    <CommentsContainer>
      <div>
        <img
          src={comment.image}
          alt="perfil"
          onClick={() => handleClick()}
        ></img>
      </div>
      <ContainerNameComment>
        <div>
          <p>{comment.name}</p>
          {info.userId === comment.userId ? (
            <p>• post’s author</p>
          ) : follow ? (
            <p>• following</p>
          ) : (
            <></>
          )}
        </div>
        <div>
          <p>{comment.comment}</p>
          <SeparadorHorizonal></SeparadorHorizonal>
        </div>
      </ContainerNameComment>
    </CommentsContainer>
  );
}

const CommentsContainer = styled.div`
  background: #1e1e1e;
  display: flex;
  padding-top: 22px;

  img {
    cursor: pointer;
    width: 39px;
    height: 39px;
    border-radius: 26.5px;
    margin-left: 22px;
  }
`;

const ContainerNameComment = styled.div`
  flex-direction: column;
  margin-left: 20px;
  width: 83%;

  div:first-child {
    display: flex;
  }

  p:first-child {
    font-family: "Lato";
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #f3f3f3;
  }

  p:nth-child(2) {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #acacac;
    margin-left: 5px;
  }
`;

const SeparadorHorizonal = styled.div`
  margin-left: -8%;
  margin-top: 22px;
  border: 1px solid #353535;
  transform: rotate(-0.1deg);
`;
