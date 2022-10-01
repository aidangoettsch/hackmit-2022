import {BrowserContext, chromium, Page } from "playwright"
import fs from "fs";
import fsP from "fs/promises";

export interface Query {
  operationName: string,
  queryHash: string,
}

class Scraper {
  private context!: BrowserContext
  private storageState: any

  constructor() {}

  private async assertBrowser(): Promise<void> {
    if (!this.context) {
      const b = await chromium.launch({
        headless: false
      })

      if (fs.existsSync("cache/state.json")) {
        this.storageState = JSON.parse((await fsP.readFile("cache/state.json")).toString())
      }

      this.context = await b.newContext(this.storageState ? {
        storageState: this.storageState
      } : {});
    }
  }

  async assertLogin(): Promise<void> {
    if (this.storageState) {
      return
    }
    await this.assertBrowser()
    const p = await this.context.newPage()

    await p.goto("https://www.instacart.com/login")
    try {
      await p.waitForURL("https://www.instacart.com/store", {
        timeout: 1000,
        waitUntil: "domcontentloaded",
      })
    } catch (e) {
      await this.login(p)
    }

    await p.close()
  }

  async login(p: Page): Promise<void> {
    await this.assertBrowser()

    const creds : {
      username: string,
      password: string
    } = JSON.parse((await fsP.readFile("cache/creds.json")).toString())

    await p.fill('[name="email"]', creds.username)
    await p.fill('[name="password"]', creds.password)

    await p.click('[type="submit"]')

    await p.waitForURL("https://www.instacart.com/store")
    await p.waitForTimeout(20000)

    this.storageState = await this.context.storageState({ path: "cache/state.json" })
  }

  async graphQl<T = any>(query: Query, variables: any) : Promise<T> {
    await this.assertLogin()

    const qs = new URLSearchParams({
      operationName: query.operationName,
      variables: JSON.stringify(variables),
      extensions: JSON.stringify({
        persistedQuery: {
          version: 1,
          sha256Hash: query.queryHash,
        }
      })
    })

    const url = `https://www.instacart.com/graphql?${qs}`
    console.log(url)

    const res = await (await this.context.request.get(url)).json()
    if (!res.data) {
      throw new Error(JSON.stringify(res.errors))
    }

    return res.data
  }
}

export default Scraper
