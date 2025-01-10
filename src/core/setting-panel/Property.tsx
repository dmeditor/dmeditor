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

import { i18n } from '../i18n';
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
      <StyledSettingItem.Label>
        {i18n(props.label || '', 'property-label')}:{' '}
      </StyledSettingItem.Label>
      <StyledSettingItem.Setting upDown={upDown}>{props.children}</StyledSettingItem.Setting>
      {props.description && (
        <Tooltip
          title={
            <div dangerouslySetInnerHTML={{ __html: i18n(props.description, 'property-label') }} />
          }
        >
          <InfoOutlined
            sx={{ cursor: 'pointer', marginLeft: '5px', verticalAlign: 'bottom' }}
            fontSize="small"
          />
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
    padding: '3px',
    border: '1px solid transparent',
    ':hover': props.selected
      ? { bgcolor: '#ffffff', borderRadius: '4px' }
      : {
          bgcolor: '#fcfcfc',
          borderColor: '#cccccc',
          color: '#999999',
          borderRadius: '4px',
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
        <IconButton size="small" sx={sx} {...buttonProps} />
      </Tooltip>
    );
  } else {
    return <IconButton size="small" sx={sx} {...props} />;
  }
};
