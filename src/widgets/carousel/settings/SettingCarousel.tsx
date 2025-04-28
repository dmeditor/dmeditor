import { MouseEvent, useState } from 'react';
import { ArrowDownwardOutlined, ArrowUpwardOutlined, DeleteOutline } from '@mui/icons-material';
import { Button, Input, TextField } from '@mui/material';

import { ImageChooser, ImageSetting, useEditorStore } from '../../..';
import type { DME } from '../../..';
import { PropertyButton } from '../../../core/utils';
import { CarouselEntity } from '../entity';

const Carousel = (props: DME.SettingComponentProps) => {
  const {
    block: {
      data: { items: value },
    },
    blockPath,
  } = props;

  const [showImageChooser, setShowImageChooser] = useState(false);

  const { updateBlockByPath } = useEditorStore();

  const handleMoveUp = (_: MouseEvent<HTMLButtonElement>, index: number) => {
    updateBlockByPath<CarouselEntity>(blockPath, ({ items }) => {
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
    updateBlockByPath<CarouselEntity>(blockPath, ({ items }) => {
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
    updateBlockByPath<CarouselEntity>(blockPath, ({ items }: { items: any }) => {
      if (!items) {
        console.error('Carousel items not found!');
        return;
      }
      items.splice(index, 1);
    });
  };

  const updateImage = (index: number, image: string) => {
    updateBlockByPath<CarouselEntity>(blockPath, (data) => {
      data.items[index] = { ...data.items[index], image };
    });
  };

  const updateProperty = (index: number, name: string, value: string) => {
    updateBlockByPath<CarouselEntity>(blockPath, (data) => {
      data.items[index] = { ...data.items[index], [name]: value };
    });
  };

  const addImage = (imageInfo: any) => {
    updateBlockByPath<CarouselEntity>(blockPath, (data) => {
      data.items = [...data.items, { image: imageInfo[0].src, link: '' }];
    });
  };

  return (
    <div>
      {Array.isArray(value)
        ? value.map((item, index) => (
            <div className="flex justify-between">
              <ImageSetting
                value={{ src: item.image }}
                onChange={(info) => {
                  updateImage(index, info.src);
                }}
              />
              <div>
                <TextField
                  title={item.link}
                  sx={{ width: 120 }}
                  placeholder="Link"
                  size="small"
                  defaultValue={item.link}
                  onBlur={(e) => {
                    updateProperty(index, 'link', e.target.value);
                  }}
                />
              </div>
              <div>
                <TextField
                  title={item.title}
                  placeholder="Title"
                  sx={{ width: 50 }}
                  size="small"
                  defaultValue={item.title}
                  onBlur={(e) => {
                    updateProperty(index, 'title', e.target.value);
                  }}
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
                  title="Delete"
                  onClick={(e: MouseEvent<HTMLButtonElement>) => handleDelete(e, index)}
                >
                  <DeleteOutline />
                </PropertyButton>
              </div>
            </div>
          ))
        : null}
      <Button size="small" variant="outlined" onClick={() => setShowImageChooser(true)}>
        Add
      </Button>
      <ImageChooser
        visible={showImageChooser}
        value={[{ src: '', id: '' }]}
        onConfirm={addImage}
        onCancel={() => setShowImageChooser(false)}
      />
    </div>
  );
};

export default Carousel;
