import { TonConnectButton } from '@tonconnect/ui-react';
import { styles } from './Header.styles';

export const Header = () => (
  <header css={styles.header}>
    <img src="/images/ton.png" alt="TON Logo" />

    <TonConnectButton />
  </header>
);
