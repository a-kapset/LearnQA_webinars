import { test } from '../fixtures/custom-fixtures'
import { HttpMethod } from '../client/ApiClient'

test.describe('Example test suite refactored', () => {
  test('Example test', async ({ api }) => {
    const name = 'Artsiom'

    const response = await api.hello.get({ name: name })
    await response.statusCode.shouldBe('OK')
    await response.shouldHave({ property: 'answer', withValue: `Hello, ${name}` })
    await response.shouldBe({ answer: `Hello, ${name}` })
  })

  test('Code status 500', async ({ api }) => {
    const response = await api.get_500.get()
    await response.statusCode.shouldBe('Internal Server Error')
  })

  const EXPECTED_METHODS = ['get', 'post', 'put', 'delete', 'patch'] as const

  EXPECTED_METHODS.forEach((method) => {
    test(`Check ${method.toUpperCase()} method`, async ({ api }) => {
      const response = await api.checkType.check({ method: method.toUpperCase() as HttpMethod })
      await response.statusCode.shouldBe('OK')
      await response.shouldContain(`Request type: ${method.toUpperCase()}`)
    })
  })
})

test.describe('Auth tests refactored', () => {
  test('Check user ID', async ({ authenticatedApi }) => {
    const userAuthResponse = await authenticatedApi.user.getAuthStatus()
    await userAuthResponse.statusCode.shouldBe('OK')
    await userAuthResponse.shouldHave({ property: 'user_id', withValue: +authenticatedApi.authUser!.userId }) // '+' is used to convert 'string' to 'number'
  })

  test('Get user by ID', async ({ authenticatedApi }) => {
    const userByIdResponse = await authenticatedApi.user.getUserInfo(authenticatedApi.authUser!.userId)
    await userByIdResponse.statusCode.shouldBe('OK')
    await userByIdResponse.shouldBe({
      id: authenticatedApi.authUser!.userId.toString(),
      username: authenticatedApi.authUser!.username,
      email: authenticatedApi.authUser!.email,
      firstName: authenticatedApi.authUser!.firstName,
      lastName: authenticatedApi.authUser!.lastName,
    })
  })

  test('Get user by ID and validate schema', async ({ authenticatedApi }) => {
    const userByIdResponse = await authenticatedApi.user.getUserInfo(authenticatedApi.authUser!.userId)
    await userByIdResponse.statusCode.shouldBe('OK')
    await userByIdResponse.shouldHave({ property: 'email', withValue: authenticatedApi.authUser!.email })
    await userByIdResponse.shouldHaveValidSchema()
  })
})
