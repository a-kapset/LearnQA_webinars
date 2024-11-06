import { ApiClient, HttpMethod, RequestOptions } from './ApiClient'
import { APIRequestContext, test } from '@playwright/test'
import { Response } from './Response'

export class PlaywrightApiClient implements ApiClient {
  private authHeaders: Record<string, string> | undefined

  constructor(private request: APIRequestContext) {}

  setAuthHeaders(headers: Record<string, string>) {
    this.authHeaders = headers
  }

  async sendRequest<T extends Record<string, unknown> | string>(
    method: HttpMethod,
    url: string,
    options?: RequestOptions
  ): Promise<Response<T>> {
    return await test.step(`Sending ${method} request to url ${url}`, async () => {
      const response = await this.request[method.toLowerCase() as 'get'](url, {
        data: options?.body,
        params: options?.params,
        headers: this.authHeaders,
      })

      let responseBody: Record<string, unknown> | string

      try {
        responseBody = await response.json()
      } catch (error) {
        responseBody = await response.text()
      }

      return new Response<T>({
        statusCode: response.status(),
        body: responseBody as T,
        headers: response.headers(),
      })
    })
  }
}
