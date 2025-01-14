import { useState } from 'react';
import { css } from '@emotion/css';
import { Button } from '@mui/material';
import { BlockListRender } from 'dmeditor/core/components/block-list-render';
import { dmeConfig } from 'dmeditor/core/config';
import { useGlobalVars } from 'dmeditor/core/main/store';
import { MiniRichText } from 'dmeditor/core/utility';

import type { DME } from '../../core/types';
import { EntityForm } from './entity';

export interface Response {
  success: boolean;
  errorMessage?: string;
  fieldsMessage?: Record<string, string>;
}

export type FormCallBack = (formObj: any, formData: any) => Promise<Response>;

export const Form = (props: DME.WidgetRenderProps<EntityForm>) => {
  const { blockNode, path, mode, styleClasses } = props;

  const { data } = blockNode;

  const [response, setResponse] = useState<Response | null>(null);

  const [loading, setLoading] = useState(false);

  const { setVar, removeVar } = useGlobalVars();

  const formConfig = dmeConfig.widgets['form'];

  const formVarName = '__formfield-feedback';

  const submit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const obj: Record<string, any> = {};
    if (!data.formData) {
      formData.forEach((value, key) => {
        obj[key] = value;
      });
    }

    setLoading(true);

    if (formConfig && formConfig.submit) {
      const callback = formConfig.submit as FormCallBack;
      callback(obj, formData).then((resp) => {
        if (resp.fieldsMessage) {
          setVar(formVarName, resp.fieldsMessage);
        }
        setLoading(false);
        setResponse(resp);
      });
    }
  };

  const reset = () => {
    setResponse(null);
    removeVar(formVarName);
  };

  if (response && response.success === true) {
    return (
      <div className={styleClasses['success-message'] || 'dme-w-success-message'}>
        <div
          className={css`
            white-space: pre-line;
          `}
        >
          {data.successMessage || 'Your form is submitted.'}
        </div>
        {mode === 'edit' && (
          <div>
            <Button onClick={reset}>Reset</Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <BlockListRender blockData={blockNode.children || []} path={path} mode={mode} />
        </div>

        {formConfig && formConfig.captcha && <div>{formConfig.captcha()}</div>}

        {response && response.success === false && (
          <div className={styleClasses['error-message'] || 'dme-w-error-message'}>
            {response.errorMessage}
          </div>
        )}

        <div className={styleClasses['action'] || 'dme-w-action'}>
          <button className={styleClasses['submit'] || 'dme-w-submit'} type="submit">
            {styleClasses['icon-before-submit'] && (
              <i className={styleClasses['icon-before-submit']} />
            )}
            {data.submitText || 'Submit'}
          </button>
          <button type="reset" className={styleClasses['reset'] || 'dme-w-reset'}>
            {styleClasses['icon-before-reset'] && (
              <i className={styleClasses['icon-before-reset']} />
            )}
            {data.resetText || 'Reset'}
          </button>
        </div>

        {loading && <div className={styleClasses['loading'] || 'dme-w-loading'}></div>}
      </form>
    </div>
  );
};
