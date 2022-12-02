import styled from "styled-components"

export const Button = styled.button`
width:50%;
margin:0 auto;
height:30px;
font-size:20px;
background-color:rgba(0,0,0,0.1);
border:none;
outline:none;
&:hover{
    cursor:pointer;
    border-bottom:lightgrey 1px solid;
    -webkit-box-shadow: 0px 5px 5px -4px rgba(88, 112, 131, 0.6);
-moz-box-shadow: 0px 5px 5px -4px rgba(88, 112, 131, 0.6);
box-shadow: 0px 5px 5px -4px rgba(88, 112, 131, 0.6);
`
export const DeleteButton = styled.button`
background:transparent;
border:none;
outline:none;
width:30px;
font-size:18px;
margin:0;
&:hover{
    cursor:pointer;
`

export const CloseBtn = styled(DeleteButton)`
position:absolute;
font-size:24px;
color:#fff;
top:10px;
right:10px;
`
export const ActionButton = styled.button`
min-width:90px;
padding;5px 5px;
margin:5px auto;
height:30px;
font-size:20px;
border-radius:10px;
background:lightgreen;
`