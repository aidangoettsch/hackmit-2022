import Scraper from "./Scraper";
import Instacart from "./Instacart";

const s = new Scraper()
const instacart = new Instacart(s)

async function main() {
  const address = "484768145"
  const shops = await instacart.shopCollection(["wegmans"], "02139", {
    "latitude": 42.3553372,
    "longitude": -71.0994406
  }, address)

  const wegmansDelivery = shops.find(s => s.serviceType === "delivery")!!

  const bread = (await instacart.search(wegmansDelivery, "bread"))[0]
  const items = await instacart.items(wegmansDelivery, [bread], "392", "02139")

  // await instacart.addToCart({
  //   [items[bread].legacyV3Id]: 1,
  // })

  await instacart.checkout()
}

main().then()
