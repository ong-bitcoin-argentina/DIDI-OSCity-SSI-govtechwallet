import * as ethers from 'ethers';
import '@ethersproject/shims';
import {setLocal, getLocal} from '../helpers/local';
import {
  ENTROPY_KEY,
  MNEMONIC_KEY,
  DEFAULT_ACTIVE_INDEX,
  DEFAULT_CHAIN_ID,
} from '../constants/default';
import {getAppConfig} from '../config';

export class WalletController {
  public path: string;
  public entropy: string;
  public mnemonic: string;
  public wallet: ethers.Wallet;

  public activeIndex: number = DEFAULT_ACTIVE_INDEX;
  public activeChainId: number = DEFAULT_CHAIN_ID;

  constructor() {
    this.path = this.getPath();
    this.entropy = this.getEntropy();
    this.mnemonic = this.getMnemonic();
    this.wallet = this.init();
  }

  get provider(): ethers.providers.Provider {
    return this.wallet.provider;
  }

  public isActive() {
    if (!this.wallet) {
      return this.wallet;
    }
    return null;
  }

  public getIndex() {
    return this.activeIndex;
  }

  public getWallet(index?: number, chainId?: number): ethers.Wallet {
    if (
      !this.wallet ||
      this.activeIndex === index ||
      this.activeChainId === chainId
    ) {
      return this.init(index, chainId);
    }
    return this.wallet;
  }

  public getAccounts(count = getAppConfig().numberOfAccounts) {
    const accounts = [];
    let wallet = null;
    for (let i = 0; i < count; i++) {
      wallet = this.generateWallet(i);
      accounts.push(wallet.address);
    }
    return accounts;
  }

  public getData(key: string): string {
    let value = '';
    getLocal(key).then(v => (value = v));
    if (!value) {
      switch (key) {
        case ENTROPY_KEY:
          value = this.generateEntropy();
          break;
        case MNEMONIC_KEY:
          value = this.generateMnemonic();
          break;
        default:
          throw new Error(`Unknown data key: ${key}`);
      }
      setLocal(key, value);
    }
    return value;
  }

  public getPath(index: number = this.activeIndex) {
    this.path = `${getAppConfig().derivationPath}/${index}`;
    return this.path;
  }

  public generateEntropy(): string {
    this.entropy = ethers.utils.hexlify(ethers.utils.randomBytes(16));
    return this.entropy;
  }

  public generateMnemonic() {
    this.mnemonic = ethers.utils.entropyToMnemonic(this.getEntropy());
    return this.mnemonic;
  }

  public generateWallet(index: number) {
    this.wallet = ethers.Wallet.fromMnemonic(
      this.getMnemonic(),
      this.getPath(index),
    );
    return this.wallet;
  }

  public getEntropy(): string {
    return this.getData(ENTROPY_KEY);
  }

  public getMnemonic(): string {
    return this.getData(MNEMONIC_KEY);
  }

  public init(
    index = DEFAULT_ACTIVE_INDEX,
    chainId = DEFAULT_CHAIN_ID,
  ): ethers.Wallet {
    return this.update(index, chainId);
  }

  public update(index: number, chainId: number): ethers.Wallet {
    const firstUpdate = typeof this.wallet === 'undefined';
    this.activeIndex = index;
    this.activeChainId = chainId;
    this.generateWallet(index);
    if (!firstUpdate) {
      // update another controller if necessary here
    }
    return this.wallet;
  }
}

export function getWalletController() {
  return new WalletController();
}
