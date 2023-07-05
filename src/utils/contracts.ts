import { Address, beginCell, Cell, contractAddress, toNano, Dictionary, DictionaryValue} from "../../node_modules/ton-core/dist/index"

type NftJettonFixpriceSaleV1Data = {
    isComplete: boolean
    createdAt: number
    marketplaceAddress: Address
    nftAddress: Address
    nftOwnerAddress: Address | null
    fullPrice: string
    marketplaceFeeAddress: Address
    marketplaceFee: string
    royaltyAddress: Address
    royaltyAmount: string
    jettonsConfigured?: boolean,
    jettonPrices: Map<Address, { fullPrice: string, marketplaceFee: string, royaltyAmount: string }> | null
  }


export async function getBodyToCancelSale(params: { queryId?: number }) {
    const body = beginCell()
    body.storeUint(3, 32)
    body.storeUint(params.queryId ?? 0, 64)
    return body
}

const JettonPricesDictionaryValue: DictionaryValue< { fullPrice: string, marketplaceFee: string, royaltyAmount: string } > = {
    serialize(src: { fullPrice: string, marketplaceFee: string, royaltyAmount: string }, builder) {
      builder.storeCoins(toNano(src.fullPrice))
      builder.storeCoins(toNano(src.marketplaceFee))
      builder.storeCoins(toNano(src.royaltyAmount))
    },
    parse() {
      return { fullPrice: '', marketplaceFee: '', royaltyAmount: '' }
    },
  }

export function buildJettonPricesDict(jettons: Map<Address, { fullPrice: string, marketplaceFee: string, royaltyAmount: string }>) {
    const jettonsDict = Dictionary.empty(Dictionary.Keys.Int(256), JettonPricesDictionaryValue)
    jettons.forEach((value, key) => {
        jettonsDict.set(key.hash, value)
    })
    return jettonsDict;
  }

export async function getStateInitToCreateSale(data: NftJettonFixpriceSaleV1Data) {
    const NftJettonFixpriceSaleV1CodeBoc =
  'te6ccsECEwEABW0AAA0AEgBAAEUASgDGAUoBsgISAhYCdALzA08DzAPjBGME5QT7BW0BFP8A9KQT9LzyyAsBAgFiAwIAV6A4WdqJoaQBpj/0gfSB9IH0AamkAegIYGIDofSB9AH0gfQAYQQgjJKwlKtBAgLMDQQCAdQLBQHxAH6APoA+gAwU0K5ghA7msoAUpC5sY5fXwNsRDQ0NDUzIX9wIcD/k1twf95wIIIQD4p+pcjLHxjLP1AF+gJQBc8WWM8WFMoAI/oCywDJcYAQyMsFUAXPFiKSM3CYggpiWgBQBKDiE/oCE8tqzMkBkoBAkXHi+wDgKoAYD/tD6QPoA+kD6ADAwMVNDoSOhULqhKFRGMFYQVCyjDXAhwP+TW3B/3nAgghAPin6lyMsfGMs/UAX6AlAFzxZYzxYUygAj+gLLAMlxgBDIywVQBc8WIpIzcJiCCmJaAFAEoOIT+gITy2rMyQGSgECRceL7ACDCACnXScICsOMPcCUKCQcCyFEwSJNSaXAhwP+TW3B/3nAgghAPin6lyMsfGMs/UAX6AlAFzxZYzxYUygAj+gLLAMlxgBDIywVQBc8WIpIzcJiCCmJaAFAEoOIT+gITy2rMyQGSgECRceL7AFMDvJMTXwPjDSYIDAC8UAOhcCRURDBSUHAhwP+TW3B/3nAgghAPin6lyMsfGMs/UAX6AlAFzxZYzxYUygAj+gLLAMlxgBDIywVQBc8WIpIzcJiCCmJaAFAEoOIT+gITy2rMyQGSgECRceL7AAAEMDcAuHAnUTVLM1KMcCHA/5NbcH/ecCCCEA+KfqXIyx8Yyz9QBfoCUAXPFljPFhTKACP6AssAyXGAEMjLBVAFzxYikjNwmIIKYloAUASg4hP6AhPLaszJAZKAQJFx4vsAAfcJsMA8uHDghA7msoAUnCgUjC+8uHCJdD6QPoA+kD6ADBToqEhoVCHoRagUqBwgBDIywVQA88WAfoCy2rJcfsAJcIAJddJwgKwjhdQRXCAEMjLBVADzxYB+gLLaslx+wAQI5I0NOJacIAQyMsFUAPPFgH6AstqyXH7AFEWgDAC0cCCCEF/MPRTIyx8Vyz8jzxZQA88WE8oAggnJw4D6AsoAyXGAGMjLBVADzxZw+gISy2rMyYMG+wB/VWB/AQjIygAXyx9QBc8WUAPPFgHPFgH6AszKAPQAye1UBO3YDoaYGAuNhJL4JwfSAYdqJoaQBpj/0gfSB9IH0AamkAegIYOCmF44BgAEwthWmP6Z+mZm8Q4AHxgRDAgRXdFeB/2Cnk44LYTwhnL4dqGGhpg+oYAP2AcBNrpOEBElhBCDmxaE4pGF1xgRiVeWjKcYGZHByUYABBIQDw4AKpg4VUREM3DwCOAQil8KwAHchA/y8AD8PDxThccFghAIItiuUsC6sI4yODk5BZJfCOAF9AQwEDdGUBRDMH8BCMjKABfLH1AFzxZQA88WAc8WAfoCzMoA9ADJ7VTgM1FzxwXy4fSCEAUTjZEZuvLh9Qb6QDAQSFUzEgjIygAXyx9QBc8WUAPPFgHPFgH6AszKAPQAye1UAf4yMyr6RAHAAPLhxAz6APpAMFHTgwf0Dm+hsxyxArMSsY5cMVC8XwlRMX9wIcD/k1twf95wIIIQD4p+pcjLHxjLP1AF+gJQBc8WWM8WFMoAI/oCywDJcYAQyMsFUAXPFiKSM3CYggpiWgBQBKDiE/oCE8tqzMkBkoBAkXHi+wDgEQAoEI0QfBBrEFoQSRA4FxA2UFIU8AkA4DE5OjuCEDuaygAavvLhyVNhxwVRdMcFF7Hy4cpwIIIQX8w9FCGAEMjLBSbPFiH6Astqyx8Xyz8izxYizxYWygAl+gIVygDJgED7AH8IEDdGBUMTCMjKABfLH1AFzxZQA88WAc8WAfoCzMoA9ADJ7VRCLg1R'
    const NftJettonFixpriceSaleV1CodeCell = Cell.fromBase64(NftJettonFixpriceSaleV1CodeBoc);

    const feesCell = beginCell()

    feesCell.storeAddress(data.marketplaceFeeAddress)
    feesCell.storeCoins(toNano(data.marketplaceFee))
    feesCell.storeAddress(data.royaltyAddress)
    feesCell.storeCoins(toNano(data.royaltyAmount))
  
    const dataCell = beginCell()
  
    dataCell.storeBit(data.isComplete)
    dataCell.storeUint(data.createdAt, 32)
    dataCell.storeAddress(data.marketplaceAddress)
    dataCell.storeAddress(data.nftAddress)
    dataCell.storeAddress(data.nftOwnerAddress)
    dataCell.storeCoins(toNano(data.fullPrice))
    dataCell.storeRef(feesCell)
  
    dataCell.storeBit(data.jettonsConfigured || false)
    if (data.jettonPrices && data.jettonPrices.size > 0) {
      dataCell.storeBit(1)
      dataCell.storeDict(buildJettonPricesDict(data.jettonPrices))
    } else {
      dataCell.storeBit(0)
    }

    const stateInit = {data: dataCell.endCell(), code: NftJettonFixpriceSaleV1CodeCell}
    const address = contractAddress(0, stateInit)
    return {stateInit, address};
}