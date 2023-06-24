import { TonConnectButton } from '@tonconnect/ui-react';
import { useTonConnect } from './hooks/useTonConnect';

export const App = () => {
  const { connected } = useTonConnect();

  return (
    <div className='App'>
      <TonConnectButton />

      <div className='Card'>
        <b>Connected: {String(connected)}</b>
      </div>
    </div>
  );
}
