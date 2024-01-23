import { useEffect, useState } from 'react';
import { css } from '@emotion/css';
import { KeyboardArrowRight } from '@mui/icons-material';

import { PathItem } from './style';

export interface PathItem {
  text: string;
  id: string;
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
  }, []);

  return (
    <div>
      {props.pathArray.map((item, level) => (
        <>
          <PathItem
            key={item.id}
            canClick={!item.disableClick&&(selected !== level)}
            selected={selected === level}
            onClick={() => {
              if (!item.disableClick && selected !== level) {
                setSelected(level);
                props.onSelect(level);
              }
            }}
          >
            {item.text}
          </PathItem>
          {level !== props.pathArray.length - 1 && <KeyboardArrowRight fontSize="small" />}
        </>
      ))}
    </div>
  );
};
