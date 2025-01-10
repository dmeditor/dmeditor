import { createTheme } from '@mui/material';
import { deepOrange } from '@mui/material/colors';

export const muiTheme = createTheme({
  palette: {
    primary: deepOrange,
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#777777',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#888888',
              borderWidth: 1,
            },
          },
          '& .MuiOutlinedInput-input': {
            padding: '8px 6px',
            background: '#fcfcfc',
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: 'black',
          '& .MuiTooltip-arrow': {
            color: 'black',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          // '& .MuiMenu-paper':{
          //   color: 'black'
          // }
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          '& .Mui-selected': {},
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          '&.MuiButton-root': {
            minWidth: '30px',
            padding: '5px',
          },
        },
      },
    },
  },
});
