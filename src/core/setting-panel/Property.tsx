import React, { useState } from 'react';
import { KeyboardArrowDown, KeyboardArrowRight } from '@mui/icons-material';
import { Button, ButtonProps, Collapse, Grid, InputLabel, Tooltip } from '@mui/material';

import { StyledSettingGroup, StyledSettingItem } from './style';

export const PropertyItem = (props: {
  label?: string;
  autoWidth?: boolean;
  upDown?: boolean;
  children: any;
}) => {
  const { label } = props;
  const autoWidth = props.autoWidth ? true : false;
  const upDown = props.upDown ? true : false;

  return label ? (
    <StyledSettingItem.Container upDown={upDown} autoWidth={autoWidth}>
      <StyledSettingItem.Label>{props.label}: </StyledSettingItem.Label>
      <StyledSettingItem.Setting upDown={upDown}>{props.children}</StyledSettingItem.Setting>
    </StyledSettingItem.Container>
  ) : (
    <StyledSettingItem.Setting>{props.children}</StyledSettingItem.Setting>
  );
};

export const PropertyGroup = (props: {
  header: React.ReactNode;
  children: any;
  expandable?: boolean;
  open?: boolean;
  onOpenClose?: (open: boolean) => void;
}) => {
  const [open, setOpen] = useState(props.expandable && props.open ? true : false);

  return (
    <StyledSettingGroup.Container
      expandable={props.expandable}
      open={open}
      onClick={() => {
        if (props.expandable) {
          setOpen(!open);
          if (props.onOpenClose) props.onOpenClose(!open);
        }
      }}
    >
      <StyledSettingGroup.Header>
        {props.expandable && (
          <span>
            {!open && <KeyboardArrowRight style={{ fontSize: 16 }} />}
            {open && <KeyboardArrowDown style={{ fontSize: 16 }} />}
          </span>
        )}
        {props.header}
      </StyledSettingGroup.Header>
      {props.expandable && (
        <Collapse in={open}>
          <StyledSettingGroup.Body>{props.children}</StyledSettingGroup.Body>
        </Collapse>
      )}
      {!props.expandable && <StyledSettingGroup.Body>{props.children}</StyledSettingGroup.Body>}
    </StyledSettingGroup.Container>
  );
};

export const PropertyButton = (props: ButtonProps & { title?: string; selected?: boolean }) => {
  let sx: any = {
    color: props.color ? props.color : '#8a8a8a',
    marginRight: '2px',
    ':hover': {
      bgcolor: '#eaeaea',
    },
  };

  if (props.selected) {
    sx = { ...sx, color: 'green' };
  }

  let buttonProps = { ...props };
  if (buttonProps['title']) {
    delete buttonProps['title'];
  }

  if (props.title) {
    return (
      <Tooltip title={props.title}>
        <Button sx={sx} {...buttonProps} />
      </Tooltip>
    );
  } else {
    return <Button sx={sx} {...props} />;
  }
};
