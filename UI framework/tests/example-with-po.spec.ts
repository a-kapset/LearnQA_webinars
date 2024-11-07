import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { ProfilePage } from '../pages/ProfilePage'
import { BooksPage } from '../pages/BooksPage'

test.describe('example', () => {
  test('Successful login', async ({ page }) => {
    const loginPage = new LoginPage(page)
    const profilePage = new ProfilePage(page)
    const userName = 'Playwright Demo'
    const password = 'ThePassword@123'
    const expectedURL = 'https://demoqa.com/profile'

    await loginPage.visit()
    await loginPage.fillUserInput(userName)
    await loginPage.fillUserPassword(password)
    await loginPage.clickLoginButton()

    await expect(page).toHaveURL(expectedURL)
    await expect(profilePage.getUserTitle(userName)).toBeVisible()
  })

  test('Failed login', async ({ page }) => {
    const loginPage = new LoginPage(page)
    const userName = 'Playwright Demo'
    const password = 'notValidPassword'

    await loginPage.visit()
    await loginPage.loginWithCredentials(userName, password)
    await loginPage.shouldHaveErrorMessage('Invalid username or password!')
  })

  test('Login button exists on books page', async ({ page }) => {
    const booksPage = new BooksPage(page)

    await booksPage.visit()
    await booksPage.shouldHaveLoginButton()
  })
})
