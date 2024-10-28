import { Api } from './Api'
import { createRandomUser, UserParams } from '../utils/random'
import { test } from '../fixtures/custom-fixtures'

export class AuthenticatedApi extends Api {
  public authUser: (UserParams & { userId: string }) | undefined

  public async authWithRandomUser() {
    await test.step(`Authenticate with random user`, async () => {
      const randomUserParams = createRandomUser()
      const createUserResponse = await this.user.createUser(randomUserParams)
      await createUserResponse.statusCode.shouldBe('OK')

      const userId = createUserResponse.body.id

      this.authUser = {
        ...randomUserParams,
        userId,
      }

      await super.authenticate(this.authUser.email, this.authUser.password)
    })
  }
}
