import { useTonConnectUI } from '@tonconnect/ui-react';
import { SenderArguments } from 'ton-core';

export function useTonConnect() {
  const [{ sendTransaction, connected, wallet, account }] = useTonConnectUI();

  return {
    sender: {
      send: async (args: SenderArguments) => {
        sendTransaction({
          messages: [
            {
              address: args.to.toString(),
              amount: args.value.toString(),
              payload: args.body?.toBoc().toString('base64'),
            },
          ],
          validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
        });
      },
    },
    sendTransaction,
    connected: connected,
    wallet,
    account,
  };
}
