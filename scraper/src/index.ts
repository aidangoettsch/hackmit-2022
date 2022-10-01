import Scraper from "./Scraper";
import Instacart from "./Instacart";

const s = new Scraper()
const instacart = new Instacart(s)

async function main() {
  const shops = await instacart.shopCollection(["wegmans"], "02139", {
    "latitude": 42.3553372,
    "longitude": -71.0994406
  }, "484768145")

  const wegmansDelivery = shops.find(s => s.serviceType === "delivery")!!
  const items = await instacart.search(wegmansDelivery, "bread")

  console.log(await instacart.items(wegmansDelivery, items, "392", "02139"))
}

main().then()
