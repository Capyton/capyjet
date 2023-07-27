import React, { Suspense, useCallback, useState } from 'react';
import { css } from '@emotion/react';
import { UIProvider } from 'components/UIProvider';
import { Header } from 'components/Header';
import { Tabs, TabData } from 'components/Tabs';
import { Theme } from 'types';

const styles = {
  content: (theme: Theme) => css`
    margin: 0 auto;
    max-width: ${theme.sizing(80)};

    @media screen and (max-width: 767px) {
      max-width: none;
    }
  `,
  tabs: (theme: Theme) => css`
    margin: ${theme.sizing(4, 'auto')};
    width: 100%;

    @media screen and (max-width: 767px) {
      margin-top: 0;
    }
  `,
};

const tabs: TabData[] = [{ title: 'Sell NFT' }, { title: 'Buy NFT' }];

export const App = () => {
  const [currentTab, setCurrentTab] = useState(tabs[0].title);

  const handleChange = useCallback((newTab: string) => {
    setCurrentTab(newTab);
  }, []);

  return (
    <UIProvider>
      <Header />

      <Suspense fallback="">
        <div css={styles.content}>
          <div css={styles.tabs}>
            <Tabs activeTab={currentTab} onChange={handleChange} tabs={tabs} />
          </div>
          Content
        </div>
      </Suspense>
    </UIProvider>
  );
};
