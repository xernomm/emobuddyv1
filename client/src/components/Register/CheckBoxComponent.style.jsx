import styled from "styled-components";

export const Wrapper = styled.div`
  margin-bottom: 5px;
  display: flex;
  justify-content: center;
  @media (max-width: 800px) {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
  }
`;

export const Label = styled.label`
@media (min-width: 800px) and (max-width: 1100px)  {
font-size : 12px;
}
display: inline-block;
color: #1494b3;
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
font-size: 16px;
padding: 10px;
width: 100%;
height: 100%;
margin-left: 5px;
margin-right: 5px;
font-family: Montserrat-VariableFont_wght;
font-variation-settings: "wght" 600;
margin-bottom: 15px;

  :hover {
    background-color:#1494b3;
    color: #fff;
  }
  }

  :active {
    background-color:#1494b3;
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
    font-size: 16px;
    padding: 10px;
    width: 100%;
    height: 100%;
    margin-left: 5px;
    margin-right: 5px;
    background-color: #1494b3;
    color: #fff;
    font-family: Montserrat-VariableFont_wght;
    font-variation-settings: "wght" 600;
    margin-bottom: 15px;
  }
`;
