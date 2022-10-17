import Web3 from 'web3'
import { TStakingData, web3EthLink, web3BscLink, stakingAddresses } from '@/views/staking/staking.types'

class StakingHelpers {
  private DECIMALS = 18
  private stakingData: TStakingData = {
    ethWeb3: null,
    bscWeb3: null,
    eth: {
      finalPriceUbxt: 0,
      lpStakedTotal: 0,
      tokenPerBlock: 0,
      totalAllocPoint: 0,
      ubxtBalance: 0,
      ubxtStaked: 0,
      totalUbxt: 0,
      balance: 0,
      totalLp: 0,
      farmAPY: 0,
      lpFarmAPY: 0
    },
    bsc: {
      finalPriceUbxt: 0,
      lpStakedTotal: 0,
      tokenPerBlock: 0,
      totalAllocPoint: 0,
      ubxtBalance: 0,
      ubxtStaked: 0,
      totalUbxt: 0,
      balance: 0,
      totalLp: 0,
      farmAPY: 0,
      lpFarmAPY: 0
    }
  }

  public async getUbxtPriceOnEth (): Promise<number> {
    if (this.stakingData.ethWeb3 === null) {
      return 0
    }

    const ubxtEthContract = new this.stakingData.ethWeb3.eth.Contract(
      stakingAddresses.pairAbi, stakingAddresses.UBXTPairAddress
    )
    let data = await ubxtEthContract.methods.getReserves().call()
    const ubxtEthPrice = data._reserve0 / data._reserve1
    const usdtEthContract = new this.stakingData.ethWeb3.eth.Contract(
      stakingAddresses.pairAbi, stakingAddresses.USDTETHPairAddress
    )
    data = await usdtEthContract.methods.getReserves().call()
    const usdtEthPrice = data._reserve0 / data._reserve1 / Math.pow(10, 12)
    this.stakingData.eth.finalPriceUbxt = 1 / (ubxtEthPrice * usdtEthPrice)
    return this.stakingData.eth.finalPriceUbxt
  }

  public async getStakedUbxtOnEth (): Promise<number> {
    if (this.stakingData.ethWeb3 === null) {
      return 0
    }

    const contract = new this.stakingData.ethWeb3.eth.Contract(
      stakingAddresses.stakingAbi, stakingAddresses.stakingAddress
    )
    this.stakingData.eth.ubxtStaked = await contract.methods.totalStakedUBXT().call()
    this.stakingData.eth.ubxtStaked = this.stakingData.eth.ubxtStaked / Math.pow(10, this.DECIMALS)
    this.stakingData.eth.totalUbxt = this.stakingData.eth.finalPriceUbxt * this.stakingData.eth.ubxtStaked
    return this.stakingData.eth.totalUbxt
  }

  public async getLpStakedUbxtOnEth (): Promise<number> {
    if (this.stakingData.ethWeb3 === null) {
      return 0
    }

    const contract = new this.stakingData.ethWeb3.eth.Contract(
      stakingAddresses.mockLpAbi, stakingAddresses.mockLpAddress
    )
    this.stakingData.eth.lpStakedTotal = await contract.methods.balanceOf(stakingAddresses.stakingAddress).call()
    this.stakingData.eth.lpStakedTotal = this.stakingData.eth.lpStakedTotal / Math.pow(10, this.DECIMALS)
    const lpPrice = 29
    this.stakingData.eth.totalLp = lpPrice * this.stakingData.eth.lpStakedTotal
    return this.stakingData.eth.totalLp
  }

  public async getTokenPerBlockOnEth (): Promise<void> {
    if (this.stakingData.ethWeb3 === null) {
      return
    }

    const contract = new this.stakingData.ethWeb3.eth.Contract(
      stakingAddresses.stakingAbi, stakingAddresses.stakingAddress
    )
    this.stakingData.eth.totalAllocPoint = await contract.methods.totalAllocPoint().call()
    this.stakingData.eth.tokenPerBlock = await contract.methods.tokenPerBlock().call()
    this.stakingData.eth.tokenPerBlock = this.stakingData.eth.tokenPerBlock / Math.pow(10, this.DECIMALS)
  }

  private aprToApy = (val: number) => 100 * (Math.pow(1 + val / 36500, 365) - 1)

  public async getFarmAPYOnEth (): Promise<void> {
    if (this.stakingData.ethWeb3 === null) {
      return
    }

    await this.getTokenPerBlockOnEth()
    const blockPerYear = 6560 * 365
    let poolInfo
    let poolAllocPoint
    let tokenPerBlock
    const contract = new this.stakingData.ethWeb3.eth.Contract(
      stakingAddresses.stakingAbi, stakingAddresses.stakingAddress
    )
    poolInfo = await contract.methods.poolInfo(0).call()
    if (poolInfo) {
      poolAllocPoint = poolInfo[1]
    }
    tokenPerBlock = (this.stakingData.eth.tokenPerBlock * poolAllocPoint) / this.stakingData.eth.totalAllocPoint
    const ubxtPrice = this.stakingData.eth.finalPriceUbxt
    const lpPrice = 29
    const apr = !this.stakingData.eth.ubxtStaked
      ? 0
      : ((tokenPerBlock * blockPerYear * ubxtPrice * 1.0) / (this.stakingData.eth.ubxtStaked * ubxtPrice)) * 100
    this.stakingData.eth.farmAPY = this.aprToApy(apr)
    poolInfo = await contract.methods.poolInfo(1).call()
    if (poolInfo) {
      poolAllocPoint = poolInfo[1]
    }
    tokenPerBlock = (this.stakingData.eth.tokenPerBlock * poolAllocPoint) / this.stakingData.eth.totalAllocPoint
    const lpApy = !this.stakingData.eth.lpStakedTotal
      ? 0
      : ((tokenPerBlock * blockPerYear * ubxtPrice * 1.0) / (this.stakingData.eth.lpStakedTotal * lpPrice)) * 100
    this.stakingData.eth.lpFarmAPY = lpApy
  }

  public async getUbxtPriceOnBsc (): Promise<number> {
    if (this.stakingData.bscWeb3 === null) {
      return 0
    }

    const bscUbxtBusdContract = new this.stakingData.bscWeb3.eth.Contract(
      stakingAddresses.bscPairAbi, stakingAddresses.bscUBXTPairAddress
    )
    const data = await bscUbxtBusdContract.methods.getReserves().call()
    const ubxtBusdPrice = data._reserve0 / data._reserve1
    this.stakingData.bsc.finalPriceUbxt = 1 / ubxtBusdPrice
    return this.stakingData.bsc.finalPriceUbxt
  }

  public async getStakedUbxtOnBsc (): Promise<number> {
    if (this.stakingData.bscWeb3 === null) {
      return 0
    }

    const contract = new this.stakingData.bscWeb3.eth.Contract(
      stakingAddresses.bscStakingAbi, stakingAddresses.bscStakingAddress
    )
    this.stakingData.bsc.ubxtStaked = await contract.methods.totalStakedUBXT().call()
    this.stakingData.bsc.ubxtStaked = this.stakingData.bsc.ubxtStaked / Math.pow(10, this.DECIMALS)
    this.stakingData.bsc.totalUbxt = this.stakingData.bsc.finalPriceUbxt * this.stakingData.bsc.ubxtStaked
    return this.stakingData.bsc.totalUbxt
  }

  public async getLpStakedUbxtOnBsc (): Promise<number> {
    if (this.stakingData.bscWeb3 === null) {
      return 0
    }

    const contract = new this.stakingData.bscWeb3.eth.Contract(
      stakingAddresses.bscMockLpAbi, stakingAddresses.bscMockLpAddress
    )
    this.stakingData.bsc.lpStakedTotal = await contract.methods.balanceOf(stakingAddresses.bscStakingAddress).call()
    this.stakingData.bsc.lpStakedTotal = this.stakingData.bsc.lpStakedTotal / Math.pow(10, this.DECIMALS)
    const lpPrice = 0.52
    this.stakingData.bsc.totalLp = lpPrice * this.stakingData.bsc.lpStakedTotal
    return this.stakingData.eth.totalLp
  }

  public async getTokenPerBlockOnBsc (): Promise<void> {
    if (this.stakingData.bscWeb3 === null) {
      return
    }

    const contract = new this.stakingData.bscWeb3.eth.Contract(
      stakingAddresses.bscStakingAbi, stakingAddresses.bscStakingAddress
    )
    this.stakingData.bsc.totalAllocPoint = await contract.methods.totalAllocPoint().call()
    this.stakingData.bsc.tokenPerBlock = await contract.methods.tokenPerBlock().call()
    this.stakingData.bsc.tokenPerBlock = this.stakingData.bsc.tokenPerBlock / Math.pow(10, this.DECIMALS)
  }

  public async getFarmAPYOnBsc (): Promise<void> {
    if (this.stakingData.bscWeb3 === null) {
      return
    }

    await this.getTokenPerBlockOnBsc()
    const blockPerYear = 20 * 60 * 24 * 365
    let poolInfo
    let poolAllocPoint
    let tokenPerBlock
    const contract = new this.stakingData.bscWeb3.eth.Contract(
      stakingAddresses.bscStakingAbi, stakingAddresses.bscStakingAddress
    )
    poolInfo = await contract.methods.poolInfo(0).call()
    if (poolInfo) {
      poolAllocPoint = poolInfo[1]
    }
    tokenPerBlock = (this.stakingData.bsc.tokenPerBlock * poolAllocPoint) / this.stakingData.bsc.totalAllocPoint
    const ubxtPrice = this.stakingData.bsc.finalPriceUbxt
    const lpPrice = 0.52
    const apr = !this.stakingData.bsc.ubxtStaked
      ? 0
      : ((tokenPerBlock * blockPerYear * ubxtPrice * 1.0) / (this.stakingData.bsc.ubxtStaked * ubxtPrice)) * 100
    this.stakingData.bsc.farmAPY = this.aprToApy(apr)
    poolInfo = await contract.methods.poolInfo(2).call()
    if (poolInfo) {
      poolAllocPoint = poolInfo[1]
    }
    tokenPerBlock = (this.stakingData.bsc.tokenPerBlock * poolAllocPoint) / this.stakingData.bsc.totalAllocPoint
    const lpApy = !this.stakingData.bsc.lpStakedTotal
      ? 0
      : ((tokenPerBlock * blockPerYear * ubxtPrice * 1.0) / (this.stakingData.bsc.lpStakedTotal * lpPrice)) * 100
    this.stakingData.bsc.lpFarmAPY = lpApy
  }

  public async calc (): Promise<void> {
    if (this.stakingData.ethWeb3 === null) {
      this.stakingData.ethWeb3 = new Web3(web3EthLink)
    }
    if (this.stakingData.bscWeb3 === null) {
      this.stakingData.bscWeb3 = new Web3(web3BscLink)
    }

    await this.getUbxtPriceOnEth()
    await this.getStakedUbxtOnEth()
    await this.getLpStakedUbxtOnEth()
    this.stakingData.eth.balance = this.stakingData.eth.totalUbxt + this.stakingData.eth.totalLp
    await this.getFarmAPYOnEth()

    await this.getUbxtPriceOnBsc()
    await this.getStakedUbxtOnBsc()
    await this.getLpStakedUbxtOnBsc()
    this.stakingData.bsc.balance = this.stakingData.bsc.totalUbxt + this.stakingData.bsc.totalLp
    await this.getFarmAPYOnBsc()
  }

  public async calcOnlyPrices (): Promise<void> {
    if (this.stakingData.ethWeb3 === null) {
      this.stakingData.ethWeb3 = new Web3(web3EthLink)
    }
    if (this.stakingData.bscWeb3 === null) {
      this.stakingData.bscWeb3 = new Web3(web3BscLink)
    }

    await this.getUbxtPriceOnEth()
    await this.getUbxtPriceOnBsc()
  }

  public async getEthBalance (accountAddress: string): Promise<void> {
    if (this.stakingData.ethWeb3 === null) {
      return
    }

    const contract = new this.stakingData.ethWeb3.eth.Contract(
      stakingAddresses.erc20Abi, stakingAddresses.contractAddress
    )
    this.stakingData.eth.ubxtBalance = await contract.methods.balanceOf(accountAddress).call()
    this.stakingData.eth.ubxtBalance = this.stakingData.eth.ubxtBalance / Math.pow(10, this.DECIMALS)
  }

  public async getBscBalance (accountAddress: string): Promise<void> {
    if (this.stakingData.bscWeb3 === null) {
      return
    }

    const contract = new this.stakingData.bscWeb3.eth.Contract(
      stakingAddresses.bscErc20Abi, stakingAddresses.bscContractAddress
    )
    this.stakingData.bsc.ubxtBalance = await contract.methods.balanceOf(accountAddress).call()
    this.stakingData.bsc.ubxtBalance = this.stakingData.bsc.ubxtBalance / Math.pow(10, this.DECIMALS)
  }

  public getData (): any {
    return this.stakingData
  }
}

export const stakingHelpers = new StakingHelpers()
