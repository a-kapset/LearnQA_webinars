import { test } from '../fixtures/custom-fixtures'

const userName = process.env.USER_NAME as string
const password = process.env.PASSWORD as string
const invalidPassword = 'InvalidPassword'

test.describe('Example with PO', () => {
  test('Successful login', async ({ application }) => {
    await application.loginPage.visit()
    await application.loginPage.fillUserInput(userName)
    await application.loginPage.fillUserPassword(password)
    await application.loginPage.clickLoginButton()

    await application.profilePage.shouldBeOpened()
    await application.profilePage.shouldHaveUserTitleWithName(userName)
  })

  test('Failed login', async ({ application }) => {
    await application.loginPage.visit()
    await application.loginPage.loginWithCredentials(userName, invalidPassword)
    await application.loginPage.shouldHaveErrorMessage('Invalid username or password!')
  })

  test('Login button exists on books page', async ({ application }) => {
    await application.booksPage.visit()
    await application.booksPage.shouldHaveLoginButton()
  })
})
