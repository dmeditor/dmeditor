import { useEffect, useState } from 'react';
import { dmeConfig } from 'dmeditor/core/config';
import { useGlobalVars } from 'dmeditor/core/main/store';
import { DME, DMEData, ServerSideLoadFunction } from 'dmeditor/core/types';
import { DataSource, RenderToSetting } from 'dmeditor/core/utility';

import { EntityContentView } from './entity';
import { Main } from './style';

export const ContentView = (props: DME.WidgetRenderProps<EntityContentView>) => {
  const {
    blockNode: {
      data: { view, dataSource, content },
    },
  } = props;

  const [currentContent, setCurrentContent] = useState(content);

  const initClient = async () => {
    const clientFetch = dmeConfig.dataSource.fetchInClient;
    if (dataSource && Object.keys(dataSource).length > 0 && clientFetch) {
      const content = await clientFetch('content-view', dataSource);
      setCurrentContent(content);
    }
  };

  useEffect(() => {
    if (!props.blockNode.serverData) {
      initClient();
    }
  }, [dataSource]);

  const { vars } = useGlobalVars();

  const Render = dmeConfig.widgets['content-view'].render;

  return (
    <div>
      {!currentContent && <Main>Please set data source.</Main>}
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

export const onServerLoad: ServerSideLoadFunction = async (block, context) => {
  const fetchInServer = dmeConfig.dataSource.fetchInServer;
  if (fetchInServer && block.data.dataSource) {
    const content = await fetchInServer(
      'content-view',
      block.data.dataSource as DMEData.DataSourceData,
      block.data,
    );
    block.data.content = content;
  }
  block.serverData = true;
};
