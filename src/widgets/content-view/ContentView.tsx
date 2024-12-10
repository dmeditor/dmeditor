import { useLocationParams } from 'dmeditor/core/main/store';
import { DME } from 'dmeditor/core/types';

import { EntityContentView } from './entity';
import { Main } from './style';

export const ContentView = (props: DME.WidgetRenderProps<EntityContentView>) => {
  const {
    blockNode: {
      data: { parameterKey },
    },
  } = props;

  const { parameters } = useLocationParams();

  return (
    <div>
      <Main>
        <div>Here will show dynamic content.</div>
        {parameters[parameterKey] && (
          <div>
            Content where {parameterKey} = {parameters[parameterKey]}
          </div>
        )}
      </Main>
    </div>
  );
};
