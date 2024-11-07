import { test, expect, Page } from '@playwright/test'

export abstract class BasePage {
  protected constructor(protected page: Page, protected url: string) {}

  public async visit() {
    await test.step(`Go to ${this.constructor.name}`, async () => {
      this.page.goto(this.url, { waitUntil: 'domcontentloaded' })
    })
  }

  public async shouldBeOpened() {
    await test.step(`Check that ${this.constructor.name} has ${this.url} URL`, async () => {
      await expect(this.page).toHaveURL(this.url)
    })
  }
}
