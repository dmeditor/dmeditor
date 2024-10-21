import ReactDOMServer from 'react-dom/server';
import { type Descendant } from 'slate';

import { MiniRichText } from '..';

export const richTextJsonToHTML = (value: Descendant[]) => {
  return ReactDOMServer.renderToStaticMarkup(
    <MiniRichText mode="view" value={value} onValueChange={() => {}} />,
  );
};
