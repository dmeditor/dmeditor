import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Main } from './dmeditor/Main';
import { ThemeProvider } from '@mui/material';
import { grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

function App() {
  const outerTheme= createTheme({
    palette:{
      primary:grey,
    }
  });

  return (
    <div className="App">
      <header className="App-header">        
      </header>
      <ThemeProvider theme={outerTheme}>
        <Main />
      </ThemeProvider>
    </div>
  );
}

export default App;
