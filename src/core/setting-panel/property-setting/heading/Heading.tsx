import * as React from 'react';
import { LoopOutlined } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import { BlockProperty } from 'dmeditor/components/block-property';
import { useEditorStore } from 'dmeditor/main/store';

import { ToolDefinition, ToolRenderProps } from '../../../../ToolDefinition';
import { PropertyButton, PropertyItem, Ranger, Util } from '../../../utils';
import useHeadingStore from '../../store/heading';

const { useState, useRef, useEffect } = React;

const HeadingSetting = (props: unknown) => {
  const toggleProperty = useEditorStore((state) => state.toggleProperty);
  const { headingStateChange, id, level, value } = useHeadingStore((state) => state);
  // const defaultValue: any = useRef(data);

  const generateId = () => {
    const newId = value
      .trim()
      .replace(/\s/g, '-')
      .replace(/[^\w\-]/g, '')
      .toLowerCase();
    headingStateChange('id', newId);
  };

  // useEffect(() => {
  //   let newData = {
  //     ...props.blockdata,
  //     data: text,
  //     settings: { level: level, style: commonSettings, id: id },
  //     style: styleIdentifier,
  //   };
  //   props.onChange(newData, true);
  // }, [text, level, id, commonSettings, styleIdentifier]);

  const handleLevelChange = (value: number) => {
    headingStateChange('level', value.toString());
  };

  const handleAnchorChange = (value: string) => {
    headingStateChange('id', value);
  };

  return (
    <>
      {/* <PropertyItem label="Level">
          <Ranger
            defaultValue={level}
            min={1}
            max={5}
            step={1}
            onChange={(value: number) => {
              // setLevel(v);
              // defaultValue.current = text;
              handleLevelChange(value);
            }}
          />
        </PropertyItem> */}
      <PropertyItem label="Anchor">
        <TextField
          sx={{ width: 'calc(100% - 37px)' }}
          placeholder="Please enter ID"
          value={id}
          size="small"
          hiddenLabel
          variant="outlined"
          onChange={(e) => {
            handleAnchorChange(e.target.value);
          }}
        />
        <PropertyButton title="Auto generate Id" onClick={generateId}>
          <LoopOutlined />
        </PropertyButton>
      </PropertyItem>
    </>
  );
};

export default HeadingSetting;
