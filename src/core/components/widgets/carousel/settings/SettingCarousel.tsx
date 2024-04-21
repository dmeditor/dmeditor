import { MouseEvent, MouseEventHandler, useState } from 'react';
import { ArrowDownwardOutlined, ArrowUpwardOutlined, DeleteOutline } from '@mui/icons-material';
import { Button } from '@mui/material';
import { DME, ImageChooser, ImageSetting, useEditorStore } from 'dmeditor/index';
import { PropertyButton } from 'dmeditor/utils';

import { CarouselEntity } from '../entity';

const Carousel = (props: DME.SettingComponentProps) => {
  const {
    block: {
      data: { items: value },
    },
  } = props;

  const [showImageChooser, setShowImageChooser] = useState(false);

  const { updateSelectedBlock } = useEditorStore();

  const handleMoveUp = (_: MouseEvent<HTMLButtonElement>, index: number) => {
    updateSelectedBlock<CarouselEntity>(({ items }) => {
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
    updateSelectedBlock<CarouselEntity>(({ items }) => {
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
    updateSelectedBlock<CarouselEntity>(({ items }) => {
      if (!items) {
        console.error('Carousel items not found!');
        return;
      }
      items.splice(index, 1);
    });
  };

  const updateImage = (index: number, image: string) => {
    updateSelectedBlock<CarouselEntity>((data) => {
      data.items[index] = { ...data.items[index], image };
    });
  };

  const addImage = (imageInfo: any) => {
    updateSelectedBlock<CarouselEntity>((data) => {
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
              <div className="btn-groups">
                {index !== 0 && (
                  <PropertyButton
                    color="warning"
                    title="move up"
                    onClick={(e) => handleMoveUp(e, index)}
                  >
                    <ArrowUpwardOutlined />
                  </PropertyButton>
                )}
                {index !== value.length - 1 && (
                  <PropertyButton
                    color="warning"
                    title="move down"
                    onClick={(e) => handleMoveDown(e, index)}
                  >
                    <ArrowDownwardOutlined />
                  </PropertyButton>
                )}
                <PropertyButton
                  color="warning"
                  title="Delete"
                  onClick={(e) => handleDelete(e, index)}
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
