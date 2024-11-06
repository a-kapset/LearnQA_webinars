import { expect, request, test } from '@playwright/test'
import { createRandomUser, UserParams } from '../utils/random'

test.describe('Example test suite', () => {
  test('Example test', async ({ request }) => {
    const name = 'Artsiom'

    const response = await request.get(`hello?name=${name}`)
    const body = await response.json()

    await expect(response).toBeOK()
    expect(body.answer).toEqual(`Hello, ${name}`)
  })

  test('Code status 500', async ({ request }) => {
    const response = await request.get(`get_500`)
    expect(response.status()).toEqual(500)
  })

  const EXPECTED_METHODS = ['get', 'post', 'put', 'delete', 'patch'] as const

  EXPECTED_METHODS.forEach((method) => {
    test(`Check ${method.toUpperCase()} method`, async ({ request }) => {
      const response = await request[method](`check_type`)
      const body = await response.text()

      expect(body).toContain(`Request type: ${method.toUpperCase()}`)
    })
  })
})

test.describe('Auth tests', () => {
  let authHeaders: {
    'x-csrf-token': string
    cookie: string
  }

  let userId: number

  const userParams: UserParams = createRandomUser()

  test.beforeEach(async ({ request }) => {
    await test.step('Create user', async () => {
      const userCreateResponse = await request.post(`user`, { data: userParams })
      await test.step('Check response status', async () => {
        await expect(userCreateResponse).toBeOK()
      })
    })

    await test.step('User logs in', async () => {
      const userLoginResponse = await request.post(`user/login`, {
        data: {
          email: userParams.email,
          password: userParams.password,
        },
      })

      await test.step('Check response status', async () => {
        await expect(userLoginResponse).toBeOK()
      })

      await test.step('Set up auth data', async () => {
        userId = ((await userLoginResponse.json()) as { user_id: number }).user_id
        authHeaders = {
          'x-csrf-token': userLoginResponse.headers()['x-csrf-token'],
          cookie: userLoginResponse.headers()['Set-Cookie'],
        }
      })
    })
  })

  test.afterEach(async ({ request }) => {
    await test.step('Delete user', async () => {
      const userDeleteResponse = await request.delete(`user/${userId}`, { headers: authHeaders })
      await test.step('Check response status', async () => {
        await expect(userDeleteResponse).toBeOK()
      })
    })
  })

  test('Check user ID', async ({ request }) => {
    await test.step('Get auth status', async () => {
      const userAuthResponse = await request.get(`user/auth`, { headers: authHeaders })
      await test.step('Check response status', async () => {
        await expect(userAuthResponse).toBeOK()
      })
      await test.step('Check id is correct', async () => {
        const userAuthResponseBody = (await userAuthResponse.json()) as { user_id: number }
        expect(userAuthResponseBody.user_id).toEqual(userId)
      })
    })
  })

  test('Get user by ID', async ({ request }) => {
    await test.step('Get user', async () => {
      const userByIdResponse = await request.get(`user/${userId}`, { headers: authHeaders })
      await test.step('Check response status', async () => {
        await expect(userByIdResponse).toBeOK()
      })
      await test.step('Check user data is correct', async () => {
        const userByIdResponseBody = (await userByIdResponse.json()) as { user_id: number }
        expect(userByIdResponseBody).toEqual(
          expect.objectContaining({
            id: userId.toString(),
            username: userParams.username,
            email: userParams.email,
            firstName: userParams.firstName,
            lastName: userParams.lastName,
          })
        )
      })
    })
  })
})
