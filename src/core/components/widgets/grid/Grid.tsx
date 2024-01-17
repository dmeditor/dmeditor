import { useEffect, useRef, useState } from 'react';
import { GridViewOutlined, TitleOutlined } from '@mui/icons-material';

import { StyleSettings } from '../../../../styles/StyleSettings';
import { ToolDefinition, ToolRenderProps } from '../../../../ToolDefinition';
import { PropertyItem, Ranger, Util } from '../../../utils';
import { getCommonBlockCss } from '../../block/Block';
import { BlockList } from '../../block-list';
import { BlockProperty } from '../../block-property';
import { CommonSettings } from 'Core/setting-panel/common-setting';

export const ContainerGrid = (props: any) => {
  const [children, setChildren] = useState(props.blockdata.children);
  const [commonSettings, setCommonSettings] = useState(props.blockdata.setting?.style || {});
  const [isChange, setIsChange] = useState(false);
  const [styleIdentifier, setStyleIdentifier] = useState(props.blockdata.style || '');
  const [columns, setColumns] = useState(props.blockdata.settings?.columns || 1);

  useEffect(() => {
    if (isChange) {
      props.onChange({
        ...props.blockdata,
        style: styleIdentifier,
        children: children,
        settings: { columns: columns, style: commonSettings },
      });
      setIsChange(false);
    }
  }, [isChange]);

  return (
    <>
      {props.active && (
        <BlockProperty blocktype="grid" inBlock={props.inBlock}>
          <PropertyItem label="Columns">
            <Ranger
              value={columns}
              min={1}
              max={5}
              onChange={(v) => {
                setColumns(v);
                setIsChange(true);
              }}
            />
          </PropertyItem>
          {Util.renderCustomProperty(props.blockdata)}
          <StyleSettings
            styleIdentifier={props.blockdata.style || ''}
            blocktype="grid"
            onChange={(identifier) => {
              setStyleIdentifier(identifier);
              setIsChange(true);
            }}
          />
          <div>
            <CommonSettings
              commonSettings={commonSettings}
              settingList={[]}
              onChange={(settings) => {
                setCommonSettings(settings);
                setIsChange(true);
              }}
              onDelete={props.onDelete}
            />
          </div>
        </BlockProperty>
      )}
      <div style={commonSettings} className={getCommonBlockCss('grid', styleIdentifier)}>
        <BlockList
          adding={props.adding}
          columns={columns}
          view={props.view}
          allowedType={['collapsable_text', 'list', 'text']}
          onChange={(data) => {
            setChildren(data);
            setIsChange(true);
          }}
          active={props.active}
          list={children}
          onActivate={() => {}}
        />
      </div>
    </>
  );
};

export const toolContainerGrid: ToolDefinition = {
  type: 'grid',
  isComposited: false,
  name: 'Grid',
  menu: { category: 'layout', icon: <GridViewOutlined /> },
  initData: () => {
    return {
      type: 'grid',
      settings: { columns: 2 },
      children: [],
    };
  },
  render: (props: ToolRenderProps) => <ContainerGrid {...props} />,
};
