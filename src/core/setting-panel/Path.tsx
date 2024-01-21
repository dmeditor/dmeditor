import { useEffect, useState } from 'react';
import { css } from '@emotion/css';
import { KeyboardArrowRight } from '@mui/icons-material';

import { PathItem } from './style';

export interface PathItem {
  text: string;
  id: string;
  level: number;
  disableClick?: boolean;
}

export interface PathProps {
  pathArray: Array<PathItem>;
  onSelect: (index: number) => void;
}

export const Path = (props: PathProps) => {
  const [selected, setSelected] = useState(-1);

  useEffect(() => {
    setSelected(-1);
  }, [props.pathArray]);

  return (
    <div>
      {props.pathArray.map((item, index) => (
        <>
          <PathItem
            canClick={!item.disableClick}
            selected={selected === index}
            onClick={() => {
              if (!item.disableClick) {
                setSelected(index);
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
