import { useEffect, useState } from 'react';
import { dmeConfig } from 'dmeditor/core/config';
import { useGlobalVars } from 'dmeditor/core/main/store';
import { DME, DMEData } from 'dmeditor/core/types';

import { EntityContentView } from './entity';
import { Main } from './style';

export const ContentView = (props: DME.WidgetRenderProps<EntityContentView>) => {
  const {
    blockNode: {
      data: { view, dataSource, content },
    },
  } = props;

  const [currentContent, setCurrentContent] = useState(content);

  const { vars } = useGlobalVars();

  const dependency = dataSource?.sourceData;

  const initClient = async () => {
    const clientFetch = dmeConfig.dataSource.fetchInClient;
    if (dataSource && Object.keys(dataSource).length > 0 && clientFetch) {
      const dependencyValue = dataSource.sourceData
        ? vars['_' + dataSource.sourceData.id]
        : undefined;
      const content = await clientFetch('content-view', dataSource, {
        dependencyValue: dependencyValue,
      });
      setCurrentContent(content);
    }
  };

  useEffect(() => {
    if (!props.blockNode.serverData) {
      initClient();
    }
  }, [dataSource, vars['_' + dependency?.id || '']]);

  const Render = dmeConfig.widgets['content-view']?.render;

  return (
    <div>
      {!dataSource && <Main>Please set data source.</Main>}
      {!currentContent && <Main>Not content found</Main>}
      {currentContent && (
        <>
          {!Render && (
            <Main>
              <div>Need to implement render on content-view.</div>
            </Main>
          )}

          {Render && (
            <>
              <Render data={currentContent} view={view} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export const onServerLoad: DME.ServerSideLoadFunction<EntityContentView> = async (
  block,
  context,
) => {
  const fetchInServer = dmeConfig.dataSource.fetchInServer;
  if (fetchInServer && block.data.dataSource) {
    const content = await fetchInServer(
      'content-view',
      block.data.dataSource as DMEData.DataSourceData,
      context,
    );
    block.data.content = content;
    block.data.dataSource = undefined; // do not set to client
  }
  block.serverData = true;
};
