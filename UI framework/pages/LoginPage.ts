import { expect, Locator, Page } from '@playwright/test'
import { BasePage } from './BasePage'

export class LoginPage extends BasePage {
  readonly userNameInput: Locator
  readonly passwordInput: Locator
  readonly loginButton: Locator

  constructor(protected page: Page) {
    super(page, '/login')
    this.userNameInput = this.page.locator('#userName')
    this.passwordInput = this.page.locator('#password')
    this.loginButton = this.page.locator('#login')
  }



  public async loginWithCredentials(userName: string, password: string) {
    await this.fillUserInput(userName)
    await this.fillUserPassword(password)
    await this.clickLoginButton()
  }

  public async fillUserInput(userName: string) {
    await this.userNameInput.type(userName)
  }

  public async fillUserPassword(password: string) {
    await this.passwordInput.fill(password)
  }

  public async clickLoginButton() {
    await this.loginButton.click()
  }

  // assertions
  public async shouldHaveErrorMessage(errorText: string) {
    const errorMessage = this.page.getByText(errorText, { exact: true })
    await expect(errorMessage).toBeVisible()
  }
}
