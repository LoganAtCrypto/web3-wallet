import type { ProviderRpcError, WalletName } from '@react-web3-wallet/core';
import { Connector } from '@react-web3-wallet/core';

import { icon } from './assets';

const _walletName = 'MetaMask';
const walletName = _walletName as WalletName<typeof _walletName>;

export class MetaMask extends Connector {
  public static walletName: WalletName<string> = walletName;
  public static walletIcon: string = icon;
  public walletName: WalletName<string> = walletName;

  /** {@inheritdoc Connector.constructor} */
  constructor(options?: Connector['options']) {
    super({
      providerFilter: (p, info) => {
        return info ? info.rdns === 'io.metamask' : !!p.isMetaMask;
      },
      ...options,
    });
  }

  /**
   * {@inheritdoc Connector.constructor}
   *
   * Certain versions of MetaMask incorrectly emit the "disconnect" event when chain is changed.
   * need to override the default "onDisconnect" method, so that we don't reset the connector
   * store state.
   *
   * @see: https://github.com/MetaMask/metamask-extension/issues/13375#issuecomment-1027663334
   *
   */
  protected override onDisconnect(_: ProviderRpcError): void {}
}
