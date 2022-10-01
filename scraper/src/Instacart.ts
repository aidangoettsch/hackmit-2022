import Scraper from "./Scraper";

interface Retailer {
  id: string,
  slug: string,
}

interface Shop {
  id: string,
  retailerInventorySessionToken: string,
  retailer: Retailer,
  retailerLocationId: string,
  serviceType: "delivery" | "pickup",
  viewSection: {
    id: string
  }
}

interface PartialItem {
  id: string,
  name: string,
  size: string,
  productId: string,
  brandName: string,
  brandId: string,
  imageUrl: string,
}

type Item = PartialItem & {
  priceString: string,
}

class Instacart {
  constructor(private scraper: Scraper) {}

  async assertOk() {
    await this.scraper.assertLogin()
  }

  async shopCollection(slugs: string[], postalCode: string, coordinates: {
    latitude: number,
    longitude: number,
  }, addressId: string) : Promise<Shop[]> {
    await this.assertOk()

    return (await this.scraper.graphQl({
      operationName: "ShopCollection",
      queryHash: "f2ece8fe7364c9f1d6b2e986830d9930a59cfec011ec2ed6cb9f62f7b47c5428"
    }, {
      retailerSlugs: slugs,
      postalCode,
      coordinates,
      addressId,
      allowCanonicalFallback: false,
    })).shopCollection.shops
  }

  async search(shop: Shop, query: string) : Promise<string[]> {
    await this.assertOk()

    const res = await this.scraper.graphQl({
      operationName: "SearchResultsPlacements",
      queryHash: "6a0df28ab8c3bc3eb180664121acdc0363be794e9239912e5dd2c52583b41458"
    }, {
      query,
      pageViewId: "",
      retailerInventorySessionToken: shop.retailerInventorySessionToken,
      elevatedProductId: null,
      searchSource: "search",
      disableReformulation: false,
      orderBy: "default",
      autoSuggestImpressionId: null,
      clusterId: null,
      includeDebugInfo: false,
      clusteringStrategy: null,
      contentManagementSearchParams: {
        itemGridColumnCount: 5,
      },
    })

    return res.searchResultsPlacements.placements[0].content.itemIds
  }

  async items(shop: Shop, ids: string[], zoneId: string, postalCode: string): Promise<Record<string, Item>> {
    const res: Record<string, PartialItem> = {}

    let i = 0
    while (i < ids.length) {
      const idSlice = ids.slice(i, i + 10)
      const itemsRes = await this.scraper.graphQl({
        operationName: "Items",
        queryHash: "d3cea12689b7676f4a2d159a25928b520ec89a907d5f9ac673dbcc4bd9ac85f7",
      }, {
        ids: idSlice,
      })

      const itemPricesRes = await this.scraper.graphQl({
        operationName: "ItemsPricesQuery",
        queryHash: "9c3c87db5e918380532c64f0ae4de28d8e6d5765b5924fe5cb3cd853af7e38b6",
      }, {
        ids: idSlice,
        shopId: shop.id,
        zoneId: zoneId,
        postalCode: postalCode,
      })

      for (const item of itemsRes.items) {
        res[item.id] = {
          id: item.id,
          name: item.name,
          productId: item.productId,
          brandId: item.brandId,
          brandName: item.brandName,
          size: item.size,
          imageUrl: item.viewSection.itemImage.url
        }
      }

      for (const item of itemPricesRes.itemPrices) {
        (res[item.id] as Item).priceString = item.viewSection.priceString
      }

      i += 10
    }

    return res as Record<string, Item>
  }
}

export default Instacart
