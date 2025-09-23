import { useEffect, useState } from 'react';
import { css } from '@emotion/css';
import { CheckOutlined } from '@mui/icons-material';

import { useEditorStore } from '../../..';
import { DME, DMEData } from '../../types';
import { getPropertyValue, PropertyItem } from '../../utils';
import Property from '../property-setting/property-item';

export const SettingRender = (props: {
  setting: DME.Setting;
  blockData: DMEData.Block;
  blockPath: (number | string)[];
  isMobileSetting?: boolean;
  settingStatus: {
    [index: string | symbol]: DME.WidgetStyleSettingStatus;
  };
}) => {
  const { setting, blockData, blockPath, isMobileSetting, settingStatus } = props;

  const { updateBlockPropsByPath } = useEditorStore();

  if (setting.custom) {
    return <Property {...{ ...setting, block: blockData, blockPath: blockPath }} />;
  } else {
    // const settings = getPropertyFromSettings(blockData);
    const { property } = setting;
    if (!property) {
      return undefined;
    }

    const mobileProperty = property + 'Mobile';
    const mobileValue = getPropertyValue(mobileProperty, blockData);

    const [useMobileSetting, setUseMobileSetting] = useState(
      isMobileSetting && mobileValue !== undefined,
    );

    useEffect(() => {
      if (isMobileSetting && mobileValue !== undefined) {
        setUseMobileSetting(true);
      } else {
        setUseMobileSetting(false);
      }
    }, [isMobileSetting, mobileValue]);

    const currentProperty = useMobileSetting ? mobileProperty : property;

    const switchEnableMobile = (enableMobile: boolean) => {
      if (enableMobile) {
        updateBlockPropsByPath(blockPath, mobileProperty, null);
        setUseMobileSetting(true);
      } else {
        updateBlockPropsByPath(blockPath, mobileProperty, undefined);
        setUseMobileSetting(false);
      }
    };

    const value = getPropertyValue(currentProperty, blockData);
    const propertyProps = {
      ...setting,
      block: blockData,
      value,
      blockPath,
      property: currentProperty,
      disabled: settingStatus[property] === 'disabled',
    };

    const enabled =
      !propertyProps.disabled && (!isMobileSetting || (isMobileSetting && useMobileSetting));

    return (
      <div style={{ position: 'relative' }}>
        <PropertyItem
          upDown={propertyProps.display?.upDown}
          label={setting.name}
          autoWidth={setting.display?.labelFullWidth}
          marginTop={setting.display?.marginTop}
          description={setting.description}
          key={blockPath + (currentProperty || '')}
        >
          <Property
            {...{
              ...propertyProps,
              disabled: !enabled,
            }}
          />
        </PropertyItem>

        {isMobileSetting && (
          <div
            style={{
              position: 'absolute',
              right: -20,
              top: 0,
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <a
              onClick={(e) => {
                e.preventDefault();
                switchEnableMobile(useMobileSetting ? false : true);
              }}
              href="#"
              title="Overwrite"
              className={css`
                color: ${useMobileSetting ? '#fc7e4b' : 'inherit'};
                border: 1px solid ${useMobileSetting ? '#fc7e4b' : 'rgba(0, 0, 0, 0)'};
                border-radius: 4px;
                padding: 2px;
                &:hover {
                  border-color: ${useMobileSetting ? '#fc7e4b' : '#cccccc'};
                }
              `}
            >
              <CheckOutlined style={{ fontSize: 18 }} />
            </a>
          </div>
        )}
      </div>
    );
  }
};
