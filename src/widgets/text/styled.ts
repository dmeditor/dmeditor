import styled from '@emotion/styled';

import { EntityText } from './entity';

type SettingsType = EntityText['settings'];
export const TextContainer = styled.div((props: SettingsType) => {
  return {
    ...(props?.color && { color: props.color }),
    'p:first-child': { 'margin-top': 0 },
    'p:last-child': { 'margin-bottom': 0 },
    img: { 'max-width': '100%' },
    '&::after': { content: '""', display: 'block', clear: 'both' },
  };
});
