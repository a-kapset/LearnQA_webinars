import { Page } from '@playwright/test'
import { BasePage } from './BasePage'

export class ProfilePage extends BasePage {
  constructor(protected page: Page) {
    super(page, 'https://demoqa.com/login')
  }

  public getUserTitle(userName: string) {
    return this.page.getByText(userName)
  }
}
