import { Fragment, useCallback, useEffect, useState } from 'react';
import { Tab } from './Tab';
import { styles } from './Tabs.styles';

export type TabData = {
  title: string;
};

type Props = {
  activeTab: string;
  onChange: (tab: string) => void;
  tabs: TabData[];
};

export const Tabs = ({ activeTab, onChange, tabs }: Props) => {
  const [currentTab, setCurrentTab] = useState(activeTab);

  const handleTabChange = useCallback(
    (newTab: string) => () => {
      setCurrentTab(newTab);

      onChange(newTab);
    },
    [onChange],
  );

  useEffect(() => {
    setCurrentTab(activeTab);
  }, [activeTab]);

  return (
    <div css={styles.tabs(tabs.length)}>
      {tabs.map((tab, index) => (
        <Fragment key={index}>
          <Tab
            isActive={currentTab === tab.title}
            onClick={handleTabChange(tab.title)}
          >
            {tab.title}
          </Tab>
        </Fragment>
      ))}
    </div>
  );
};
