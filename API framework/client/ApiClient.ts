import { Response } from './Response'

export type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH'

export type RequestOptions = {
  body?: Record<string, unknown> | string
  params?: Record<string, string>
}

export type ApiClient = {
  sendRequest<T extends Record<string, unknown> | string>(
    method: HttpMethod,
    url: string,
    options?: RequestOptions
  ): Promise<Response<T>>

  setAuthHeaders(headers: Record<string, string>): void
}
