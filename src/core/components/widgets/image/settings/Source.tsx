import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ImageList,
  ImageListItem,
  Tab,
  Tabs,
  TextField,
} from '@mui/material';
import { setDMEditorCallback } from 'dmeditor/config/index';
import { dmeConfig, useEditorStore } from 'dmeditor/index';
import { PropertyItem } from 'dmeditor/setting-panel/Property';

import { ImageEntity } from '../Image';
import { useBooleanStore } from '../store';

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
  },
];

const BrowseImage: React.FC<{ value: string; onChange: (value: string) => void }> = (props) => {
  const { value, onChange } = props;

  return (
    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            style={{ cursor: 'pointer', border: value === item.img ? '3px solid #ff5722' : 'none' }}
            onClick={() => onChange(item.img)}
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

setDMEditorCallback({
  browseImage: BrowseImage,
});

function CheckImageBrowserValid() {
  const { callbacks } = dmeConfig;
  const { browseImage } = callbacks;

  if (browseImage) {
    return browseImage;
  }

  return null;
}

export const Source = () => {
  const { booleanValue: visible, toggleBooleanValue: toggleVisible } = useBooleanStore();
  const { getSelectedBlock, updateSelectedBlock } = useEditorStore();
  const { data } = getSelectedBlock<ImageEntity>() || {};
  const BrowseImage = CheckImageBrowserValid();

  const [value, setValue] = useState(data?.src || '');
  const [activeTab, setActiveTab] = useState<'url' | 'browse'>('browse');

  const handleClose = () => {
    toggleVisible(false);
  };

  const handleConfirm = () => {
    toggleVisible(false);
    updateSelectedBlock((blockData) => {
      blockData.src = value;
    });
  };

  if (!BrowseImage) {
    const handleSourceChange = (value: string) => {
      setValue(value);
      updateSelectedBlock((blockData) => {
        blockData.src = value;
      });
    };

    return (
      <PropertyItem label="Source">
        <TextField value={value} fullWidth onChange={(e) => handleSourceChange(e.target.value)} />
      </PropertyItem>
    );
  }

  return (
    <>
      <PropertyItem label="Source">
        <Button color="info" onClick={() => toggleVisible(true)}>
          Choose
        </Button>
      </PropertyItem>
      <Dialog title="Image" open={visible} fullWidth>
        <DialogTitle>Image</DialogTitle>
        <DialogContent>
          <Tabs value={activeTab} onChange={(_evt, value) => setActiveTab(value)}>
            <Tab label="Browse" value="browse" />
            <Tab label="URL" value="url" />
          </Tabs>
          <div style={{ padding: 8 }}>
            {activeTab === 'url' ? (
              <TextField
                label="Image Source"
                value={value}
                fullWidth
                onChange={(e) => setValue(e.target.value)}
              />
            ) : (
              <BrowseImage value={value} onChange={(value) => setValue(value)} />
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
