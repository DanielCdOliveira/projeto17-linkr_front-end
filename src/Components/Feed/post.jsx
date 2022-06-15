import styled from 'styled-components';
import { TiPencil, TiHeartOutline, TiTrash } from "react-icons/ti";
export default function Post(props){

    const { info } = props;
    return (
      <PostContainer>

        <PerfilLikeContainer>
          <img src="https://img.freepik.com/vetores-gratis/fundo-de-modelo-simples-de-moldura-redonda_1159-26474.jpg"></img>
          <TiHeartOutline />
        </PerfilLikeContainer>

        <UserContainer>
          <p>Juvenal Juvêncio</p>
          <p className='message'>JOVEM</p>
        </UserContainer>
        
        <LinkContainer>
            <div>
              <p>{info.title}</p>
              <p>{info.description}</p>
              <p>{info.link}</p>
            </div>
            <img src={info.image}></img>
        </LinkContainer>

        <EditDeleteContainer>
          <TiPencil color='white'/>
          <TiTrash color='white' />
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

const LinkContainer = styled.div`
      width: 503px;
      height: 155px;
      background-color: gray;
      position: absolute;
      bottom: 20px;
      border: 1px solid #4D4D4D;
      border-radius: 11px;
      display: flex;
    div {
      display: flex;
      width: 345px;
      height: 155px;
      background-color: white;
      flex-direction: column;
      justify-content: space-around;
      border-radius: 11px;
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