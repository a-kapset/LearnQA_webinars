import { test as base } from '@playwright/test'
import { Application } from './Application'
import { Mock } from './Mock'

type MyFixtures = {
  application: Application
  mock: Mock
}

export const test = base.extend<MyFixtures>({
  application: async ({ page }, use) => {
    await use(new Application(page))
  },

  mock: async ({ page }, use) => {
    await use(new Mock(page))
  },
})

export { expect } from '@playwright/test'
