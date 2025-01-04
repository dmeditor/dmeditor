import { useRef, useState } from 'react';
import { CloseOutlined } from '@mui/icons-material';
import { Backdrop, Box, Button, Modal } from '@mui/material';

import { BlockListRender, BlockRender, DME, DMEData } from '../../';
import { EntityPopup } from './entity';
import { PopupCloseButtonContainer, PopupRoot } from './style';

export const Popup = (props: DME.WidgetRenderProps<EntityPopup>) => {
  const {
    blockNode: { data, children },
    styleClasses,
    path,
    mode,
  } = props;

  const [shown, setShown] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  if (!children) {
    return <></>;
  }

  const handleClose = () => {
    setShown(false);
  };

  return (
    <div>
      <div>
        <button className={styleClasses['button']} onClick={() => setShown(true)}>
          {styleClasses['button-before-icon'] && <i className={styleClasses['before-icon']} />}
          {data.buttonText}
          {styleClasses['button-after-icon'] && <i className={styleClasses['before-icon']} />}
        </button>
      </div>

      <div ref={containerRef}></div>

      <Modal
        open={shown}
        disableEnforceFocus={true}
        container={containerRef.current}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={
          props.mode === 'edit'
            ? {
                '&': {
                  right: 'var(--dmee-layout-property-width)',
                },
                '& .MuiModal-backdrop': {
                  position: 'absolute',
                },
              }
            : {}
        }
      >
        <PopupRoot className={styleClasses['container']} size={data.modalSize}>
          <a
            href="#"
            className={styleClasses['close-icon']}
            style={{ float: 'right' }}
            onClick={(e) => {
              e.preventDefault();
              handleClose();
            }}
          >
            <CloseOutlined />
          </a>
          <BlockListRender blockData={children || []} path={path} mode={mode} />
          <PopupCloseButtonContainer>
            <a
              href="#"
              className={styleClasses['close-button']}
              onClick={(e) => {
                e.preventDefault();
                handleClose();
              }}
            >
              {styleClasses['close-button-before-icon'] && (
                <i className={styleClasses['close-button-before-icon']} />
              )}
              Close
            </a>
          </PopupCloseButtonContainer>
        </PopupRoot>
      </Modal>
      <div></div>
    </div>
  );
};
