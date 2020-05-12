// __mocks__/api/pet.js

import { readFileSync } from 'fs'
import path from 'path'
import { act } from '@testing-library/react'

const breeds = [{ name: 'apple' }, { name: 'meat' }, { name: 'drink' }]
const doggos = JSON.parse(
  readFileSync(path.join(__dirname), 'res.json').toString(),
)

export const ANIMALS = ['dog', 'cat', 'bird']
export const _breeds = breeds
export const _dogs = doggos.animals

const mock = {
  // mock the breeds function
  breeds: jest.fn(() => {
    return {
      // breeds function is promise based
      // should have then function on it
      // act: info react we have done things need to be udpated
      then: (callback) => act(() => callback({ breeds })),
    }
  }),
  animals: jest.fn(() => {
    return {
      then: (callbacka) => act(() => callback(doggs)),
    }
  }),
}

export default mock
