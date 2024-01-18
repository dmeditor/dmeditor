import * as React from 'react';

import { useEditorStore } from '../main/store';
import WidgetSetting from './property-setting/property-item';
import { CommonSettings } from './common-setting';

const { useEffect } = React;

// const SettingPanel = ({ selectedWidget }: { selectedWidget: string }) => {
const SettingPanel = (props) => {
  const {
    designer: { selectedWidgetIndex },
    updateSelectedWidgetIndex,
  } = useEditorStore((state) => state);

  useEffect(() => {
    updateSelectedWidgetIndex(selectedWidgetIndex);
  }, [selectedWidgetIndex]);

  return (
    <div>
      <CommonSettings {...props} selectedWidgetIndex={selectedWidgetIndex}/>
      {/* <WidgetSetting selected={selectedWidget} /> */}
    </div>
  );
};

export default SettingPanel;
