import styled, { css } from "styled-components";


const Day = styled.span`
color: black;
width: 35px;
height: 30px;
margin: 2px 0px;
display: inline-block;
text-align: center;
line-height: 30px;
cursor: pointer;
${props => props.isInactive && css`
    color: lightgrey;
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

export default Day;