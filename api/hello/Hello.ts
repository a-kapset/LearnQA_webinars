import { test } from '@playwright/test'
import { ApiRoute } from '../ApiRoute'

export class Hello extends ApiRoute {
  public async get(params?: { name?: string }) {
    return await test.step(`Sending request to ${this.url}${
      params?.name ? ` with name param ${params?.name}` : ''
    }`, async () => {
      return this.apiClient.sendRequest<{ answer: string }>('GET', this.url, { params })
    })
  }
}
