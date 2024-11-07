import { Locator, Page } from '@playwright/test'
import { BasePage } from './BasePage'

export class BrowserWindowsPage extends BasePage {
  readonly newTabButton: Locator

  constructor(protected page: Page) {
    super(page, '/browser-windows')
    this.newTabButton = this.page.locator('button#tabButton')
  }

  public async openNewTab(): Promise<Page> {
    // const pagePromise = this.page.context().waitForEvent('page')
    // await this.newTabButton.click() // new tab is opened here
    // return await pagePromise

    const [newPage] = await Promise.all([this.page.context().waitForEvent('page'), this.newTabButton.click()])

    return newPage
  }
}
