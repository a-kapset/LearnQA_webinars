import { Page } from '@playwright/test'

export class Mock {
  constructor(private page: Page) {}

  public async routeGET(url: string, body: Record<string, unknown>) {
    await this.page.route(url, async (route, request) => {
      if (request.method() === 'GET') {
        route.fulfill({
          json: body,
          status: 304,
        })
      }
    })
  }
}
