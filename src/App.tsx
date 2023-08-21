import React, { Suspense, useCallback, useState } from 'react';
import { css } from '@emotion/react';
import { Address } from 'ton-core';
import { UIProvider } from 'components/UIProvider';
import { Header } from 'components/Header';
import { Tabs, TabData } from 'components/Tabs';
import { Theme } from 'types';
import { MarketplaceForm } from 'components/MarketplaceForm';
import { useTonConnect } from 'hooks/useTonConnect';
import { getStateInitToCreateSale } from 'utils/contracts';

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
  const { sendTransaction, wallet } = useTonConnect();
  const [currentTab, setCurrentTab] = useState(tabs[0].title);

  const handleChange = useCallback((newTab: string) => {
    setCurrentTab(newTab);
  }, []);

  const handleBuy = useCallback(() => {}, []);

  const handleSell = useCallback(
    async (nftAddress: string, jettonAddress: string, jettonPrice: string) => {
      const burnAddress = Address.parse(
        'EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c',
      );
      const userAddress = Address.parse(wallet?.account.address ?? '');

      const { stateInitCell, address } = await getStateInitToCreateSale({
        isComplete: false,
        createdAt: new Date().getDate(),
        marketplaceAddress: burnAddress,
        nftAddress: Address.parse(nftAddress),
        nftOwnerAddress: userAddress,
        fullPrice: '0',
        marketplaceFeeAddress: burnAddress,
        marketplaceFee: '0',
        royaltyAddress: burnAddress,
        royaltyAmount: '0',
        jettonsConfigured: true,
        jettonPrices: new Map([
          [
            Address.parse(jettonAddress),
            {
              fullPrice: jettonPrice.toString(),
              marketplaceFee: '0',
              royaltyAmount: '0',
            },
          ],
        ]),
      });

      await sendTransaction({
        messages: [
          {
            address: address.toString(),
            amount: '0.05',
            stateInit: stateInitCell.toBoc().toString('base64url'),
          },
        ],
        validUntil: Date.now() + 5 * 60 * 1000,
      });
    },
    [sendTransaction, wallet?.account.address],
  );

  return (
    <UIProvider>
      <Header />

      <Suspense fallback="">
        <div css={styles.content}>
          <div css={styles.tabs}>
            <Tabs activeTab={currentTab} onChange={handleChange} tabs={tabs} />
          </div>

          {currentTab === 'Sell NFT' && (
            <MarketplaceForm button="Sell" onSubmit={handleSell} />
          )}

          {currentTab === 'Buy NFT' && (
            <MarketplaceForm button="Buy" onSubmit={handleBuy} />
          )}
        </div>
      </Suspense>
    </UIProvider>
  );
};
