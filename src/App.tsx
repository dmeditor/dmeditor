import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BlockInfo, Main } from './dmeditor/Main';
import { ThemeProvider } from '@mui/material';
import { grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

function App() {
  const outerTheme= createTheme({
    palette:{
      primary:grey,
    },
    components:{
      MuiButtonBase:{
        defaultProps:{
          disableRipple:true,        
        }
      }
    }
  });

   
  let data:Array<BlockInfo> = [
    {
    type:'heading',
    content: {
      layout: {},
      data: {
        text: "UN whistleblowing complaints 'dismissed too early'",
        style: {level: 1}
      }
    },
  },
  {
    type:'full_image',
    content: {
      layout: {},
      data: {
        src: "https://ichef.bbci.co.uk/news/976/cpsprodpb/83F8/production/_125548733_stillspurna3new.jpg",
        style: {padding: 0, borderWidth:0, background:'#ffffff'}
      }
    },
  },
  {
    type:'p',
    content: {
      layout: {padding: 10},
      data:  "<p>Purna Sen's <a href=\"https://www.bbc.com\">comments</a> follow a BBC investigation which revealed the sackings of a number of UN staff who tried to expose alleged wrongdoing. </p><p>Ms Sen said the UN should \"step up\" and adopt any suggestions made by a panel. </p>  The UN has said it is committed to protecting \"bona fide whistleblowers\" and holding staff accountable.    </p><p>   The BBC documentary, The Whistleblowers: Inside the UN, features accounts from staff members who tried to report allegations - including fraud and sexual abuse. All said they had been penalised after speaking out - and some were sacked.</p>"      
    }
  }
  ];

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <ThemeProvider theme={outerTheme}>
        <Main data={data} />
      </ThemeProvider>
    </div>
  );
}

export default App;
