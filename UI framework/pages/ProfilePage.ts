import { expect, Page } from '@playwright/test'
import { BasePage } from './BasePage'

export class ProfilePage extends BasePage {
  constructor(protected page: Page) {
    super(page, '/login')
  }

  public getUserTitle(userName: string) {
    return this.page.getByText(userName)
  }

  public async shouldHaveUserTitleWithName(userName: string) {
    await expect(this.getUserTitle(userName)).toBeVisible()
  }
}
