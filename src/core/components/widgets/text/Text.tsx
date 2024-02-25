import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  BorderColorOutlined,
  FormatAlignCenter,
  FormatAlignJustify,
  FormatAlignLeft,
  FormatAlignRight,
  FormatListBulleted,
  FormatListNumbered,
  ImageOutlined,
  LinkOffOutlined,
  LinkOutlined,
  TextFormatOutlined,
} from '@mui/icons-material';
import { Button, MenuItem, Select } from '@mui/material';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, ReactEditor, Slate, withReact } from 'slate-react';

import { StyleSettings } from '../../../../styles/StyleSettings';
import { ToolDefinition, ToolRenderProps } from '../../../../ToolDefinition';
import { ReactResizableCss } from '../../../main/designer/DMEditor.css';
import { getCommonBlockCss, getStyleCss } from '../../../main/renderer/BlockRender';
import {
  PickColor,
  PropertyButton,
  PropertyGroup,
  PropertyItem,
  Ranger,
  Util,
} from '../../../utils';
import FontFamilyList from '../../../utils/FontFamilyList';
import { SlateFun } from '../../../utils/Slate';
import { BlockProperty } from 'Src/core/components/block-property';
import { BlockSettings } from 'Src/core/setting-panel/BlockSettings';

const Text = (props: any) => {
  const { blockNode, rootClasses, styleClasses } = props;
  const {
    data: { value },
  } = blockNode;

  // const [value, setValue] = useState(props.blockdata.data);
  // const [config, setConfig] = useState(props.blockdata.settings?.config || null);
  const [adding, setAdding] = useState(false);
  // const [commonSettings, setCommonSettings] = useState(props.blockdata.settings?.style || {});

  const [size, setSize] = useState(1.1);
  const [familytype, setFamilytype] = useState('');
  const [color, setColor] = useState();
  const [linkstyle, setLinkstyle] = useState('none' as 'none' | 'button');
  const [buttonVariant, setButtonVariant] = useState('outlined' as 'contained' | 'outlined');
  const [buttonSize, setButtonSize] = useState('small' as 'small' | 'medium' | 'large');
  const [buttonColor, setButtonColor] = useState(
    'primary' as
      | 'primary'
      | 'econdary'
      | 'success'
      | 'warning'
      | 'danger'
      | 'info'
      | 'light'
      | 'dark',
  );
  const [isFocus, setIsFocus] = useState(false);
  const [isLinkActive, setIsLinkActive] = useState(false);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [isImageActive, setIsImageActive] = useState(false);
  const [imageBorderWidth, setImageBorderWidth] = useState(0);
  const [imageBorderColor, setImageBorderColor] = useState(SlateFun.IMAGE_BORDER_COLOR);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [dialogType, setDialogType] = useState('image' as 'image' | 'link');
  const [linkVal, setLinkVal] = useState('' as any);
  const firstRender = useRef(true);
  const [hovering, setHovering] = useState(true);
  const [view, setView] = useState(props.view);
  // const [styleIdentifier, setStyleIdentifier] = useState(props.blockdata.style);
  const BlockButton = ({ formats }: any) => {
    let ele: any;
    if (formats === 'left') {
      ele = <FormatAlignLeft />;
    }
    if (formats === 'center') {
      ele = <FormatAlignCenter />;
    }
    if (formats === 'right') {
      ele = <FormatAlignRight />;
    }
    if (formats === 'justify') {
      ele = <FormatAlignJustify />;
    }
    if (formats === 'numbered-list') {
      ele = <FormatListNumbered />;
    }
    if (formats === 'bulleted-list') {
      ele = <FormatListBulleted />;
    }
    return ele;
  };
  const editor = useMemo(() => SlateFun.withEditor(withHistory(withReact(createEditor()))), []);
  const renderElement = useCallback(
    (props: any) => (
      <SlateFun.Element
        {...props}
        view={view}
        changeimageStatus={(status?: any) => {
          setIsImageActive(status == false ? false : true);
          ImageStyle();
        }}
      />
    ),
    [],
  );
  const renderLeaf = useCallback((props: any) => <SlateFun.Leaf {...props} />, []);

  // const change = (val: any) => {
  //   setValue(val);
  // };
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      // props.onChange(
      //   {
      //     ...props.blockdata,
      //     data: value,
      //     style: styleIdentifier,
      //     settings: { style: commonSettings },
      //   },
      //   true,
      // );
    }
  }, [value]);

  const changeFontFormat = (value: any, format: any, e?: any) => {
    if (e) {
      e.preventDefault();
    }
    if (format === 'fontSize') {
      setSize(value);
    }
    if (format === 'color') {
      setColor(value);
    }
    if (format === 'fontFamily') {
      setFamilytype(value);
    }

    SlateFun.toggleFormat(editor, format, value);
    setIsCollapsed(SlateFun.isCollapsed(editor));
    setIsFocus(!isFocus);
  };

  const IsShowToolBar = (type: any, format: string) => {
    // return config ? (config[type].includes(format) ? true : false) : true;
  };
  const changeLinkFormat = (v: any) => {
    setLinkstyle(v);
    SlateFun.setLinkFormat(editor, v);
    setIsLinkActive(v === 'none' ? true : false);
    setIsButtonActive(v === 'button' ? true : false);
    setButtonVariant('outlined');
    setButtonSize('small');
    setIsFocus(!isFocus);
  };
  const changeButtonFormat = (v: any, format: any) => {
    if (format === 'variant') {
      setButtonVariant(v);
    }
    if (format === 'size') {
      setButtonSize(v);
    }
    if (format === 'color') {
      setButtonColor(v);
    }
    SlateFun.setLinkFormat(editor, 'button', format, v);
    setIsFocus(!isFocus);
  };

  //insert image
  const handleClickOpen = (event: any, type: any) => {
    event.preventDefault();
    setDialogType(type);
    if (type == 'link') {
      setLinkVal(SlateFun.getLinkSetting(editor));
      setHovering(false);
    }
    setAdding(true);
    setAdding(false);
    setTimeout(() => {
      setAdding(true);
    }, 10);
  };
  const submitImage = (val: any, type: string) => {
    SlateFun.insertImage(editor, val, type);
    setIsFocus(!isFocus);
  };
  const ImageStyle = () => {
    let Image: any = SlateFun.getImageSetting(editor);
    let borderWidth = Image.setting?.borderWidth || 0;
    let borderColor = Image.setting?.borderColor || SlateFun.IMAGE_BORDER_COLOR;
    setImageBorderWidth(parseFloat(borderWidth));
    setImageBorderColor(borderColor);
  };
  //inset Link
  const changeDialogLinkfun = (value: any) => {
    setLinkVal(value);
    setDialogType('link');
    setHovering(true);
    setAdding(true);
    setAdding(false);
    setTimeout(() => {
      setAdding(true);
    }, 10);
  };
  const submitLink = (value: any, type: any) => {
    SlateFun.insertLink(editor, value, type);
    SlateEvents();
    setIsFocus(!isFocus);
  };
  const submitFun = (val: any, type: string) => {
    if (dialogType == 'image') {
      submitImage(val, type);
    }
    if (dialogType == 'link') {
      submitLink(val, type);
    }
  };
  const SlateEvents = () => {
    setFamilytype(SlateFun.getFormat(editor, 'fontFamily'));
    setSize(SlateFun.getFormat(editor, 'fontSize'));
    setColor(SlateFun.getFormat(editor, 'color'));
    setTimeout(() => {
      setIsCollapsed(SlateFun.isCollapsed(editor));
    }, 10);
    //image
    setIsImageActive(SlateFun.isImageActive(editor) ? true : false);
    if (SlateFun.isImageActive(editor)) {
      ImageStyle();
    }

    //link
    setLinkstyle('none');
    setIsLinkActive(SlateFun.isLinkActive(editor) ? true : false);
    setIsButtonActive(SlateFun.isLinkButtonActive(editor) ? true : false);
    if (SlateFun.isLinkActive(editor)) {
      let button: any = SlateFun.getLinkSetting(editor);
      setLinkVal(button);
      if (SlateFun.isLinkButtonActive(editor)) {
        let newButton: any = JSON.parse(JSON.stringify(button));
        setLinkstyle('button');
        setButtonVariant(newButton.styleConfig.setting.variant);
        setButtonSize(newButton.styleConfig.setting.size);
        setButtonColor(newButton.styleConfig.setting.color);
      }
    }
  };

  useEffect(() => {
    ReactEditor.focus(editor);
  }, [isFocus]);

  const change = () => {};

  return (
    <div className={rootClasses}>
      <Slate editor={editor} value={value} onChange={(v) => change(v)}>
        <div>
          <SlateFun.HoveringToolbar
            //config={config ? config.hover_toolbar : null}
            config={true}
            changeDialogLink={changeDialogLinkfun}
          />
          <Editable
            readOnly={props.active ? false : true}
            renderLeaf={renderLeaf}
            renderElement={renderElement}
            placeholder="Input your content here"
            onMouseUp={(event: any) => {
              SlateEvents();
            }}
            onKeyDown={(event: any) => {
              //soft break
              if (event.key === 'Enter' && event.shiftKey) {
                event.preventDefault();
                editor.insertText('\n');
              }
            }}
            onKeyUp={(event: any) => {
              SlateEvents();
            }}
            onDOMBeforeInput={(event: InputEvent) => {
              switch (event.inputType) {
                case 'formatBold':
                  event.preventDefault();
                  return SlateFun.toggleFormat(editor, 'bold');
                case 'formatItalic':
                  event.preventDefault();
                  return SlateFun.toggleFormat(editor, 'italic');
                case 'formatUnderline':
                  event.preventDefault();
                  return SlateFun.toggleFormat(editor, 'underlined');
              }
            }}
          />
        </div>
      </Slate>
      {adding && (
        <div>
          <Util.renderBroseURL
            type={dialogType == 'image' ? 'Image' : 'Link'}
            hovering={hovering}
            onConfirm={submitFun}
            adding={adding}
            defalutValue={dialogType == 'link' ? linkVal : ''}
          />
        </div>
      )}
    </div>
  );
};

export default Text;
