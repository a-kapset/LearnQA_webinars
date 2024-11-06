import { test } from '@playwright/test'
import { ApiRoute } from '../ApiRoute'
import { UserParams } from '../../utils/random'
import { UserInfoResponse, UserInfoResponseSchema } from './UserInfoResponse'

export class User extends ApiRoute {
  public async delete(id: number | string) {
    return await test.step(`Sending delete request for user ${id}`, async () => {
      return await this.apiClient.sendRequest<{ success: string }>('DELETE', `${this.url}/${id}`)
    })
  }

  public async createUser(createUserParams: UserParams) {
    return await test.step(`Sending create user request`, async () => {
      return await this.apiClient.sendRequest<{ id: string }>('POST', this.url, { body: createUserParams })
    })
  }

  public async login(email: string, password: string) {
    return await test.step(`Sending login request for user with ${email} and password ${password}`, async () => {
      const body = { email, password }
      return await this.apiClient.sendRequest('POST', `${this.url}/login`, { body: body })
    })
  }

  public async getAuthStatus() {
    return await test.step('Sending request to check auth status for ', async () => {
      return await this.apiClient.sendRequest<{ user_id: number }>('GET', `${this.url}/auth`)
    })
  }

  public async getUserInfo(userId: number | string) {
    return await test.step(`Sending request to get info for user with id ${userId}`, async () => {
      const response = await this.apiClient.sendRequest<UserInfoResponse>('GET', `${this.url}/${userId}`)
      response.setSchema(UserInfoResponseSchema)
      return response
    })
  }
}
