import { LoginPage } from '../pages/LoginPage'
import { BooksPage } from '../pages/BooksPage'
import { ProfilePage } from '../pages/ProfilePage'
import { Page } from '@playwright/test'

export class Application {
  public readonly loginPage: LoginPage
  public readonly booksPage: BooksPage
  public readonly profilePage: ProfilePage

  constructor(private page: Page) {
    this.loginPage = new LoginPage(this.page)
    this.booksPage = new BooksPage(this.page)
    this.profilePage = new ProfilePage(this.page)
  }
}
