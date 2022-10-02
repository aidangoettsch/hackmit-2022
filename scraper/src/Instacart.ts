import Scraper from "./Scraper";

interface Retailer {
  id: string,
  slug: string,
}

interface Category {
  id: string,
  name: string,
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
  },
}

interface PartialItem {
  id: string,
  name: string,
  size: string,
  legacyV3Id: string,
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

    return res.searchResultsPlacements.placements[0].content.itemIds || res.searchResultsPlacements.placements[1].content.itemIds
  }

  async categories(shop: Shop) : Promise<Category[]> {
    await this.assertOk()

    const res = await this.scraper.graphQl({
      operationName: "DepartmentNavCollections",
      queryHash: "16bb4d841528dfc5dbded8ef86a65b3c835952705c8e383efe629c5ee7811477"
    }, {
      retailerInventorySessionToken: shop.retailerInventorySessionToken,
      includeSlugs: ['dynamic_collection-sales']
    })

    return res.deptCollections
  }

  async categoryItems(shop: Shop, category: Category): Promise<string[]> {
    await this.assertOk()

    const res = await this.scraper.graphQl({
      operationName: "CollectionProductsWithFeaturedProducts",
      queryHash: "a412726834531c3798cd0c3892ae8530c937007aef32fd8a3b395321be27366e"
    }, {
      retailerInventorySessionToken: shop.retailerInventorySessionToken,
      slug: category.slug,
      pageViewId: "",
      itemsDisplayType: "collections_nav_child_carousel",
      first: 0,
    })

    return res.collectionProducts.itemIds
  }

  async items(shop: Shop, ids: string[], zoneId: string, postalCode: string): Promise<Record<string, Item>> {
    await this.assertOk()
    const res: Record<string, PartialItem> = {}

    let i = 0
    while (i < ids.length) {
      const idSlice = ids.slice(i, i + 100)

      const itemsRes = await this.scraper.graphQl({
        operationName: "Items",
        queryHash: "d3cea12689b7676f4a2d159a25928b520ec89a907d5f9ac673dbcc4bd9ac85f7",
      }, {
        ids: idSlice,
      })

      for (const item of itemsRes.items) {
        res[item.id] = {
          id: item.id,
          name: item.name,
          legacyV3Id: item.legacyV3Id,
          productId: item.productId,
          brandId: item.brandId,
          brandName: item.brandName,
          size: item.size,
          imageUrl: item.viewSection.itemImage.url
        }
      }
      i += 100
    }

    i = 0
    while (i < ids.length) {
      const idSlice = ids.slice(i, i + 20)

      const itemPricesRes = await this.scraper.graphQl({
        operationName: "ItemsPricesQuery",
        queryHash: "9c3c87db5e918380532c64f0ae4de28d8e6d5765b5924fe5cb3cd853af7e38b6",
      }, {
        ids: idSlice,
        shopId: shop.id,
        zoneId: zoneId,
        postalCode: postalCode,
      })

      for (const item of itemPricesRes.itemPrices) {
        (res[item.id] as Item).priceString = item.viewSection.priceString
      }

      i += 20
    }

    return res as Record<string, Item>
  }

  async getCart(shop: Shop, addressId: string): Promise<string> {
    await this.assertOk()

    const res = await this.scraper.graphQl({
      operationName: "ActiveCartId",
      queryHash: "6218c9b050da9e2b65d16d9090ed45efe9d7d04e141ecd308046166a2d2d062c"
    }, {
      addressId,
      retailerInventorySessionToken: shop.retailerInventorySessionToken,
    })

    return res.shopBasket.cartId
  }

  async addToCart(items: Record<string, number>): Promise<void> {
    await this.assertOk()

    const page = await this.scraper.context.newPage()
    await page.goto("https://www.instacart.com/store/wegmans/storefront")

    for (const [item, qty] of Object.entries(items)) {
      await page.goto(`https://www.instacart.com/store/items/${item}`)
      if (qty !== 1) {
        await page.click('[aria-controls="quantity-dropdown"]')
        await page.click('#option-custom')
        await page.type('[placeholder="Enter an amount"]', qty.toString())
      }

      await page.click('.css-1fpvuyy-QuantityDropdownForm[data-testid="submit-button"]')
    }

    await page.close()
  }

  async checkout(): Promise<void> {
    await this.assertOk()

    const page = await this.scraper.context.newPage()
    await page.goto("https://www.instacart.com/store/checkout_v3")

    await page.click(".css-1saqw0d")
    await page.click('[text="Continue"]')

    await page.close()
  }
}

export default Instacart
