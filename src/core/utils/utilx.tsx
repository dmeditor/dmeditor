import * as React from 'react';
import { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material';
import { nanoid } from 'nanoid';

import { dmeConfig } from '../..';

export interface BrowseProps {
  type?: any;
  adding?: boolean;
  onConfirm?: any;
  onCancel?: () => void;
  defalutValue?: any;
  hovering?: boolean;
}

export const Util = {
  BrowseImage: null as any,
  BrowseLink: null as any,
  CustomProperty: null as any,
  PreBlock: null as any,
  pageTab: null as any,
  pageTabActiveIndex: 0,
  toast: null as any,
  fileUrl: '' as any,
  imageUrl: '' as any,
  renderBroseURL: (props: BrowseProps) => {
    if (props.type === 'Image' && Util.BrowseImage) {
      let A = Util.BrowseImage as (props: BrowseProps) => JSX.Element;
      return <A onConfirm={props.onConfirm} adding={true} />;
    } else if (props.type === 'Link' && Util.BrowseLink) {
      let A = Util.BrowseLink as (props: BrowseProps) => JSX.Element;
      return (
        <A
          onConfirm={props.onConfirm}
          adding={true}
          defalutValue={props.defalutValue}
          hovering={props.hovering}
        />
      );
    } else {
      return (
        <DefaultBrowseUrl
          onConfirm={props.onConfirm}
          adding={true}
          defalutValue={props.defalutValue}
          type={props.type}
        />
      );
    }
  },
  renderCustomProperty: (props: any) => {
    if (Util.CustomProperty) {
      let A = Util.CustomProperty as (props: any) => JSX.Element;
      return <A data={props} />;
    } else {
      return null;
    }
  },
  renderPreBlock: (props: { blockData: any }) => {
    if (Util.PreBlock) {
      let A = Util.PreBlock as (props: any) => JSX.Element;
      return <A blockData={props.blockData} />;
    } else {
      return null;
    }
  },
  renderPageTab: () => {
    if (Util.pageTab) {
      let A = Util.pageTab as () => JSX.Element;
      return <A />;
    } else {
      return null;
    }
  },
  getFileUrl: (path: any) => {
    if (Util.fileUrl) {
      return Util.fileUrl(path);
    } else {
      return path;
    }
  },
  getImageUrl: (path: any) => {
    if (Util.imageUrl) {
      return Util.imageUrl(path);
    } else {
      return path;
    }
  },
  poLastDiv: (obj: any) => {
    obj.focus();
    // move caret to end
    const textLength = obj.innerText.length;
    const range = document.createRange();
    const sel: any = window.getSelection();

    range.setStart(obj.childNodes[0], textLength);
    range.collapse(true);

    sel.removeAllRanges();
    sel.addRange(range);
  },
  changrootValue: (newRoot: any) => {
    let root: any = document.querySelector(':root');
    Object.entries(newRoot).forEach((v) => root.style.setProperty(v[0], v[1]));
  },
  imgReady: (url: any, ready?: any, load?: any, error?: any) => {
    var list: any = [],
      intervalId: any = null,
      // Used to execute the queue
      tick = () => {
        var i = 0;
        for (; i < list.length; i++) {
          list[i].end ? list.splice(i--, 1) : list[i]();
        }
        !list.length && stop();
      },
      // Stop all timer queues
      stop = () => {
        clearInterval(intervalId);
        intervalId = null;
      };
    return () => {
      var onready: any,
        width: any,
        height: any,
        newWidth: any,
        newHeight: any,
        img: any = new Image();
      img.src = url;
      // If the image is cached, the cached data is returned directly
      if (img.complete) {
        ready(img);
        load && load(img);
        // ready.call(img);
        // load && load.call(img);
        return;
      }

      width = img.width;
      height = img.height;

      // Events after loading errors
      img.onerror = function () {
        error && error(img);
        //  error && error.call(img);
        onready.end = true;
        img = img.onload = img.onerror = null;
      };

      // Picture size ready
      onready = function () {
        newWidth = img.width;
        newHeight = img.height;
        if (newWidth !== width || newHeight !== height || newWidth * newHeight > 1024) {
          // If the image has been loaded elsewhere, the usable area is detected
          ready(img);
          // ready.call(img);
          onready.end = true;
        }
      };
      onready();

      // Event of complete loading
      img.onload = function () {
        // Onload may be faster than onready within the timer time difference range
        // Here, check and ensure that the onready is executed first
        !onready.end && onready();
        load && load(img);
        // load && load.call(img);

        // IE Gif animation will cycle through onload, leaving onload empty
        img = img.onload = img.onerror = null;
      };

      // Join the queue for regular execution
      if (!onready.end) {
        list.push(onready);
        // Allow only one timer whenever possible to reduce browser performance loss
        if (intervalId === null) intervalId = setInterval(tick, 40);
      }
    };
  },
  error: (msg: any, option?: any) => {
    if (Util.toast) {
      Util.toast.error(msg, option);
    } else {
      window.alert(msg);
    }
  },
  message: (msg: any, option?: any) => {
    if (Util.toast) {
      Util.toast.success(msg, option);
    } else {
      window.alert(msg);
    }
  },
};

export const isServer = () => {
  return !(typeof window != 'undefined' && window.document);
};

const DefaultBrowseUrl = (props: {
  type?: any;
  onConfirm?: any;
  onCancel?: any;
  adding?: boolean;
  defalutValue?: any;
}) => {
  const [adding, setAdding] = React.useState(props.adding ? true : false);
  const [inputUrl, setInputUrl] = React.useState(props.defalutValue ? props.defalutValue.url : '');

  const submitUrl = () => {
    if (inputUrl == '') {
      Util.error('Please enter the url before confirm');
      return;
    }
    setAdding(false);
    props.onConfirm(inputUrl, 'input');
  };
  const handleClose = (event?: any, reason?: any) => {
    if (reason && reason === 'backdropClick') return;
    setAdding(false);
  };
  return (
    <Dialog open={adding} onClose={handleClose} fullWidth={true} maxWidth={'md'}>
      <DialogTitle>
        {props.type} url
        {
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
        }
      </DialogTitle>
      <DialogContent>
        <div className="tab-content" style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '10px' }}>{props.type}Url:</span>
          <TextField
            sx={{ width: 'calc(100% - 120px)' }}
            placeholder="Please enter the url"
            defaultValue={inputUrl}
            size="small"
            hiddenLabel
            variant="outlined"
            onChange={(e) => setInputUrl(e.target.value)}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={submitUrl} autoFocus>
          {' '}
          Submit
        </Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

//set device manually, for simulation purpose

export const sanitizeBlockData = (data: any) => {
  if (!data.style && data['style'] !== undefined) {
    delete data['style'];
  }
  return data;
};

export const generateCommonBlockData = (type: string) => {
  return { id: `a_${nanoid()}`, type: type };
};

export const getValueByPath = (path: string, blockData) => {
  const arr = path.split('.');
  if (arr.length === 1) {
    return blockData[arr[0]];
  } else if (arr.length === 2) {
    //only support settings for now
    return blockData['settings'][arr[1]];
  }
  return null;
};
