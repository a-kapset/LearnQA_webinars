import { expect, test } from '@playwright/test'

const StatusCodes = {
  OK: 200,
  'Internal Server Error': 500,
} as const

export class StatusCode {
  constructor(private code: number) {}

  public async shouldBe(expectedCode: number | keyof typeof StatusCodes) {
    await test.step(`Check status code is ${expectedCode}`, async () => {
      const calculatedCode = typeof expectedCode === 'number' ? expectedCode : StatusCodes[expectedCode]

      expect(calculatedCode).toEqual(this.code)
    })
  }
}
