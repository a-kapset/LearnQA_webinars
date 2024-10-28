import { test as base, request } from '@playwright/test'
import { Api } from '../api/Api'
import { AuthenticatedApi } from '../api/AuthenticatedApi'

type MyFixtures = {
  api: Api
  authenticatedApi: AuthenticatedApi
}

export const test = base.extend<MyFixtures>({
  api: async ({ request }, use) => {
    await use(new Api(request))
  },
  authenticatedApi: async ({ request }, use) => {
    const api = new AuthenticatedApi(request)
    await api.authWithRandomUser()
    await use(api)
    await api.user.delete(api.authUser!.userId)
  },
})

export { expect } from '@playwright/test'
