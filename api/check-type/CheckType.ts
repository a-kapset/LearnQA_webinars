import { test } from '@playwright/test'
import { ApiRoute } from '../ApiRoute'
import { HttpMethod } from '../../client/ApiClient'

export class CheckType extends ApiRoute {
  public async check({ method }: { method: HttpMethod }) {
    return await test.step(`Sending ${method} to check endpoint`, async () => {
      return await this.apiClient.sendRequest(method, this.url)
    })
  }
}
