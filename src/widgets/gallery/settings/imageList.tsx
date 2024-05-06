import { MouseEvent, useState } from 'react';
import { ArrowDownwardOutlined, ArrowUpwardOutlined, DeleteOutline } from '@mui/icons-material';
import { Button } from '@mui/material';
import type { DME } from 'dmeditor/index';
import { ImageChooser, ImageSetting, useEditorStore } from 'dmeditor/index';

import { PropertyButton } from '../../../core/utils';
import { GalleryEntity } from '../entity';

const ImageList = (props: DME.SettingComponentProps<GalleryEntity>) => {
  const {
    block: {
      data: { items: value },
    },
  } = props;

  const [showImageChooser, setShowImageChooser] = useState(false);

  const { updateSelectedBlock } = useEditorStore();

  const handleMoveUp = (_: MouseEvent<HTMLButtonElement>, index: number) => {
    updateSelectedBlock<GalleryEntity>(({ items }) => {
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
    updateSelectedBlock<GalleryEntity>(({ items }) => {
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
    updateSelectedBlock<GalleryEntity>(({ items }: { items: any }) => {
      if (!items) {
        console.error('Carousel items not found!');
        return;
      }
      items.splice(index, 1);
    });
  };

  const updateImage = (index: number, image: string) => {
    updateSelectedBlock<GalleryEntity>((data) => {
      data.items[index] = { ...data.items[index], image };
    });
  };

  const addImage = (imageInfo: any) => {
    const imageList = imageInfo.map((item: any) => ({ image: item.src }));

    updateSelectedBlock<GalleryEntity>((data) => {
      data.items = [...data.items, ...imageList];
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
