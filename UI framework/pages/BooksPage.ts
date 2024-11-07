import { expect, Locator, Page } from '@playwright/test'
import { BasePage } from './BasePage'

export class BooksPage extends BasePage {
  readonly loginButton: Locator

  constructor(protected page: Page) {
    super(page, 'https://demoqa.com/books')
    this.loginButton = this.page.locator('button#login')
  }

  public async shouldHaveLoginButton() {
    await expect(this.loginButton).toBeVisible()
  }
}
