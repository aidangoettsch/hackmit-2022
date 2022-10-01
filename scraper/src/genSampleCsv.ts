import Scraper from "./Scraper";
import Instacart from "./Instacart";
import { writeFile } from "fs/promises";

const s = new Scraper()
const instacart = new Instacart(s)

async function main() {
  const shops = await instacart.shopCollection(["wegmans"], "02139", {
    "latitude": 42.3553372,
    "longitude": -71.0994406
  }, "484768145")

  const wegmansDelivery = shops.find(s => s.serviceType === "delivery")!!
  const ids = []

  ids.push(...(await instacart.search(wegmansDelivery, "bread")))
  ids.push(...(await instacart.search(wegmansDelivery, "cheese")))
  ids.push(...(await instacart.search(wegmansDelivery, "beef")))

  const items = []

  let i = 0
  while (i < ids.length) {
    items.push(...Object.values(await instacart.items(wegmansDelivery, ids.slice(i, i + 10), "392", "02139")))
    i += 10
  }

  const csvList = ["id,name,size,brandName,priceString", ...items.map(i =>
    `${i.id},${i.name},${i.size},${i.brandName},${i.priceString}`
  )]

  await writeFile("data/sample.csv", csvList.join("\n"))
  await writeFile("data/sample.json", JSON.stringify(items))
}

main().then()
