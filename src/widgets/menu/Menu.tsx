import { useState } from 'react';
import { BlockListRender } from 'dmeditor/core/components/block-list-render';
import { BlockRender } from 'dmeditor/core/components/block-render';
import ListWithTitle from 'dmeditor/core/components/reusable-setting/ListWithTitle';
import { useEditorStore, useLocationParams } from 'dmeditor/core/main/store';
import { DME } from 'dmeditor/core/types';
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

  const [currentMenu, setCurrrentMenu] = useState(data.menuList[0].identifier);
  const { parameters, setParameter } = useLocationParams();

  const { updateBlockByPath } = useEditorStore();

  const clickMenu = (identifier: string) => {
    setCurrrentMenu(identifier);
    setParameter(data.parameterKey, identifier);
  };

  const updateList = (listData: EntityMenu['menuList']) => {
    updateBlockByPath(path, (block: EntityMenu) => {
      block.menuList = listData;
    });
  };

  return (
    <div>
      {mode === 'edit' && active && (
        <RenderToSetting>
          <DataListSettings
            schema={[
              { name: 'Title', identifier: 'text', type: 'text' },
              { name: 'Identifier', identifier: 'identifier', type: 'text' },
            ]}
            data={data.menuList}
            onChange={updateList}
          />
          {parameters[data.parameterKey] && (
            <div>
              <label>Selected value: </label>
              <span>
                {data.parameterKey}={parameters[data.parameterKey]}
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
              onClick={() => clickMenu(item.identifier)}
              className={
                styleClasses['menuitem-link'] +
                (item.identifier === currentMenu ? ' ' + styleClasses['current'] : '')
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
