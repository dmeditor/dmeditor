import React from 'react';
import { Button } from '@mui/material';

export const EditImage = (props: { image; onChange: (image) => void }) => {
  return (
    <Button
      color="info"
      onClick={() => {
        window.alert('Will change image');
        props.onChange({
          ...props.image,
          src: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
        });
      }}
    >
      Edit
    </Button>
  );
};
