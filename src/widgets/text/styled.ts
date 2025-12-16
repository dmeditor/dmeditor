import styled from '@emotion/styled';

import { EntityText } from './entity';

type SettingsType = EntityText['settings'];
export const TextContainer = styled.div((props: SettingsType) => {
  return {
    ...(props?.color && { color: props.color }),
    'p:first-of-type': { marginTop: 0 },
    'p:last-of-type': { marginBottom: 0 },
    img: { maxWidth: '100%' },
    '&::after': { content: '""', display: 'block', clear: 'both' },
  };
});
