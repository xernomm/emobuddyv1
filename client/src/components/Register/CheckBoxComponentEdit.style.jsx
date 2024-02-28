import styled from "styled-components";

export const Wrapper = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  margin-right: 5px;
  @media (max-width: 800px) {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
  }
`;

export const Label = styled.label`
@media (min-width: 800px) and (max-width: 1100px)  {
font-size : 13px;
}

@media (max-width: 800px){
width:100% ;
 }
display: inline-block;
font-family: Montserrat-VariableFont_wght;
font-variation-settings: "wght" 600;
color: #1494B3;
text-align: center;
vertical-align: middle;
-webkit-user-select: none;
user-select: none;
border: 1px solid transparent;
padding: 0.375rem 0.75rem;
line-height: 1.5;
transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
  border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
background-color: #ffffff;
border-radius: 15px;
border-color: #1494B3;
font-size: 15px;
padding: 10px;
width: 100%;
height: 100%;


  :hover {
    background-color: #1494B3;
    color: #fff;
  }
  }

  :active {
    background-color: #1494B3;
  color: #fff;
  }

  :not(:disabled):not(.disabled) {
    cursor: pointer;
  }
`;

export const CheckBox = styled.input`
  display: none;

  &:checked + ${Label} {
    @media (min-width: 800px) and (max-width: 1100px) {
      font-size: 12px;
    }

    @media (max-width: 800px) {
      width: 100%;
    }
    display: inline-block;

    text-align: center;
    vertical-align: middle;
    -webkit-user-select: none;
    user-select: none;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    line-height: 1.5;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    border-radius: 15px;
    border-color: #1494b3;
    font-family: Montserrat-VariableFont_wght;
    font-variation-settings: "wght" 600;
    font-size: 15px;
    padding: 10px;
    width: 100%;
    height: 100%;

    background-color: #1494b3;
    color: #fff;
  }
`;
