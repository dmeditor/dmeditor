import { dmeConfig } from 'dmeditor/core/config';
import { useLocationParams } from 'dmeditor/core/main/store';
import { DME } from 'dmeditor/core/types';

import { EntityContentView } from './entity';
import { Main } from './style';

export const ContentView = (props: DME.WidgetRenderProps<EntityContentView>) => {
  const {
    blockNode: {
      data: { parameterKey, view },
    },
  } = props;

  const { parameters } = useLocationParams();

  const Render = dmeConfig.widgets['content-view'].render;

  return (
    <div>
      {!Render && (
        <Main>
          <div>
            Here will show dynamic content where {parameterKey} is{' '}
            {parameters[parameterKey] || '<not set>'}
          </div>
        </Main>
      )}
      {Render && (
        <>
          <Render block={props.blockNode} view={view} />
        </>
      )}
    </div>
  );
};
