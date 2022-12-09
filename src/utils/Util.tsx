import * as React from "react";
import {IconButton, TextField,Box, Button,Dialog, DialogContent, DialogTitle,DialogActions, Input,} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export interface BroseProps{
  type?:any, 
  adding?:boolean, 
  onConfirm?:any,
  onCancel?:()=>void,
  defalutValue?:any,
}

export const Util = {
  BrowseImage:null as any,
  BrowseLink:null as any,
  CustomProperty:null as any,
  PreBlock:null as any,
  pageTab:null as any,
  pageTabActiveIndex:0,
  toast:null as any,
  renderBroseURL:(props:BroseProps)=>{
    if(props.type==='Image'&&Util.BrowseImage){
        let A = Util.BrowseImage as (props:BroseProps)=>JSX.Element;
        return <A onConfirm={props.onConfirm} adding={true}/>;
    }else if(props.type==='Link'&&Util.BrowseLink){
      let A = Util.BrowseLink as (props:BroseProps)=>JSX.Element;
      return <A onConfirm={props.onConfirm} adding={true} defalutValue={props.defalutValue}/>;
    }else{
        return <DefaultBrowseUrl onConfirm={props.onConfirm} adding={true} defalutValue={props.defalutValue} type={props.type}/> 
    }
  },
  renderCustomProperty:(props:any)=>{
    if(Util.CustomProperty){
      let A = Util.CustomProperty as (props:any)=>JSX.Element;
      return <A data={props}/>;
    }else{
      return null
    }
  },
  renderPreBlock:(props:{blockData:string})=>{
    if(Util.PreBlock){
      let A = Util.PreBlock as (props:any)=>JSX.Element;
      return <A  blockData={props.blockData}/>;
    }else{
      return null
    }
  },
  renderPageTab:()=>{
    if(Util.pageTab){
      let A = Util.pageTab as ()=>JSX.Element;
      return <A />;
    }else{
      return null
    }
  },
  error:(msg:any,option?:any)=>{
    if(Util.toast){
      Util.toast.error(msg,option)
    }else{
      window.alert(msg)
    }
  },
  message:(msg:any,option?:any)=>{
    if(Util.toast){
      Util.toast.success(msg,option)
    }else{
      window.alert(msg)
    }
  }
}

export const isServer = () => {
  return !(typeof window != 'undefined' && window.document);
}

const DefaultBrowseUrl = (props:{type?:any,onConfirm?:any,onCancel?:any,adding?:boolean,defalutValue?:any})=>{
  const [adding, setAdding] = React.useState(props.adding?true:false);
  const [inputUrl, setInputUrl] = React.useState(props.defalutValue?props.defalutValue.url:'');

  const submitUrl = ()=>{
    if(inputUrl==''){
      Util.error('Please enter the url before confirm')
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
        <DialogTitle>{props.type} url
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
              <span style={{marginRight:'10px'}}>{props.type}Url:</span>
              <TextField sx={{width:'calc(100% - 120px)'}} placeholder='Please enter the url' defaultValue={inputUrl} size="small" hiddenLabel variant="outlined" onChange={(e)=>setInputUrl(e.target.value)} />
            </div>
        </DialogContent>    
        <DialogActions>
            <Button onClick={submitUrl} autoFocus> Submit</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>              
      </Dialog>
)
}




