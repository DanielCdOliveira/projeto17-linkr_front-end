import { ThreeDots } from  'react-loader-spinner'
import styled from 'styled-components';

export default function Loading() {
    return(
        <Load>
            <ThreeDots color="#FFF" height={50} width={50} />
        </Load>
    );
}

const Load = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;