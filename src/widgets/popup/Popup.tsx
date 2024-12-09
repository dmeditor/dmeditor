import { useRef, useState } from 'react';
import { CloseOutlined } from '@mui/icons-material';
import { Backdrop, Box, Button, Modal } from '@mui/material';

import { BlockListRender, BlockRender, DME, DMEData } from '../../';
import { EntityPopup } from './entity';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: '#ffffff',
  border: '1px solid #333333',
  boxShadow: '1px 2px 3px #666666',
  padding: '10px',
};

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
        <div className={styleClasses['container']} style={modalStyle}>
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
          <div>
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
          </div>
        </div>
      </Modal>
      <div></div>
    </div>
  );
};
