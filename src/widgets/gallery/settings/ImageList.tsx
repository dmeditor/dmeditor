import { MouseEvent, useState } from 'react';
import { css } from '@emotion/css';
import { ArrowDownwardOutlined, ArrowUpwardOutlined, DeleteOutline } from '@mui/icons-material';
import { Button, TextField } from '@mui/material';
import type { DME } from 'dmeditor/index';

import { i18n, ImageChooser, ImageSetting, useEditorStore } from '../../..';
import { PropertyButton } from '../../../core/utils';
import { GalleryEntity } from '../entity';

const ImageList = (props: DME.SettingComponentProps<GalleryEntity>) => {
  const {
    block: {
      data: { items: value },
    },
    blockPath,
  } = props;

  const [showImageChooser, setShowImageChooser] = useState(false);
  const [addedFrom, setAddedFrom] = useState<'start' | 'end'>('end');

  const { updateBlockByPath } = useEditorStore();

  const handleMoveUp = (_: MouseEvent<HTMLButtonElement>, index: number) => {
    updateBlockByPath<GalleryEntity>(blockPath, ({ items }) => {
      if (!items) {
        console.error('Carousel items not found!');
        return;
      }
      const temp = items[index];
      items[index] = items[index - 1];
      items[index - 1] = temp;
    });
  };

  const handleMoveDown = (_: MouseEvent<HTMLButtonElement>, index: number) => {
    updateBlockByPath<GalleryEntity>(blockPath, ({ items }) => {
      if (!items) {
        console.error('Carousel items not found!');
        return;
      }
      const temp = items[index];
      items[index] = items[index + 1];
      items[index + 1] = temp;
    });
  };

  const handleDelete = (_: MouseEvent<HTMLButtonElement>, index: number) => {
    updateBlockByPath<GalleryEntity>(blockPath, ({ items }: { items: any }) => {
      if (!items) {
        console.error('Carousel items not found!');
        return;
      }
      items.splice(index, 1);
    });
  };

  const updateImage = (index: number, image: string) => {
    updateBlockByPath<GalleryEntity>(blockPath, (data) => {
      data.items[index] = { ...data.items[index], image };
    });
  };

  const updateTitle = (index: number, title: string) => {
    updateBlockByPath<GalleryEntity>(blockPath, (data) => {
      data.items[index] = { ...data.items[index], title: title };
    });
  };

  const addImage = (imageInfo: any) => {
    const imageList = imageInfo.map((item: any) => ({ image: item.src }));

    updateBlockByPath<GalleryEntity>(blockPath, (data) => {
      if (addedFrom === 'end') {
        data.items = [...data.items, ...imageList];
      } else if (addedFrom === 'start') {
        data.items = [...imageList, ...data.items];
      }
    });
  };

  return (
    <div>
      {Array.isArray(value) && value.length > 0 && (
        <div
          className={css`
            margin-bottom: 5px;
          `}
        >
          <Button
            size="small"
            variant="outlined"
            onClick={() => {
              setAddedFrom('start');
              setShowImageChooser(true);
            }}
          >
            {i18n('Add')}
          </Button>
        </div>
      )}
      {Array.isArray(value)
        ? value.map((item, index) => (
            <div
              className={css`
                display: flex;
                gap: 5px;
              `}
            >
              <ImageSetting
                value={{ src: item.image }}
                onChange={(info) => {
                  updateImage(index, info.src);
                }}
              />
              <div
                className={css`
                  flex: 1;
                `}
              >
                <TextField
                  size="small"
                  placeholder="Caption"
                  value={item.title}
                  onChange={(e) => updateTitle(index, e.target.value)}
                />
              </div>
              <div className="btn-groups">
                {index !== 0 && (
                  <PropertyButton
                    color="warning"
                    title="move up"
                    onClick={(e: MouseEvent<HTMLButtonElement>) => handleMoveUp(e, index)}
                  >
                    <ArrowUpwardOutlined />
                  </PropertyButton>
                )}
                {index !== value.length - 1 && (
                  <PropertyButton
                    color="warning"
                    title="move down"
                    onClick={(e: MouseEvent<HTMLButtonElement>) => handleMoveDown(e, index)}
                  >
                    <ArrowDownwardOutlined />
                  </PropertyButton>
                )}
                <PropertyButton
                  color="warning"
                  onClick={(e: MouseEvent<HTMLButtonElement>) => handleDelete(e, index)}
                >
                  <DeleteOutline />
                </PropertyButton>
              </div>
            </div>
          ))
        : null}
      <div>
        <Button
          size="small"
          variant="outlined"
          onClick={() => {
            setAddedFrom('end');
            setShowImageChooser(true);
          }}
        >
          {i18n('Add')}
        </Button>
      </div>
      <ImageChooser
        visible={showImageChooser || value.length === 0}
        value={[]}
        multiple
        onConfirm={addImage}
        onCancel={() => setShowImageChooser(false)}
      />
    </div>
  );
};

export { ImageList };
