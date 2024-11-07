import { expect, test } from '../fixtures/custom-fixtures'
import { GET_BOOKS_LIST, ONE_BOOK_MOCK } from '../mocks/book-mocks'

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

  test('Mocked book', async ({ application, mock }) => {
    await mock.routeGET(GET_BOOKS_LIST, ONE_BOOK_MOCK)

    await application.booksPage.visit()
    await application.booksPage.shouldHaveCountOfBooks(1)
  })

  test('New tab handling', async ({ application}) => {
    await application.browserWindowsPage.visit()
    const newTab = await application.browserWindowsPage.openNewTab()

    await expect(newTab).toHaveURL('/sample')
  })
})
