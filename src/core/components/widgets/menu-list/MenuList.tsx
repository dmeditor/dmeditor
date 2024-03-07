import { useState } from 'react';
import { css } from '@emotion/css';
import { Input } from '@mui/material';
import { PropertyTab } from 'dmeditor/components/property-tab';
import { useTranslation } from 'react-i18next';

import {
  getAllTemplates,
  getCategories,
  getDef,
  getPopularBlocktypes,
  getToolDefinitions,
} from '../../../../ToolDefinition';
import { menulistCss } from './MenuList.css';

export const MenuList = (props: { onSelect: any; allowedType?: string[] }) => {
  const [blockCategory] = useState(getCategories());
  const [registeredTypes] = useState(getToolDefinitions());
  const [templates] = useState(getAllTemplates());
  const { t, i18n } = useTranslation();

  let names: Array<{ type: string; name: string }> = [];
  for (let blockType of Object.keys(registeredTypes)) {
    if (props.allowedType && !props.allowedType.includes(blockType)) {
      continue;
    }
    const toolType = registeredTypes[blockType];
    if (toolType.name) {
      names = [...names, { type: blockType, name: t(toolType.name, { ns: 'blocktype' }) }];
    }
  }

  const [list, setList] = useState(names);

  const search = (e: any) => {
    let input = e.target.value.toLowerCase();
    let list = names.filter((item) => item.name.toLowerCase().includes(input));
    setList(list);
  };

  const popularBlocktypes = getPopularBlocktypes();

  const renderBlockType = (blocktype: string) => {
    return (
      <div className="moreblock" onClick={() => props.onSelect(blocktype)}>
        <table style={{ width: '100%' }}>
          <tbody>
            <tr>
              <td style={{ width: '28px' }}>{registeredTypes[blocktype].menu?.icon}</td>
              <td style={{ textAlign: 'left' }}>
                {t(registeredTypes[blocktype].name, { ns: 'blocktype' })}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className={menulistCss()} style={{ background: 'white' }}>
      <div style={{ fontSize: '18px', padding: '10px 4px' }}>
        {t('Please choose a block type:')}
      </div>
      <PropertyTab
        tabs={[
          {
            title: t('Common'),
            element: (
              <div>
                {popularBlocktypes.map((blocktype) => (
                  <div key={blocktype}>{renderBlockType(blocktype)}</div>
                ))}
              </div>
            ),
          },
          {
            title: t('Blocks'),
            element: (
              <div>
                <div style={{ background: 'white' }}>
                  <Input
                    fullWidth
                    placeholder={t('Type to search')}
                    onChange={search}
                    autoFocus
                    style={{ padding: '6px' }}
                  />
                </div>
                <div className="menu-blocktype">
                  {blockCategory.map((category: any) => (
                    <div key={category.identifier}>
                      {list
                        .filter(
                          (item) =>
                            registeredTypes[item.type].menu?.category == category.identifier,
                        )
                        .map((blockType, blockindex) => (
                          <div key={blockType.type}>
                            {blockindex == 0 && (
                              <div
                                style={{ padding: '5px 0px', color: '#4f4f4f', margin: '5px 10px' }}
                              >
                                {category.text}
                              </div>
                            )}
                            {renderBlockType(blockType.type)}
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              </div>
            ),
          },
          {
            title: t('Templates'),
            element: (
              <div>
                {templates.map((template: any) => (
                  <div className="moreblock" key={template.templateDef.id}>
                    <table style={{ width: '100%' }}>
                      <tbody>
                        <tr onClick={() => props.onSelect(template.tool, template.templateDef.id)}>
                          <td style={{ width: '28px' }}>
                            {template.templateDef.icon
                              ? template.templateDef.icon
                              : template.toolDef.menu.icon}
                          </td>
                          <td style={{ textAlign: 'left' }}>
                            {template.templateDef.name}
                            <span
                              className={css`
                                font-size: 95%;
                                color: #999999;
                                margin-left: 5px;
                              `}
                            >
                              {template.toolDef.name}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            ),
          },
        ]}
        active={0}
      />
    </div>
  );
};
