import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            font-size: 62.5%;
        }

        body, input, button, textarea {
        //    font-family: 'Roboto Slab', serif;
        font-family: "Montserrat", sans-serif;
        font-size: 1.6rem;
            outline: none;
        }

        body {
            background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
            color: ${({ theme }) => theme.COLORS.WHITE};

            -webkit-font-smoothing: antialiased;
        }

        a {
            text-decoration: none;
        }

        button, a {
            cursor: pointer;
            transition: filter 0.2s;
        }

        button:hover, a:hover {
            filter: brightness(0.9)
        }

    /*     @font-face {
        font-family: 'Video';
        src: local('Video-Medium'),
            url('../assets/fonts/Video-Medium.woff') format('woff'),
            url('../assets/fonts/Video-Medium.woff') format('woff2');
        font-weight: 500;
        font-style: normal;
        } */
    `;
