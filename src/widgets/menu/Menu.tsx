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

  const [currentMenu, setCurrrentMenu] = useState(data.menuList[0].identifier);
  const { vars, setVar } = useGlobalVars();

  const { updateBlockByPath } = useEditorStore();

  const identifier = data.settings?.general?.identifier || '';

  const selectMenu = (identifierValue: string) => {
    setCurrrentMenu(identifierValue);
    setInternalVar(identifierValue);
  };

  const updateList = (listData: EntityMenu['menuList']) => {
    updateBlockByPath(path, (block: EntityMenu) => {
      block.menuList = listData;
    });
  };

  const setInternalVar = (identifierValue: string) => {
    setVar(
      '_' + props.blockNode.id,
      data.menuList.find((item) => item.identifier === identifierValue)?.value || '',
    );
  };

  useEffect(() => {
    if (data.menuList.length > 0) {
      selectMenu(data.loadedMenu || data.menuList[0].identifier);
    }
  }, []);

  return (
    <div>
      {mode === 'edit' && active && (
        <RenderToSetting>
          <DataListSettings
            schema={[
              { name: 'Text', identifier: 'text', type: 'text' },
              { name: 'Identifier', identifier: 'identifier', type: 'text' },
              { name: 'Value', identifier: 'value', type: 'text' },
            ]}
            data={data.menuList}
            onChange={updateList}
          />
          {vars[identifier] && (
            <div>
              <label>Selected value: </label>
              <span>
                {identifier}={vars[identifier]}
              </span>
            </div>
          )}
        </RenderToSetting>
      )}
      <MenuContainer className={styleClasses['container']} color={data.settings?.color}>
        {data.menuList.map((item) => (
          <MenuItem className={styleClasses['menuitem']} direction={data.settings?.direction}>
            {/** todo use callback & fix preview - preview should use edit way */}
            <a
              href={'./?' + identifier + '=' + item.identifier}
              onClick={(e) => {
                if (mode === 'edit') {
                  e.preventDefault();
                  selectMenu(item.identifier);
                } else {
                  location.search = '?' + identifier + '=' + item.identifier;
                  return false;
                }
              }}
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

//validation
export const serverSideLoad: DME.ServerSideLoadFunction<EntityMenu> = async (block, { query }) => {
  if (query) {
    const menuIdentifier = query[block.data.settings?.general?.identifier || ''];
    if (menuIdentifier) {
      const menu = block.data.menuList.find((item) => item.identifier === menuIdentifier);
      if (!menu) {
        throw 404; //not found
      }
      block.data.loadedMenu = menu.identifier;
      return { value: menu.value };
    } else {
      const menu = block.data.menuList[0];
      return { value: menu.value };
    }
  }
  return {};
};
