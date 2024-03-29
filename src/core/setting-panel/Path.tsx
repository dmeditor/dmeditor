import { useEffect, useState } from 'react';
import { css } from '@emotion/css';
import { KeyboardArrowRight } from '@mui/icons-material';

import { PathContainer, PathItem } from './style';

export interface PathItem {
  text: string;
  id: string;
  disableClick?: boolean;
  selected?:boolean;
  dataPath: Array<number>
}

export interface PathProps {
  pathArray: Array<PathItem>;
  selectedId: string;
  onSelect: (index: number) => void;
}

export const Path = (props: PathProps) => {

  const [selectedId, setSelectedId] = useState(props.selectedId)

  useEffect(() => {
    setSelectedId(props.selectedId);
  }, [props.selectedId]);

  return (
    <PathContainer>
      {props.pathArray.map((item, index) => (
        <span key={item.id}>
          <PathItem
            key={item.id}
            canClick={!item.disableClick&&(selectedId !== item.id)}
            selected={selectedId === item.id}
            onClick={() => {
              if (!item.disableClick && selectedId !== item.id) {
                setSelectedId(item.id);
                props.onSelect(index);
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
