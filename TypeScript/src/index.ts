import * as crypto from 'crypto';

function print(a : string) {
    console.log(a);    
}

print('AAA')

// tuple
const user: [number, string] = [1, 'Artsiom']
user[0]
user[1]

// enum
const enum Size {
    S = "S",
    M = "M",
    L = "L"
}

function isFitMe(item: Size): boolean {
    const mySize = Size.L

    return mySize == item
}

console.log(isFitMe(Size.M))

// types
// type NewUser = {
//     name: string
//     age: number
// }

// type User = {
//     id : string
// } & NewUser

type User = {
    id : string
    name: string
    age: number
}

type NewUser = Omit<User, 'id'>



function createUser(newUser: NewUser): User {
    const id = crypto.randomUUID()

    return {
        id,
        ...newUser
    }
}

console.log(createUser({name: 'Artsiom', age: 38}));
