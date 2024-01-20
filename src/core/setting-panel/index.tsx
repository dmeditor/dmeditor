import * as React from 'react';

import { useEditorStore } from '../main/store';
import WidgetSetting from './property-setting/property-item';
import { CommonSettings } from './common-setting';

const { useEffect } = React;

// const SettingPanel = ({ selectedWidget }: { selectedWidget: string }) => {
const SettingPanel = (props) => {
  const {
    selected: { selectedBlockIndex },
    updateSelectedBlockIndex,
  } = useEditorStore((state) => state);

  useEffect(() => {
    updateSelectedBlockIndex(selectedBlockIndex);
  }, [selectedBlockIndex]);

  return (
    <div>
      <CommonSettings {...props} selectedWidgetIndex={selectedBlockIndex}/>
      {/* <WidgetSetting selected={selectedWidget} /> */}
    </div>
  );
};

export default SettingPanel;
