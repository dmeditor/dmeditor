import { useEffect, useRef, useState } from 'react';
import { useEditorStore, useGlobalVars } from 'dmeditor/core/main/store';
import { RenderToSetting } from 'dmeditor/core/utility';

import type { DME } from '../../core/types';
import { getWidgetStyleClass } from '../../core/utils';
import { EntityFormField } from './entity';
import { FieldSettings } from './FieldSetting';
import { FileControl, FormRow } from './styled';

export const FormField = (props: DME.WidgetRenderProps<EntityFormField>) => {
  const { blockNode, styleClasses, mode, path } = props;

  const { data } = blockNode;

  const { vars } = useGlobalVars();

  const feedbacks = vars['__formfield-feedback'] || {};

  const { updateBlockByPath } = useEditorStore();

  const feedbackMessage = feedbacks[data.identifier];

  const previousType = useRef<string>(data.type);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFileName, setSelectedFileName] = useState('');

  useEffect(() => {
    const form = fileInputRef.current?.form;
    if (!form) {
      return;
    }
    const clearFileName = () => setSelectedFileName('');
    form.addEventListener('reset', clearFileName);
    return () => form.removeEventListener('reset', clearFileName);
  }, [data.fileButtonText]);

  useEffect(() => {
    //when switching
    if (data.type !== previousType.current) {
      updateBlockByPath(props.path, (blockData: EntityFormField) => {
        const defaultList = [{ text: 'Option', value: 'option', isDefault: true }];
        blockData.defaultValue = undefined;
        blockData.options = ['select', 'radio'].includes(data.type) ? defaultList : undefined;
        blockData.rows = undefined;
      });
      previousType.current = data.type;
    }
  }, [data.type]);

  return (
    <div>
      {mode === 'edit' && props.active && (
        <RenderToSetting containerId="form-field-type" blockId={blockNode.id}>
          <FieldSettings key={data.type} data={data} path={path} />
        </RenderToSetting>
      )}
      <FormRow
        newLine={data.newLine}
        labelWidth={data.settings?.labelWidth}
        className={feedbackMessage !== undefined ? getWidgetStyleClass(styleClasses, 'error') : ''}
      >
        <label>
          {data.label}
          {data.required && <span className={getWidgetStyleClass(styleClasses, 'required')}>*</span>}
          :{' '}
        </label>
        <div>
          {data.type === 'text' && (
            <input
              className={getWidgetStyleClass(styleClasses, 'input-text')}
              placeholder={data.placeHolder}
              name={data.identifier}
              defaultValue={data.defaultValue}
            />
          )}
          {data.type === 'checkbox' && (
            <input
              type="checkbox"
              className={getWidgetStyleClass(styleClasses, 'input-checkbox')}
              key={data.defaultValue + ''}
              name={data.identifier}
              value={'1'}
              defaultChecked={data.defaultValue ? true : false}
            />
          )}
          {data.type === 'radio' && (
            <div>
              {data.options && (
                <>
                  {data.options.map((item) => (
                    <label
                      key={item.value as string}
                      className={getWidgetStyleClass(styleClasses, 'input-radio-label')}
                    >
                      <input
                        className={getWidgetStyleClass(styleClasses, 'input-radio')}
                        type="radio"
                        key={item.isDefault}
                        name={data.identifier}
                        value={item.value as string}
                        defaultChecked={item.isDefault ? true : false}
                      />
                      {item.text}
                    </label>
                  ))}
                </>
              )}
              {!data.options && <div>Please input options</div>}
            </div>
          )}
          {data.type === 'select' && (
            <div>
              {data.options && (
                <select
                  name={data.identifier}
                  defaultValue={data.defaultValue}
                  className={getWidgetStyleClass(styleClasses, 'input-select')}
                >
                  {data.options.map((item) => (
                    <option
                      key={item.value as string}
                      selected={!data.defaultValue && item.isDefault ? true : undefined}
                      value={item.value}
                    >
                      {item.text}
                    </option>
                  ))}
                </select>
              )}
              {!data.options && <div>Please input options</div>}
            </div>
          )}
          {data.type === 'textarea' && (
            <textarea
              className={getWidgetStyleClass(styleClasses, 'input-textarea')}
              placeholder={data.placeHolder}
              name={data.identifier}
              rows={data.rows || 3}
              defaultValue={data.defaultValue}
            ></textarea>
          )}
          {data.type === 'file' &&
            (data.fileButtonText ? (
              <FileControl>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={data.params?.fileFormat || '*'}
                  className={getWidgetStyleClass(styleClasses, 'input-file')}
                  name={data.identifier}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    setSelectedFileName(file?.name || '');
                  }}
                />
                <span className={getWidgetStyleClass(styleClasses, 'input-file-button')}>
                  {data.fileButtonText}
                </span>
                <span className={getWidgetStyleClass(styleClasses, 'input-file-text')}>
                  {selectedFileName}
                </span>
              </FileControl>
            ) : (
              <input
                type="file"
                accept={data.params?.fileFormat || '*'}
                className={getWidgetStyleClass(styleClasses, 'input-file')}
                key={data.defaultValue + ''}
                name={data.identifier}
              />
            ))}
        </div>
      </FormRow>
      {feedbackMessage && (
        <div className={getWidgetStyleClass(styleClasses, 'error-message')}>
          {feedbackMessage}
        </div>
      )}
    </div>
  );
};
