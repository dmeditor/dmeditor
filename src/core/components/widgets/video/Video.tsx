import { useEffect, useState } from 'react';
import { VideocamOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';

import { getCommonBlockCss } from '../../block/BlockRender';
import { BlockProperty } from 'Src/core/components/block-property';
import { CommonSettings } from 'Core/setting-panel/common-setting';
import { ToolDefinition, ToolRenderProps } from '../../../../ToolDefinition';
import { PropertyItem, Ranger, Util } from '../../../utils';

export const BlockVideo = (props: ToolRenderProps) => {
  const [width, setWidth] = useState(props.blockdata.settings?.width || 300);
  const [height, setHeight] = useState(props.blockdata.settings?.height || 240);
  const [adding, setAdding] = useState(props.adding ? true : false);
  const [videoUrl, setVideoUrl] = useState(props.blockdata.data);
  const [commonSettings, setCommonSettings] = useState(props.blockdata.settings?.style || {});
  const handleClickOpen = () => {
    setAdding(false);
    setTimeout(() => {
      setAdding(true);
    }, 10);
  };

  const submitVideo = (val: any, type: string) => {
    setVideoUrl(val);
    setAdding(false);
  };

  useEffect(() => {
    props.onChange({
      ...props.blockdata,
      data: videoUrl,
      settings: { width: width, height: height, style: commonSettings },
    });
  }, [videoUrl, width, height, commonSettings]);

  return (
    <div
      style={{ width: width, height: height, ...commonSettings }}
      className={getCommonBlockCss('video')}
    >
      {adding && (
        <div>
          <Util.renderBroseURL
            defalutValue={videoUrl}
            type={'Video'}
            onConfirm={submitVideo}
            adding={adding}
          />
        </div>
      )}
      {props.active && (
        <BlockProperty blocktype="video" inBlock={props.inBlock}>
          <PropertyItem label="Width">
            <Ranger
              min={50}
              max={800}
              step={1}
              defaultValue={width}
              onChange={(v) => {
                setWidth(v);
              }}
            />
          </PropertyItem>
          <PropertyItem label="Height">
            <Ranger
              min={50}
              max={800}
              step={1}
              defaultValue={height}
              onChange={(v) => {
                setHeight(v);
              }}
            />
          </PropertyItem>
          <PropertyItem label="Source">
            <Button onClick={handleClickOpen}>Choose</Button>
          </PropertyItem>

          {Util.renderCustomProperty(props.blockdata)}
          <div>
            <CommonSettings
              commonSettings={commonSettings}
              settingList={['marginTop']}
              onChange={(settings) => {
                setCommonSettings(settings);
              }}
              onDelete={props.onDelete}
            />
          </div>
        </BlockProperty>
      )}
      <video width={'100%'} height={'100%'} controls src={videoUrl}>
        <object data={videoUrl} width={'100%'} height={'100%'}>
          <embed src={videoUrl} width={'100%'} height={'100%'} />
        </object>
      </video>
    </div>
  );
};
export const toolVideo: ToolDefinition = {
  type: 'video',
  name: 'Video',
  menu: { category: 'basic', icon: <VideocamOutlined /> },
  initData: () => {
    return {
      type: 'video',
      data: 'https://www.runoob.com/try/demo_source/movie.ogg',
      settings: {},
    };
  },
  render: (props: ToolRenderProps) => <BlockVideo {...props} />,
};
