import { JSONSchemaType } from 'ajv' // to use this package typescript should be installed in dev dependecies and 'noImplicitAny' property shouldbe uncommented in tsconfig.json

export type UserInfoResponse = {
  id: string
  username: string
  email: string
  firstName: string
  lastName: string
}

export const UserInfoResponseSchema: JSONSchemaType<UserInfoResponse> = {
  title: 'User Info',
  type: 'object',
  properties: {
    id: { type: 'string' },
    username: { type: 'string' },
    email: { type: 'string' },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
  },
  required: ['id', 'username', 'email', 'firstName', 'lastName'],
}
