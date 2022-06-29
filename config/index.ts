import {
  SUPPORTED_CHAINS,
  MAINNET_CHAIN_ID,
  ETH_STANDARD_PATH,
} from '../constants';
import {IAppConfig} from '../helpers/types';
import {getRpcEngine} from '../engines';

const appConfig: IAppConfig = {
  name: 'GovtechWallet',
  logo: '',
  chainId: MAINNET_CHAIN_ID,
  derivationPath: ETH_STANDARD_PATH,
  numberOfAccounts: 1,
  colors: {
    defaultColor: '12, 12, 13',
    backgroundColor: '40, 44, 52',
  },
  chains: SUPPORTED_CHAINS,
  styleOpts: {
    showPasteUri: true,
    showVersion: true,
  },
  rpcEngine: getRpcEngine(),
  events: {
    init: () => Promise.resolve(),
    update: () => Promise.resolve(),
  },
};

export function getAppConfig(): IAppConfig {
  return appConfig;
}
