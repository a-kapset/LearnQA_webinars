import { Page } from '@playwright/test'

export abstract class BasePage {
  protected constructor(protected page: Page, protected url: string) {}

  public async visit() {
    this.page.goto(this.url, { waitUntil: 'domcontentloaded' })
  }
}
