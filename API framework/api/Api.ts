import { APIRequestContext, test } from '@playwright/test'
import { PlaywrightApiClient } from '../client/PlaywrightApiClient'
import { Hello } from './hello/Hello'
import { Get_500 } from './get_500/Get_500'
import { CheckType } from './check-type/CheckType'
import { User } from './user/User'

export class Api {
  private request: APIRequestContext
  private apiClient: PlaywrightApiClient

  public hello: Hello
  public get_500: Get_500
  public checkType: CheckType
  public user: User

  constructor(request: APIRequestContext) {
    this.request = request
    this.apiClient = new PlaywrightApiClient(this.request)
    this.hello = new Hello(this.apiClient, 'hello')
    this.get_500 = new Get_500(this.apiClient, 'get_500')
    this.checkType = new CheckType(this.apiClient, 'check_type')
    this.user = new User(this.apiClient, 'user')
  }

  public async authenticate(email: string, password: string) {
    return await test.step(`Authenticate user`, async () => {
      const userLoginResponse = await this.user.login(email, password)
      await userLoginResponse.shouldBe('OK')

      this.apiClient.setAuthHeaders({
        'x-csrf-token': userLoginResponse.headers['x-csrf-token'],
        cookie: userLoginResponse.headers['Set-Cookie'],
      })
    })
  }
}
