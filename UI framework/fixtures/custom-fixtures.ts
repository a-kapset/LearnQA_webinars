import { test as base } from '@playwright/test'
import { Application } from './Application'

type MyFixtures = {
  application: Application
}

export const test = base.extend<MyFixtures>({
  application: async ({ page }, use) => {
    await use(new Application(page))
  },
})

export { expect } from '@playwright/test'
