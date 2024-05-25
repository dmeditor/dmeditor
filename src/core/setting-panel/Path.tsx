import { useEffect, useState } from 'react';
import { css } from '@emotion/css';
import { KeyboardArrowRight } from '@mui/icons-material';

import { PathContainer, PathItem } from './style';

export interface PathItem {
  text: string;
  id: string;
  selected?: boolean;
  dataPath: Array<number>;
}

export interface PathProps {
  pathArray: Array<PathItem>;
  onSelect: (item: PathItem) => void;
}

export const Path = (props: PathProps) => {
  return (
    <PathContainer>
      {props.pathArray.map((item, index) => (
        <span key={item.dataPath.join(',')}>
          <PathItem
            canClick={!item.selected}
            selected={item.selected}
            onClick={() => {
              if (!item.selected) {
                props.onSelect(item);
              }
            }}
          >
            {item.text}
          </PathItem>
          {index !== props.pathArray.length - 1 && <KeyboardArrowRight fontSize="small" />}
        </span>
      ))}
    </PathContainer>
  );
};
