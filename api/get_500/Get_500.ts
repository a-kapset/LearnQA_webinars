import { test } from '@playwright/test'
import { ApiRoute } from '../ApiRoute'

export class Get_500 extends ApiRoute {
  public async get() {
    return await test.step('Sending request on get_500 endpoint', async () => {
      return await this.apiClient.sendRequest('GET', this.url)
    })
  }
}
