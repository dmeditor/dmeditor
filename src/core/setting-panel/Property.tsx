import React, { useState } from 'react';
import {
  InfoOutlined,
  InfoRounded,
  InfoSharp,
  KeyboardArrowDown,
  KeyboardArrowRight,
} from '@mui/icons-material';
import {
  Button,
  ButtonProps,
  Collapse,
  Grid,
  IconButton,
  InputLabel,
  Tooltip,
} from '@mui/material';

import { StyledSettingGroup, StyledSettingItem } from './style';

export const PropertyItem = (props: {
  label?: string;
  description?: string;
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
      {props.description && (
        <Tooltip title={props.description}>
          <InfoOutlined sx={{ verticalAlign: 'bottom' }} fontSize="small" />
        </Tooltip>
      )}
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
    color: props.color ? props.color : '#999999',
    border: '1px solid transparent',
    marginRight: '3px',
    ':hover': props.selected
      ? { bgcolor: '#ffffff' }
      : {
          bgcolor: '#fcfcfc',
          borderColor: '#999999',
          color: '#999999',
        },
  };

  if (props.selected) {
    sx = { ...sx, bgcolor: '#ffffff', borderColor: '#666666', color: '#666666' };
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
