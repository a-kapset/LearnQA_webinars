import { expect, request, test } from '@playwright/test'
import { createRandomUser, UserParams } from '../utils/random'
import { Api } from '../api/Api'
import { HttpMethod } from '../client/ApiClient'

test.describe('Example test suite refactored', () => {
  test('Example test', async ({ request }) => {
    const name = 'Artsiom'

    const response = await new Api(request).hello.get({ name: name })
    await response.statusCode.shouldBe('OK')
    await response.shouldHave({ property: 'answer', withValue: `Hello, ${name}` })
    await response.shouldBe({ answer: `Hello, ${name}` })
  })

  test('Code status 500', async ({ request }) => {
    const response = await new Api(request).get_500.get()
    await response.statusCode.shouldBe('Internal Server Error')
  })

  const EXPECTED_METHODS = ['get', 'post', 'put', 'delete', 'patch'] as const

  EXPECTED_METHODS.forEach((method) => {
    test(`Check ${method.toUpperCase()} method`, async ({ request }) => {
      const response = await new Api(request).checkType.check({ method: method.toUpperCase() as HttpMethod })
      await response.statusCode.shouldBe('OK')
      await response.shouldContain(`Request type: ${method.toUpperCase()}`)
    })
  })
})

test.describe('Auth tests refactored', () => {
  let api: Api
  let userId: string
  const userParams: UserParams = createRandomUser()

  test.beforeEach(async ({ request }) => {
    api = new Api(request)
    const userCreateResponse = await api.user.createUser(userParams)
    await userCreateResponse.statusCode.shouldBe('OK')
    userId = userCreateResponse.body.id
    api.authenticate(userParams.email, userParams.password)
  })

  test.afterEach(async () => {
    const userDeleteResponse = await api.user.delete(userId)
    await userDeleteResponse.shouldBe({ success: '!' })
  })

  test('Check user ID', async () => {
    const userAuthResponse = await api.user.getAuthStatus()
    await userAuthResponse.statusCode.shouldBe('OK')
    await userAuthResponse.shouldHave({ property: 'user_id', withValue: +userId }) // '+' is used to convert 'string' to 'number'
  })

  test('Get user by ID', async () => {
    const userByIdResponse = await api.user.getUserInfo(userId)
    await userByIdResponse.statusCode.shouldBe('OK')
    await userByIdResponse.shouldBe({
      id: userId.toString(),
      username: userParams.username,
      email: userParams.email,
      firstName: userParams.firstName,
      lastName: userParams.lastName,
    })
  })

  test('Get user by ID and validate schema', async () => {
    const userByIdResponse = await api.user.getUserInfo(userId)
    await userByIdResponse.statusCode.shouldBe('OK')
    await userByIdResponse.shouldHave({ property: 'email', withValue: userParams.email })
    await userByIdResponse.shouldHaveValidSchema()
  })
})
