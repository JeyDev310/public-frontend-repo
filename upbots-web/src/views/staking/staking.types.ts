import Web3 from 'web3'
import { AbiItem } from 'web3-utils'

import abistaking from '../../utils/contract/abistaking.json'
import abisushipair from '../../utils/contract/abisushipair.json'
import abiunipair from '../../utils/contract/abiunipair.json'
import abiubxt from '../../utils/contract/abiubxt.json'

import abibscstaking from '../../utils/contract/abibscstaking.json'
import abicakepair from '../../utils/contract/abicakepair.json'
import abibscubxt from '../../utils/contract/abibscubxt.json'

export type TStakingData = {
  // isWalletConnectMode: boolean;
  // isMetamaskEnabled: boolean;
  // decimals: number;
  ethWeb3: null | Web3;
  bscWeb3: null | Web3;
  eth: any;
  bsc: any;
}

export enum ESummaryTypes {
  UNIQUE = 'currency',
  GLOBAL = 'percent',
}

export interface IStakingSummary {
  title: string;
  value: number;
  type: ESummaryTypes;
}

export interface IStakingData {
  title: string;
  coin: string;
  value: number;
  valueUsd?: number;
}

export interface IStakingBenefit {
  currentFeeOff: number;
  latestLevel: number;
  accessCommunityBots: boolean;
  accessCreateBot: boolean;
  prizeNFT: string;
}

export interface IStakingUBXTAmount {
  ubxtStakingAmount: number;
  botsAccess: boolean;
}

export interface IStakingReward {
  level: number;
  minUBXT: number;
  currentFeeOff: number;
}

export const web3EthLink = 'https://mainnet.infura.io/v3/c8a44c9e107f440cae5a5006fc6de3d8'
export const web3BscLink = 'https://bsc-dataseed1.binance.org:443'

export const stakingAddresses = {
  USDTETHPairAddress: '0x06da0fd433c1a5d7a4faa01111c044910a184553',
  UBXTPairAddress: '0xbcd6a2ddafbaa7f424698ed69e717c0c0f1e99bf',
  stakingAddress: '0x6f87364176265cad6ffc70ad2a795630395a8c24',
  mockLpAddress: '0x6a928D733606943559556F7eb22057C1964ce56a',
  contractAddress: '0x8564653879a18C560E7C0Ea0E084c516C62F5653',
  stakingAbi: abistaking as AbiItem[],
  pairAbi: abisushipair as AbiItem[],
  mockLpAbi: abiunipair as AbiItem[],
  erc20Abi: abiubxt as AbiItem[],

  bscUSDTETHPairAddress: '0x06da0fd433c1a5d7a4faa01111c044910a184553',
  bscUBXTPairAddress: '0x8D3FF27D2aD6a9556B7C4F82F4d602D20114bC90',
  bscStakingAddress: '0x2500C97d1eBD63275DdC3511c825c4d73335Cb77',
  bscMockLpAddress: '0x8D3FF27D2aD6a9556B7C4F82F4d602D20114bC90',
  bscContractAddress: '0xBbEB90cFb6FAFa1F69AA130B7341089AbeEF5811',
  bscStakingAbi: abibscstaking as AbiItem[],
  bscPairAbi: abicakepair as AbiItem[],
  bscMockLpAbi: abicakepair as AbiItem[],
  bscErc20Abi: abibscubxt as AbiItem[]
}
