import styled from '@emotion/styled';

import { EntityText } from './entity';

type SettingsType = EntityText['settings'];
export const TextContainer = styled.div((props: SettingsType) => {
  return { ...(props?.color && { color: props.color }) };
});
