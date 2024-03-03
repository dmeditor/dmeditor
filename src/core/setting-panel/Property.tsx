import React, { useState } from 'react';
import { KeyboardArrowDown, KeyboardArrowRight } from '@mui/icons-material';
import { Button, ButtonProps, Collapse, Grid, InputLabel, Tooltip } from '@mui/material';

export const PropertyItem = (props: {
  label?: string;
  autoWidth?: boolean;
  vertical?: boolean;
  children: any;
}) => {
  const { label } = props;
  const autoWidth = props.autoWidth ? true : false;
  const vertical = props.vertical ? true : false;

  return label ? (
    <Grid container spacing={2} columns={12}>
      <Grid item xs={autoWidth ? false : vertical ? 12 : 3}>
        <InputLabel title={props.label} style={{ fontSize: '14px', lineHeight: 2 }}>
          {props.label}
        </InputLabel>
      </Grid>
      <Grid item sx={{ padding: 1 }} xs={autoWidth ? false : vertical ? 12 : 9}>
        {props.children}
      </Grid>
    </Grid>
  ) : (
    <Grid item sx={{ padding: 1 }} xs={autoWidth ? false : vertical ? 12 : 12}>
      {props.children}
    </Grid>
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

  const renderBody = () => {
    return <div style={{ paddingLeft: '10px', paddingTop: '10px' }}>{props.children}</div>;
  };

  return (
    <div>
      <div
        onClick={() => {
          if (props.expandable) {
            setOpen(!open);
            if (props.onOpenClose) props.onOpenClose(!open);
          }
        }}
      >
        <label style={{ color: '#004f00' }}>
          {props.expandable && (
            <span>
              {!open && <KeyboardArrowRight />}
              {open && <KeyboardArrowDown />}
            </span>
          )}
          {props.header}
        </label>
      </div>
      {props.expandable && <Collapse in={open}>{renderBody()}</Collapse>}
      {!props.expandable && <>{renderBody()}</>}
    </div>
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
