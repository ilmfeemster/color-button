import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'
import { replaceCamelWithSpaces } from './App'

test('button has correct initial color', () => {
  render(<App />)
  // find an element with a role of button and text of 'Change to Midnight Blue'
  const colorButton = screen.getByRole('button', {
    name: 'Change to Midnight Blue',
  })

  expect(colorButton).toHaveStyle({ backgroundColor: 'MediumVioletRed' })

  //click button
  fireEvent.click(colorButton)
  expect(colorButton).toHaveStyle({ backgroundColor: 'Midnight Blue' })

  expect(colorButton).toHaveTextContent('Change to Medium Violet Red')
})

test('initial conditions', () => {
  render(<App />)
  //check that the button starts out enabled
  const colorButton = screen.getByRole('button', {
    name: 'Change to Midnight Blue',
  })
  expect(colorButton).toBeEnabled()

  //check that the checkbox starts out unchecked
  const checkbox = screen.getByRole('checkbox')
  expect(checkbox).not.toBeChecked()
})

test('checkbox disables/enables button', () => {
  render(<App />)
  const colorButton = screen.getByRole('button', {
    name: 'Change to Midnight Blue',
  })
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' })
  //check that button is disabled when checkbox is checked
  fireEvent.click(checkbox)
  expect(colorButton).toBeDisabled()
  //check that button is enabled when checkbox is unchecked
  fireEvent.click(checkbox)
  expect(colorButton).toBeEnabled()
})

test('disable button changes color to  gray and color maintains after', () => {
  render(<App />)
  const colorButton = screen.getByRole('button', {
    name: 'Change to Midnight Blue',
  })
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' })
  //check that button turns gray then back to red
  fireEvent.click(checkbox)
  expect(colorButton).toHaveStyle({ backgroundColor: 'gray' })
  fireEvent.click(checkbox)
  expect(colorButton).toHaveStyle({ backgroundColor: 'Medium Violet Red' })
  //check that button turns to gray when blue
  fireEvent.click(colorButton)
  fireEvent.click(checkbox)
  expect(colorButton).toHaveStyle({ backgroundColor: 'gray' })
  //check that button turns back to blue when disabled from blue
  fireEvent.click(checkbox)
  expect(colorButton).toHaveStyle({ backgroundColor: 'Midnight Blue' })
})

describe('spaces before camel-case capital letters', () => {
  test('Works for no inner capital letters', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red')
  })
  test('Works for one inner capital letter', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue')
  })
  test('Works for multiple inner capital letters', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red')
  })
})
