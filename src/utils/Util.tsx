import * as React from "react";
import {IconButton, TextField,Box, Button,Dialog, DialogContent, DialogTitle,DialogActions, Input,} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export const Util = {
  BrowseImage:null as any,
  BrowseLink:null as any,
  renderBrowseImage:(props:{onConfirm?:any, onCancel?:any,adding?:boolean})=>{
    if(Util.BrowseImage){
      let A = Util.BrowseImage as (props:{onConfirm?:any, onCancel?:any,adding?:boolean})=>JSX.Element;
      return <A onConfirm={props.onConfirm} adding={true}/>;
    }else{
      return <DefaultBrowseImage onConfirm={props.onConfirm} adding={true}/> 
    }
  },
  renderBrowseLink:(props:{onConfirm?:any, onCancel?:any,adding?:boolean,defalutValue?:any})=>{
    if(Util.BrowseLink){
      let A = Util.BrowseLink as (props:{onConfirm?:any, onCancel?:any,adding?:boolean,defalutValue?:any})=>JSX.Element;
      return <A onConfirm={props.onConfirm} adding={true} defalutValue={props.defalutValue}/>;
    }else{
      return <DefaultBrowseLink onConfirm={props.onConfirm} adding={true} defalutValue={props.defalutValue} /> 
    }
   
  }
}

const DefaultBrowseImage = (props:{onConfirm?:any,adding?:boolean})=>{
    const [adding, setAdding] = React.useState(props.adding?true:false);
    const [inputUrl, setInputUrl] = React.useState('');

    const submitImage = ()=>{
      if(inputUrl==''){
        alert('Please enter the url before confirm')
        return
      }
      setAdding(false);
      props.onConfirm(inputUrl,'input')
    }
    const handleClose = (event?:any, reason?:any) => {
      if (reason && reason === "backdropClick") 
      return;
      setAdding(false);
    };
  return (
    <>
     {adding&&<Dialog
        open={adding}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={'md'}
        >
        <DialogTitle>Input url
          {(
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </DialogTitle>
        <DialogContent>
            <div className="tab-content" style={{display: 'flex',alignItems: 'center'}}>
              <span style={{marginRight:'10px'}}>InputUrl:</span>
              <TextField sx={{width:'calc(100% - 120px)'}} placeholder='Please enter the url' defaultValue={inputUrl} size="small" hiddenLabel variant="outlined" onChange={(e)=>setInputUrl(e.target.value)} />
            </div>
        </DialogContent>    
        <DialogActions>
            <Button onClick={submitImage} autoFocus> Confirm</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>              
      </Dialog>
      }
    </>
  )
}

const DefaultBrowseLink = (props:{onConfirm?:any,onCancel?:any,adding?:boolean,defalutValue?:any})=>{
  const [adding, setAdding] = React.useState(props.adding?true:false);
  const [inputUrl, setInputUrl] = React.useState(props.defalutValue?props.defalutValue.url:'');

  const submitImage = ()=>{
    if(inputUrl==''){
      alert('Please enter the url before confirm')
      return
    }
    setAdding(false);
    props.onConfirm(inputUrl,'input')
  }
  const handleClose = (event?:any, reason?:any) => {
    if (reason && reason === "backdropClick") 
    return;
    setAdding(false);
  };
return (
  <Dialog
        open={adding}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={'md'}
        >
        <DialogTitle>Link url
          {(
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </DialogTitle>
        <DialogContent>
            <div className="tab-content" style={{display: 'flex',alignItems: 'center'}}>
              <span style={{marginRight:'10px'}}>LinkUrl:</span>
              <TextField sx={{width:'calc(100% - 120px)'}} placeholder='Please enter the url' defaultValue={inputUrl} size="small" hiddenLabel variant="outlined" onChange={(e)=>setInputUrl(e.target.value)} />
            </div>
        </DialogContent>    
        <DialogActions>
            <Button onClick={submitImage} autoFocus> Confirm</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>              
      </Dialog>
)
}




