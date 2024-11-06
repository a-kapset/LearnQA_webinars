import { expect, test } from '@playwright/test'
import { StatusCode } from './StatusCode'
import Ajv, { JSONSchemaType } from 'ajv'

type ResponseProps<T> = {
  statusCode: number
  body: T
  headers: Record<string, string>
}

export class Response<T extends Record<string, unknown> | string> {
  public statusCode: StatusCode
  public body: T
  public headers: Record<string, string>
  private schema: Partial<JSONSchemaType<T>> | undefined
  private ajv = new Ajv()

  constructor({ statusCode, body, headers }: ResponseProps<T>) {
    this.statusCode = new StatusCode(statusCode)
    this.body = body
    this.headers = headers
  }

  public async shouldBe(expectedBody: T) {
    await test.step('Check response body is correct', async () => {
      if (typeof expectedBody === 'string') {
        throw new Error('Response body is a string, not JSON')
      }

      expect(this.body).toEqual(expect.objectContaining(expectedBody))
    })
  }

  public async shouldHave<K extends keyof T>({ property, withValue }: { property: K; withValue: any }) {
    // TODO: 'withValue' may have other data types
    await test.step(`Check that body contains property <${String(property)}> with value <${withValue}>`, async () => {
      expect((this.body as Record<string, unknown>)[String(property)]).toEqual(withValue)
    })
  }

  public async shouldContain(expectedSubstring: string) {
    await test.step('Check that body contains expected substring', async () => {
      expect(this.body).toContain(expectedSubstring)
    })
  }

  public async shouldHaveValidSchema() {
    await test.step('Check response schema is valid', async () => {
      if (!this.schema) {
        throw new Error('Schema is not set')
      }

      const validate = this.ajv.compile(this.schema)
      validate(this.body)
      expect(validate.errors).toBeNull()
    })
  }

  public setSchema<T>(schema: Partial<JSONSchemaType<T>>) {
    this.schema = schema
  }
}
