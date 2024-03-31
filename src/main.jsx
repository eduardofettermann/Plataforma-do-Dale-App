
import React from 'react'
import ReactDOM from 'react-dom/client'
import GlobalStyles from './styles/global';
import { ThemeProvider } from 'styled-components';

import theme from './styles/theme'

import { Routes } from './routes';
import { AuthProvider } from './routes/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
      <GlobalStyles />
          <Routes />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
)

