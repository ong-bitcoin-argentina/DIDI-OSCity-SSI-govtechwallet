import {IChainData} from '../helpers/types';

export const SUPPORTED_CHAINS: IChainData[] = [
  {
    name: 'Lacchain',
    short_name: 'lac',
    chain: 'LAC',
    network: 'mainnet',
    chain_id: 648529,
    network_id: 648529,
    rpc_url: 'http://35.239.55.127/nodo',
    native_currency: {
      symbol: 'LAC',
      name: 'LAC',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
];
