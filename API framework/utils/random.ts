import { faker } from '@faker-js/faker'

export type UserParams = {
  username: string
  firstName: string
  lastName: string
  email: string
  password: string
}

export const createRandomUser = (): UserParams => {
  return {
    username: faker.internet.username(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email({ provider: 'gmail.com' }),
    password: faker.internet.password(),
  }
}
