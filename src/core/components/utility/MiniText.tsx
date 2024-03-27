import * as React from 'react';

import { Text } from '../widgets/text';

const MiniText = (props: { property: string; value: any }) => {
  return <Text {...props} />;
};

export default MiniText;
