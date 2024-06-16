import ReactDOMServer from 'react-dom/server';
import { type Descendant } from 'slate';

import { MiniText } from '..';

export const richTextJsonToHTML = (value: Descendant[]) => {
  return ReactDOMServer.renderToStaticMarkup(
    <MiniText mode="view" value={value} onValueChange={() => {}} />,
  );
};
