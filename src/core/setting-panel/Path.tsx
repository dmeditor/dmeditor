import { useEffect, useState } from 'react';
import { css } from '@emotion/css';
import { KeyboardArrowRight } from '@mui/icons-material';

import { PathItem } from './style';

export interface PathItem {
  text: string;
  id: string;
  disableClick?: boolean;
  selected?:boolean
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
    <div>
      {props.pathArray.map((item, index) => (
        <>
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
        </>
      ))}
    </div>
  );
};
