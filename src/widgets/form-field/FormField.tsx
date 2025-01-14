import { useEffect } from 'react';
import { useEditorStore, useGlobalVars } from 'dmeditor/core/main/store';
import { RenderToSetting } from 'dmeditor/core/utility';

import type { DME } from '../../core/types';
import { EntityFormField } from './entity';
import { FieldSettings } from './FieldSetting';
import { FormRow } from './styled';

export const FormField = (props: DME.WidgetRenderProps<EntityFormField>) => {
  const { blockNode, styleClasses, mode, path } = props;

  const { data } = blockNode;

  const { vars } = useGlobalVars();

  const feedbacks = vars['__formfield-feedback'] || {};

  const { updateBlockByPath } = useEditorStore();

  const feedbackMessage = feedbacks[data.identifier];

  useEffect(() => {
    updateBlockByPath(props.path, (blockData: EntityFormField) => {
      const defaultList = [{ text: 'Option', value: 'option', isDefault: true }];
      blockData.defaultValue = undefined;
      blockData.options = ['select', 'radio'].includes(data.type) ? defaultList : undefined;
      blockData.rows = undefined;
    });
  }, [data.type]);

  return (
    <div className={feedbackMessage ? styleClasses['error'] || 'dme-w-error' : ''}>
      {mode === 'edit' && props.active && (
        <RenderToSetting>
          <FieldSettings key={data.type} data={data} path={path} />
        </RenderToSetting>
      )}
      <FormRow newLine={data.newLine} labelWidth={data.settings?.labelWidth}>
        <label>
          {data.label}
          {data.required && <span className={styleClasses['required'] || 'dme-w-required'}>*</span>}
          :{' '}
        </label>
        <div>
          {data.type === 'text' && (
            <input
              className={styleClasses['input-text'] || 'dme-w-input-text'}
              placeholder={data.placeHolder}
              name={data.identifier}
              required={data.required}
              defaultValue={data.defaultValue}
            />
          )}
          {data.type === 'checkbox' && (
            <input
              type="checkbox"
              className={styleClasses['input-checkbox'] || 'dme-w-input-checkbox'}
              key={data.defaultValue + ''}
              name={data.identifier}
              defaultChecked={data.defaultValue ? true : false}
            />
          )}
          {data.type === 'radio' && (
            <div>
              {data.options && (
                <>
                  {data.options.map((item) => (
                    <label>
                      <input
                        className={styleClasses['input-radio'] || 'dme-w-input-radio'}
                        type="radio"
                        key={item.isDefault}
                        name={data.identifier}
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
                  className={styleClasses['input-select'] || 'dme-w-input-select'}
                >
                  {data.options.map((item) => (
                    <option selected={item.isDefault ? true : false} value={item.value}>
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
              className={styleClasses['input-textarea'] || 'dme-w-input-textarea'}
              placeholder={data.placeHolder}
              name={data.identifier}
              rows={data.rows || 5}
              required={data.required}
              defaultValue={data.defaultValue}
            ></textarea>
          )}
        </div>
      </FormRow>
      {feedbackMessage && (
        <div className={styleClasses['error-message'] || 'dme-w-error-message'}>
          {feedbackMessage}
        </div>
      )}
    </div>
  );
};
