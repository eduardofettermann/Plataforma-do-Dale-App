// style.js

import styled from "styled-components";
import Select from "react-select";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Montserrat', sans-serif;
  width: 100%;
  height: 100%;
  padding: 20px;
`;

export const CustomSelect = styled(Select)`
  width: 100%;
  max-width: 400px;
  margin: 20px auto;
`;

export const Button = styled.button`
align-items: center;
    padding: 10px;
    background-color: green;
    margin-top: 2px; // Espaçamento entre o texto e o botão
    border-radius: 15px;
    background-color: #00FF59;
    color: rgb(0, 0, 0);
    font-weight: bold;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
`;
