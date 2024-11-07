import { expect, Locator, Page } from '@playwright/test'
import { BasePage } from './BasePage'

export class BooksPage extends BasePage {
  readonly loginButton: Locator
  private readonly bookTitle: Locator

  constructor(protected page: Page) {
    super(page, '/books')
    this.loginButton = this.page.locator('button#login')
    this.bookTitle = this.page.locator(`div[role='gridcell'] a`)
  }

  public async shouldHaveLoginButton() {
    await expect(this.loginButton).toBeVisible()
  }

  public async shouldHaveCountOfBooks(count: number) {
    await expect(this.bookTitle).toHaveCount(count)
  }
}
