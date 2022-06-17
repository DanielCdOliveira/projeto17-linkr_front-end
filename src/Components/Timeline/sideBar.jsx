import styled from 'styled-components';

export default function HashtagsTrending(props) {
    const { hashtags } = props
    return (
        <SideBar>
                <Right>
                        <Trending>
                                <h1>trending</h1>
                                <List>
                                    {hashtags.map((hashtag) => {
                                        return (
                                            <p># {hashtag.name}</p>
                                        )
                                    })}
                                </List>
                        </Trending>
                </Right>
        </SideBar>
    )
}

const SideBar = styled.div`
        width: 100%;
        height: 300px;
        margin-top: 180px;
        z-index: 1;
        left: 0;
        position: fixed;
        display: flex;
        justify-content: center;
`

const Right = styled.div`
        width: 60%;
        height: 300px;
        display: flex;
        justify-content: flex-end;   
`

const Trending = styled.div`
        position: absolute;
        width: 15%;
        height: 406px;
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
`