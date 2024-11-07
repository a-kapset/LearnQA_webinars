import { test, expect } from '@playwright/test'

test.describe('example', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demoqa.com/login', { waitUntil: 'domcontentloaded' })
  })

  test('Login title', async ({ page }) => {
    const title = page.locator('h1.text-center')

    await title.evaluate((el) => {
      el.textContent = 'Loading'

      setTimeout(() => {
        el.textContent = 'Login'
      }, 3000)
    })

    await expect(title).toHaveText('Login')
  })

  test('Successful login', async ({ page }) => {
    const userName = 'Playwright Demo'
    const password = 'ThePassword@123'
    const expectedURL = 'https://demoqa.com/profile'

    const userNameInput = page.locator('#userName')
    const passwordInput = page.locator('#password')
    const loginButton = page.locator('#login')
    const userNameValue = page.getByText(userName)

    await userNameInput.type(userName)
    await passwordInput.fill(password)
    await loginButton.click()

    await expect(page).toHaveURL(expectedURL)
    await expect(userNameValue).toBeVisible()
  })

  test('Failed login', async ({ page }) => {
    const userName = 'Playwright Demo'
    const password = 'notValidPassword'

    const userNameInput = page.locator('#userName')
    const passwordInput = page.locator('#password')
    const loginButton = page.locator('#login')
    const errorMessage = page.getByText('Invalid username or password!', { exact: true })

    await userNameInput.type(userName)
    await passwordInput.fill(password)
    await loginButton.click()
    await expect(errorMessage).toBeVisible()
  })
})

test.describe.only('Parametrized tests', () => {
  // IMPORTANT: beforeAll and afterAll work in each worker - if 4 workers started then beforeAll and afterAll will work 4 times
  test.beforeAll(async () => {
    console.log('>>>>> Before all tests')
  })

  test.beforeEach(async ({}, testInfo) => {
    console.log('>>>>> Before each test')
    console.log(`${testInfo.title} starts`)
  })

  test.afterEach(async ({}, testInfo) => {
    console.log('>>>>> After each test')
    console.log(`${testInfo.title} ended`)
  })

  test.afterAll(async () => {
    console.log('>>>>> After all tests')
  })

  const bookNames = [
    'Git Pocket Guide',
    'Learning JavaScript Design Patterns',
    'Designing Evolvable Web APIs with ASP.NET',
    'Speaking JavaScript',
    "You Don't Know JS",
    'Programming JavaScript Applications',
    'Eloquent JavaScript, Second Edition',
    'Understanding ECMAScript 6',
  ]

  for (const bookName of bookNames) {
    test(`Book ${bookName} is displayed`, async ({ page }) => {
      await page.goto('https://demoqa.com/books', { waitUntil: 'domcontentloaded' })

      const book = page.locator(`div[role='gridcell'] a`, { hasText: bookName })

      await expect(book).toBeVisible()
    })
  }
})
