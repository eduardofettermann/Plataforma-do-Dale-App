// style.js

import styled from "styled-components";
import font from '../../styles/fonts';

const fontFamily = font.FONTS;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
`;

export const Navbar = styled.nav`
    background-color: black;
    width: 100%;
    padding: 10px 0;
    text-align: center;

    h1 {
        color: white;
        font-family: ${fontFamily.FONT_100};
    }
`;

export const Content = styled.div` // Alterando de Biography para Content
    font-family: ${fontFamily.FONT_100};
    margin-top: 20px;
    padding: 10px;
    border-radius: 5px;
    width: 90%;
    max-width: 350px;
    word-wrap: break-word;
    text-align: center; // Centralizando o texto
    display: flex;
    flex-direction: column;
    align-items: center; // Centralizando o botão

    h1 {
        font-family: ${fontFamily.FONT_100};
        text-align: center;
        margin-bottom: 20px;
    }

    button {
        align-items: center;
        padding: 10px;
        background-color: green;
        margin-top: 20px; // Espaçamento entre o texto e o botão
        border-radius: 15px;
        background-color: #00FF59;
        color: rgb(0, 0, 0);
        font-weight: bold;
        cursor: pointer;

        font-family: 'Montserrat', sans-serif;
    }
`;