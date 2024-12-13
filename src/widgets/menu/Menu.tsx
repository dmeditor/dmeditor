import { useEffect, useState } from 'react';
import { useEditorStore, useGlobalVars } from 'dmeditor/core/main/store';
import { DME, DMEData } from 'dmeditor/core/types';
import { DataListSettings, RenderToSetting } from 'dmeditor/core/utility';

import { EntityMenu } from './enitity';
import { MenuContainer, MenuItem } from './style';

export const Menu = (props: DME.WidgetRenderProps<EntityMenu>) => {
  const {
    blockNode: { data },
    styleClasses,
    mode,
    path,
    active,
  } = props;

  const [currentMenu, setCurrrentMenu] = useState(data.menuList[0].value);
  const { vars, setVar } = useGlobalVars();

  const { updateBlockByPath } = useEditorStore();

  const clickMenu = (identifier: string) => {
    setCurrrentMenu(identifier);
    setVar(data.parameterKey, identifier);
  };

  const updateList = (listData: EntityMenu['menuList']) => {
    updateBlockByPath(path, (block: EntityMenu) => {
      block.menuList = listData;
    });
  };

  useEffect(() => {
    setVar(data.parameterKey, currentMenu);
  }, []);

  return (
    <div>
      {mode === 'edit' && active && (
        <RenderToSetting>
          <DataListSettings
            schema={[
              { name: 'Title', identifier: 'text', type: 'text' },
              { name: 'Value', identifier: 'value', type: 'text' },
            ]}
            data={data.menuList}
            onChange={updateList}
          />
          {vars[data.parameterKey] && (
            <div>
              <label>Selected value: </label>
              <span>
                {data.parameterKey}={vars[data.parameterKey]}
              </span>
            </div>
          )}
        </RenderToSetting>
      )}
      <MenuContainer className={styleClasses['container']}>
        {data.menuList.map((item) => (
          <MenuItem className={styleClasses['menuitem']}>
            <a
              href="#"
              onClick={() => clickMenu(item.value)}
              className={
                styleClasses['menuitem-link'] +
                (item.value === currentMenu ? ' ' + styleClasses['current'] : '')
              }
            >
              {item.text}
            </a>
          </MenuItem>
        ))}
      </MenuContainer>
    </div>
  );
};

//validation
export const serverSideLoad = async (block: DMEData.Block, { query }) => {
  if (query) {
    const value = query[block.data.parameterKey as string];
    if (value) {
      let hasValue = true;
      for (const item of block.data.menuList as any) {
        if (item.value === value) {
          hasValue = false;
        }
      }
      if (!hasValue) {
        throw 404; //not found
      }
    }
  }
};
