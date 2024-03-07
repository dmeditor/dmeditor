import { useEffect, useState } from 'react';
import { ImageOutlined } from '@mui/icons-material';
import { Button, Checkbox } from '@mui/material';
import { BlockProperty } from 'dmeditor/components/block-property';
import { BlockSettings } from 'dmeditor/setting-panel/BlockSettings';

import { StyleSettings } from '../../../../styles/StyleSettings';
import { ToolDefinition, ToolRenderProps } from '../../../../ToolDefinition';
import { getCommonBlockCss, getStyleCss } from '../../../main/renderer/BlockRender';
import { PickColor, PropertyGroup, PropertyItem, Ranger, Util } from '../../../utils';

export const BlockImage = (props: ToolRenderProps) => {
  const [fullScreen, setFullScreen] = useState(props.blockdata.settings?.fullScreen ? true : false);
  const [adding, setAdding] = useState(props.adding ? true : false);
  const [imageUrl, setImageUrl] = useState(
    props.blockdata.source && props.blockdata.source.sourceType === 'select'
      ? Util.getImageUrl(props.blockdata.source.sourceData.image)
      : props.blockdata.data.url,
  );
  const [text, setText] = useState(props.blockdata.data.text);
  const [commonSettings, setCommonSettings] = useState(props.blockdata.settings?.style || {});
  const [borderWidth, setBorderWidth] = useState(props.blockdata?.settings?.borderWidth || 0);
  const [borderColor, setBorderColor] = useState(
    props.blockdata?.settings?.borderColor || 'transparent',
  );
  const [styleIdentifier, setStyleIdentifier] = useState(props.blockdata.style);
  const submitImage = (val: any, type: string) => {
    let data = props.blockdata;
    if (type === 'input') {
      setImageUrl(val);
      props.onChange({
        ...data,
        data: { url: val, text: text },
        source: { sourceType: type },
        settings: { style: commonSettings, fullScreen: fullScreen },
      });
    } else {
      // let url='{image:'+val.id+'}'
      let url = Util.getImageUrl(val.image);
      setImageUrl(url);
      props.onChange({
        ...data,
        data: { url: url, text: text },
        source: { sourceType: type, sourceData: val },
        settings: { style: commonSettings, fullScreen: fullScreen },
      });
    }
  };
  const handleClickOpen = () => {
    setAdding(true);
    setAdding(false);
    setTimeout(() => {
      setAdding(true);
    }, 10);
  };
  // useEffect(()=>{
  //   if( ids.length > 0){
  //     FetchWithAuth(process.env.REACT_APP_REMOTE_URL+'/content/list/image?cid='+ids.join(',')).then((data:any)=>{
  //       setSelectsource(data.data.list);
  //     });
  // }
  // },[])
  useEffect(() => {
    props.onChange({
      ...props.blockdata,
      style: styleIdentifier,
      data: { ...props.blockdata.data, text: text },
      settings: {
        ...props.blockdata.settings,
        style: commonSettings,
        fullScreen: fullScreen,
        borderWidth: borderWidth,
        borderColor: borderColor,
      },
    });
  }, [text, fullScreen, borderWidth, borderColor, commonSettings, styleIdentifier]);

  return (
    <div
      className={getCommonBlockCss('image', styleIdentifier) + (fullScreen ? ' fullscreen' : '')}
      style={{ ...commonSettings, border: `${borderWidth}px solid ${borderColor}` }}
    >
      {adding && (
        <div>
          <Util.renderBroseURL type={'Image'} onConfirm={submitImage} adding={adding} />
        </div>
      )}
      {props.active && (
        <BlockProperty blocktype="image" inBlock={props.inBlock}>
          {!text && (
            <PropertyItem label="Description" autoWidth>
              <Button onClick={() => setText('Description')}>Add description</Button>
            </PropertyItem>
          )}
          {!props.inBlock && (
            <PropertyItem label="Full screen" autoWidth>
              <Checkbox
                checked={fullScreen}
                onChange={(e, checked: boolean) => {
                  setFullScreen(checked);
                }}
              />
            </PropertyItem>
          )}
          <PropertyItem label="Source">
            <Button onClick={handleClickOpen}>Choose</Button>
          </PropertyItem>
          <PropertyGroup header="Border">
            <PropertyItem label="Width">
              <Ranger
                min={0}
                max={10}
                step={1}
                onChange={(v: number) => setBorderWidth(v)}
                defaultValue={borderWidth ? borderWidth : '0'}
              />
            </PropertyItem>
            <PropertyItem label="Color">
              <PickColor
                color={borderColor ? borderColor : 'transparent'}
                onChange={(v: any) => setBorderColor(v)}
              />
            </PropertyItem>
          </PropertyGroup>
          {Util.renderCustomProperty(props.blockdata)}
          <StyleSettings
            styleIdentifier={props.blockdata.style || ''}
            blocktype="image"
            onChange={(identifier: string) => setStyleIdentifier(identifier)}
          />
          <div>
            <BlockSettings
              commonSettings={commonSettings}
              onChange={(settings) => setCommonSettings(settings)}
              onDelete={props.onDelete}
            />
          </div>
        </BlockProperty>
      )}
      <div>
        <img width="100%" src={imageUrl} />
      </div>
      {text && (
        <div
          className="image-caption"
          contentEditable={props.active}
          onBlur={(e) => setText(e.target.textContent)}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export const toolImage: ToolDefinition = {
  type: 'image',
  name: 'Image',
  menu: { category: 'basic', icon: <ImageOutlined /> },
  initData: () => {
    return {
      type: 'image',
      data: {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/2312px-Picture_icon_BLACK.svg.png',
        text: '',
      },
      settings: {},
      source: { sourceType: 'input' },
    };
  },
  render: (props: ToolRenderProps) => <BlockImage {...props} />,
};
