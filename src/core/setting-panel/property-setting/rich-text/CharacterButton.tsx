import { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/css';
import { EmojiEmotionsOutlined } from '@mui/icons-material';
import {
  Box,
  ClickAwayListener,
  Collapse,
  Dialog,
  DialogContent,
  DialogTitle,
  Fade,
  Paper,
  Popper,
} from '@mui/material';
import { dmeConfig } from 'dmeditor/core/config';
import { Transforms } from 'slate';
import { useSlate } from 'slate-react';

import { Button } from './helper';

const CharacterButton = () => {
  const [panelShown, setPanelShown] = useState(false);
  const editor = useSlate();

  const buttonRef = useRef(null);

  const showPanel = () => {
    setPanelShown(!panelShown);
  };

  const insert = (value: string) => {
    if (!value) return;
    Transforms.insertNodes(editor, { text: value });
    setPanelShown(false);
  };

  return (
    <>
      <Button ref={buttonRef} title="Insert character" onClick={showPanel}>
        <EmojiEmotionsOutlined />
      </Button>
      <Popper open={panelShown} anchorEl={buttonRef.current} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <div>
              <ClickAwayListener onClickAway={() => setPanelShown(false)}>
                <Paper elevation={2} sx={{ p: 1 }}>
                  <div
                    className={css`
                      display: grid;
                      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
                    `}
                  >
                    {dmeConfig.editor.characters.map((item) => (
                      <div
                        className={css`
                          cursor: pointer;
                          padding: 4px;
                          text-align: center;
                          font-size: 20px;
                          &:hover {
                            background: #f0f0f0;
                          }
                        `}
                        onClick={() => insert(item)}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </Paper>
              </ClickAwayListener>
            </div>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export { CharacterButton };
