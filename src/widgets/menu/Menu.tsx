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

  const clickMenu = (identifierValue: string) => {
    setCurrrentMenu(identifierValue);
    setVariable(identifierValue);
    if (identifier) {
      setVar(identifier, identifierValue);
    }
  };

  const updateList = (listData: EntityMenu['menuList']) => {
    updateBlockByPath(path, (block: EntityMenu) => {
      block.menuList = listData;
    });
  };

  const setVariable = (identifierValue: string) => {
    setVar(
      '_' + props.blockNode.id,
      data.menuList.find((item) => item.identifier === identifierValue)?.value || '',
    );
  };

  useEffect(() => {
    if (data.menuList.length > 0) {
      setVariable(data.menuList[0].identifier);
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
