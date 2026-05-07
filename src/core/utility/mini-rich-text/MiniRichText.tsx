import * as React from 'react';
import { FocusEventHandler, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { css } from '@emotion/css';
import { ImageOutlined } from '@mui/icons-material';
import { createEditor, type Descendant, type Element as SlateElement } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, Slate, withReact } from 'slate-react';

import { BrowseImageCallbackParams, dmeConfig } from '../../config';
import {
  Element,
  HoveringToolbar,
  insertImage,
  isImageUrl,
  Leaf,
  withImages,
  withInlines,
  type MiniRichTextLeafProps,
} from '../../setting-panel/property-setting/rich-text/helper';
import { type DME } from '../../types';
import { isNumber } from '../../utils';
import { ImageChooser } from '../ImageChooser';

const { useCallback, useMemo } = React;

export interface MiniRichTextProps {
  // viewmode?: boolean;
  placeHolder?: string;
  mode?: DME.WidgetRenderProps['mode'];
  value?: Array<Descendant> | null;
  useEffectToUpdate?: boolean;
  onFocus?: FocusEventHandler; //Note: when onFocus is invoked if it rerender it can lose focus. Be careful using it.
  onValueChange?: (value: Descendant[]) => void;
}

const emptyValue = [
  {
    type: 'paragraph',
    children: [{ text: ' ' }],
  },
];

const MiniRichText = (props: MiniRichTextProps) => {
  const { onValueChange, mode } = props;
  const value = props.value || emptyValue;

  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [imageChooserVisible, setImageChooserVisible] = useState(false);

  const renderElement = useCallback(
    (props: {
      attributes: Record<string, unknown>;
      children: React.ReactNode;
      element: SlateElement;
    }) => <Element mode={mode} {...props} />,
    [],
  );

  const renderLeaf = useCallback((props: MiniRichTextLeafProps) => <Leaf {...props} />, []);
  const editor = useMemo(() => withInlines(withImages(withHistory(withReact(createEditor())))), []);

  const handleValueChange = (newValue: Descendant[]) => {
    if (!Array.isArray(newValue)) {
      console.warn('MiniRichText: onChange: newValue is not an array', newValue);
      return;
    }
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  useEffect(() => {
    if (props.useEffectToUpdate) {
      editor.children = value;
      //fix new empty in table not updated issue.
      if (!props.value) {
        editor.select(editor.end([]));
      }
    }
  }, [value]);

  if (!props.useEffectToUpdate) {
    editor.children = value;
  }

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setContextMenu({ x: event.clientX, y: event.clientY });
  };

  const handleImageConfirm = (
    images: BrowseImageCallbackParams,
    options?: { inline?: boolean },
  ) => {
    setImageChooserVisible(false);
    if (images.length === 0) return;
    console.log('images', images);
    const id = images[0].id;
    const url = images[0].src;
    console.log('url', url, id);
    if (isNumber(id)) {
      insertImage(editor as any, url, { inline: options?.inline });
    } else {
      if (url && !isImageUrl(url)) {
        alert('URL is not an image');
        return;
      }
      if (url) insertImage(editor as any, url, { inline: options?.inline });
    }
  };

  const zIndex = dmeConfig.editor.zIndex;

  return (
    <div onContextMenu={mode === 'edit' ? handleContextMenu : undefined}>
      <Slate editor={editor} initialValue={value} onValueChange={handleValueChange}>
        <div>
          {mode === 'edit' && <HoveringToolbar />}
          <Editable
            readOnly={mode === 'view'}
            renderLeaf={renderLeaf}
            onFocus={props?.onFocus}
            renderElement={renderElement}
            onKeyDown={(event: any) => {
              //soft break
              if (event.key === 'Enter' && event.shiftKey) {
                event.preventDefault();
                editor.insertText('\n');
              }
            }}
            renderPlaceholder={({ children, attributes }) => (
              <span {...attributes}>
                <span style={{ textWrap: 'nowrap', fontSize: '0.9rem' }}>{children}</span>
              </span>
            )}
            placeholder={mode === 'view' ? '' : props.placeHolder || 'Input your content here'} //fixed: readonly empty still show placeholder
          />
        </div>
      </Slate>

      {contextMenu &&
        ReactDOM.createPortal(
          <>
            {/* Invisible backdrop — catches any click/right-click to close */}
            <div
              style={{ position: 'fixed', inset: 0, zIndex: zIndex + 299 }}
              onClick={() => setContextMenu(null)}
              onContextMenu={(e) => {
                e.preventDefault();
                setContextMenu(null);
              }}
            />
            <div
              className={css`
                position: fixed;
                top: ${contextMenu.y}px;
                left: ${contextMenu.x}px;
                z-index: ${zIndex + 300};
                background: #fff;
                border: 1px solid #ddd;
                border-radius: 4px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
                min-width: 160px;
                padding: 4px 0;
              `}
            >
              <div
                className={css`
                  display: flex;
                  align-items: center;
                  gap: 8px;
                  padding: 6px 12px;
                  cursor: pointer;
                  font-size: 14px;
                  color: #333;
                  &:hover {
                    background: #f5f5f5;
                  }
                `}
                onMouseDown={(e) => {
                  e.preventDefault();
                  setContextMenu(null);
                  setImageChooserVisible(true);
                }}
              >
                <ImageOutlined style={{ fontSize: 18 }} />
                Insert Image
              </div>
            </div>
          </>,
          document.body,
        )}

      {imageChooserVisible && (
        <ImageChooser
          visible={imageChooserVisible}
          options={{ showInline: true }}
          multiple={false}
          onConfirm={handleImageConfirm}
          onCancel={() => setImageChooserVisible(false)}
        />
      )}
    </div>
  );
};

export { MiniRichText };
