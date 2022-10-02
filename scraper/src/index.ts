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

  // const app = express()
  //
  // app.set('query parser', 'simple')
  //
  // app.get("/search", async (req, res) => {
  //   const searchTerm = req.query.q as (string | undefined)
  //
  //   if (!searchTerm) {
  //     res.sendStatus(401)
  //     re
  //     return
  //   }
  //
  //   const items = await instacart.search(wegmansDelivery, searchTerm)
  //
  //
  // })
  //
  // const port = process.env.PORT || 3000
  // app.listen(port, () => {
  //   console.log(`Scraper listening on port ${port}`)
  // })
}

main().then()
