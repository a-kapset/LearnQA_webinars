import { LoginPage } from '../pages/LoginPage'
import { BooksPage } from '../pages/BooksPage'
import { ProfilePage } from '../pages/ProfilePage'
import { BrowserWindowsPage } from '../pages/BrowserWindowsPage'
import { Page } from '@playwright/test'

export class Application {
  constructor(
    private page: Page,
    public readonly loginPage: LoginPage,
    public readonly booksPage: BooksPage,
    public readonly profilePage: ProfilePage,
    public readonly browserWindowsPage: BrowserWindowsPage
  ) {
    this.loginPage = new LoginPage(this.page)
    this.booksPage = new BooksPage(this.page)
    this.profilePage = new ProfilePage(this.page)
    this.browserWindowsPage = new BrowserWindowsPage(this.page)
  }
}
