import { useEffect, useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../Context/Auth";
import { useNavigate } from "react-router-dom";

export default function HashtagsTrending() {
  const { getTrending, hashtags, trendingUpdate } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    getTrending();
  }, [trendingUpdate]);

  if (hashtags) {
    return (
      <SideBar>
        <Trending>
          <h1>trending</h1>
          <List>
            {hashtags.map((hashtag) => {
              return (
                <div
                  onClick={() => {
                    navigate(`/hashtag/${hashtag.name}`);
                  }}
                >
                  <p>#</p> 
                  <p>{hashtag.name}</p> 
                </div>
              );
            })}
          </List>
        </Trending>
      </SideBar>
    );
  } else {
    return <></>;
  }
}

const SideBar = styled.div`
  width: 300px;
  max-width: 320px;
  min-width: 200px;
  height: 350px;
  height: 430px;
  margin-top: 180px;
  z-index: 1;
  left: 70vw;
  position: fixed;
  top: 50px;

  @media (max-width: 1050px) {
    left: auto;
    right: 0;
  }
  @media (max-width: 950px) {
    width: 31%;
  }
  @media (max-width: 900px) {
    display: none;
  }
`;

const Trending = styled.div`
  width: 100%;
  height: 100%;
  background-color: #171717;
  border-radius: 16px;
  color: white;
  margin-right: 25px;

  h1 {
    padding: 10px;
    width: 100%;
    font-family: Oswald;
    font-size: 27px;
    font-weight: 700;
    line-height: 40px;
    text-align: left;
    border-bottom: 1px solid #4d4d4d;
  }
`;

const List = styled.div`
  width: 100%;
  height: auto;
  padding: 10px;
  font-size: 19px;
  font-weight: 700;
  line-height: 23px;
  letter-spacing: 0.05em;
  text-align: left;
  div{
    cursor: pointer;
    width: 100%;
    margin: 2px 0 ;
    display: flex;
    overflow-x:hidden;
  }
  p {
    cursor: pointer;
    height: 23px;
    display: flex;
  }
`;
