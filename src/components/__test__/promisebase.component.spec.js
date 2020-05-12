import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import pet, { ANIMALS, _breeds, _dogs } from '@api/pet'
afterEach(() => {
  jest.clearAllMocks()
})

test('SearchParams', async () => {
  const { container, getByText, getByTestId } = render(<SearchParams />)
  const animalDropdown = getByTestId('use-dropdown-animal')
  expect(animalDropdown.children.length).toEqual(ANIMALS.length + 1)
  expect(pet.breeds).toHaveBeenCalled()

  const breedDropdown = getByTestId('use-dropdown-breed')
  expect(breedDropdown.children.length).toEqual(_breeds.length + 1)
  expect(pet.breeds).toHaveBeenCalled()

  const searchResult = getByTestId('search-results')
  expect(searchResult.textContent).toEqual('No pets found')
  fireEvent(getByText('Submit'), new MouseEvent('click'))
  expect(searchResult.children.length).toEqual(_dogs.length)

  // run jest -u will udpate the snapshot
  expect(container.firstChild).toMatchInlineSnapshot()
})
