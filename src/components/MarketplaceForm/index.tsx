import { css } from '@emotion/react';
import { ChangeEvent, useCallback, useState } from 'react';
import { Button } from 'components/Button';
import { TextField } from 'components/TextField';
import { Theme } from 'types';

type Props = {
  button: string;
  onSubmit: (
    nftAddress: string,
    jettonAddress: string,
    jettonPrice: string,
  ) => void;
};

const styles = {
  container: (theme: Theme) => css`
    padding: ${theme.sizing(2, 0)};
    width: 100%;

    &:last-of-type {
      padding-top: 0;
    }
  `,
};

export const MarketplaceForm = ({ button, onSubmit }: Props) => {
  const [nftAddress, setNftAddress] = useState('');
  const [jettonAddress, setJettonAddress] = useState('');
  const [jettonPrice, setJettonPrice] = useState('0');

  const handleChange = useCallback(
    (type: 'nft' | 'jetton' | 'price') =>
      (event: ChangeEvent<HTMLInputElement>) => {
        if (type === 'nft') {
          setNftAddress(event.target.value);
          return;
        }

        if (type === 'price') {
          setJettonPrice(event.target.value);
          return;
        }

        setJettonAddress(event.target.value);
      },
    [],
  );

  const handleClick = useCallback(() => {
    onSubmit(nftAddress, jettonAddress, jettonPrice);
  }, [jettonAddress, jettonPrice, nftAddress, onSubmit]);

  return (
    <>
      <TextField
        onChange={handleChange('nft')}
        value={nftAddress}
        name="nftAddress"
        placeholder="NFT Address"
      />

      <div css={styles.container}>
        <TextField
          onChange={handleChange('jetton')}
          value={jettonAddress}
          name="jettonAddress"
          placeholder="Jetton Address"
        />
      </div>

      <div css={styles.container}>
        <TextField
          onChange={handleChange('price')}
          value={jettonPrice}
          name="jettonPrice"
          placeholder="Jetton Price"
        />
      </div>

      <Button onClick={handleClick}>{button}</Button>
    </>
  );
};
