import Scraper from "./Scraper";
import Instacart from "./Instacart";
import { writeFile } from "fs/promises";
import { existsSync } from "fs";

const s = new Scraper()
const instacart = new Instacart(s)

async function main() {
  const shops = await instacart.shopCollection(["wegmans"], "02139", {
    "latitude": 42.3553372,
    "longitude": -71.0994406
  }, "484768145")

  const wegmansDelivery = shops.find(s => s.serviceType === "delivery")!!
  const ids = []

  // ids.push(...(await instacart.search(wegmansDelivery, "bread")))
  // ids.push(...(await instacart.search(wegmansDelivery, "cheese")))
  // ids.push(...(await instacart.search(wegmansDelivery, "beef")))

  const departments = await instacart.categories(wegmansDelivery)

  await writeFile(`data/departments.json`, JSON.stringify(Object.fromEntries(departments.map(d =>
    [d.slug, {
      id: d.id,
      name: d.name,
      slug: d.slug
    }]
  ))))

  for (const department of departments) {
    if (existsSync(`data/${department.slug}.json`)) {
      continue
    }
    const ids = await instacart.categoryItems(wegmansDelivery, department)

    const items = Object.values(await instacart.items(wegmansDelivery, ids, "392", "02139"))

    for (const i of items) {
      (i as any).category = department.slug
    }

    await writeFile(`data/${department.slug}.json`, JSON.stringify(items))
  }

  // const csvList = ["id,name,size,brandName,priceString", ...items.map(i =>
  //   `${i.id},${i.name.replace(",", " ")},${i.size.replace(",", " ")},${i.brandName},${i.priceString.replace(",", " ")}`
  // )]

  // await writeFile("data/sample.csv", csvList.join("\n"))

  await s.close()
}

main().then()
