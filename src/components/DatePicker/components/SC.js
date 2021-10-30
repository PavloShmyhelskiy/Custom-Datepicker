import styled, { css } from "styled-components";


const SC = styled.span`
color: black;
width: 100%;
height:100%;
display: inline-block;
${props => props.isInactive && css`
    color: gray;
  `}
  ${props => props.isinRange && css`
    color: blue;
    background-color: aquamarine;
  `}
  ${props => props.isStart && css`
    color: white;
    background-color: blue;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  `}
  ${props => props.isEnd && css`
    color: white;
    background-color: blue;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
`}
`;

export default SC;