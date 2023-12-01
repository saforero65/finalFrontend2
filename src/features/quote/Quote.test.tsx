import { waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render, screen } from '../../test-utils'
import Cita from './Cita'
import { MENSAJE_CARGANDO, NOMBRE_INVALIDO, NO_ENCONTRADO } from './constants'
import { type ICita } from './types'

describe('Componente Cita', () => {
  it('Debe renderizar el componente Cita', () => {
    render(<Cita />)
    const failQuote = screen.getByText('No se encontro ninguna cita')
    expect(failQuote).toBeInTheDocument()
  })

  it('Debe renderizar el estado inicial cuando no se ingresa el nombre del autor', () => {
    render(<Cita />)
    expect(screen.getByText(NO_ENCONTRADO)).toBeInTheDocument()
  })

  it("Debe mostrar 'CARGANDO...' al obtener datos", async () => {
    render(<Cita />)
    const button = screen.getByLabelText('Obtener cita aleatoria')
    userEvent.click(button)

    await waitFor(() => {
      const loading = screen.getByText(MENSAJE_CARGANDO)
      expect(loading).toBeInTheDocument()
    })
  })
  it("Debe limpiar la cita al hacer clic en el botón 'Borrar'", async () => {
    const characterName = 'Nelson'

    render(<Cita />)
    const input = screen.getByPlaceholderText('Ingresa el nombre del autor')
    const cleanButton = screen.getByText('Borrar')

    await userEvent.type(input, characterName)
    expect(input).toHaveValue(characterName)

    userEvent.click(cleanButton)

    await waitFor(() => {
      expect(input).toHaveValue('')
    })
  })

  it('Debe mostrar un mensaje de error cuando el nombre del autor es inválido', async () => {
    render(<Cita />)
    const characterName = 'invalidName'
    const input = screen.getByPlaceholderText('Ingresa el nombre del autor')

    await userEvent.type(input, characterName)
    const button = await screen.findByText('Obtener Cita')
    userEvent.click(button)

    await waitFor(
      () => {
        const failQuote = screen.getByText(NOMBRE_INVALIDO)
        expect(failQuote).toBeInTheDocument()
      },
      { timeout: 2500 }
    )
  })

  it("Debe mostrar el mensaje 'Por favor ingrese un nombre válido' al ingresar números", async () => {
    render(<Cita />)
    const input = screen.getByPlaceholderText('Ingresa el nombre del autor')
    await userEvent.type(input, '1111')

    const button = screen.getByText('Obtener Cita')
    await userEvent.click(button)

    expect(
      await screen.findByText('Por favor ingrese un nombre válido')
    ).toBeInTheDocument()
  })

  it('Debe renderizar una cita de Bart Simpson', async () => {
    const characterName = 'Bart Simpson'

    render(<Cita />)
    const input = screen.getByPlaceholderText('Ingresa el nombre del autor')
    await userEvent.type(input, characterName)

    const button = await screen.findByText('Obtener Cita')
    userEvent.click(button)

    await waitFor(async () => await screen.findByText(characterName), { timeout: 2500 })

    const quoteAuthor = screen.getByText(characterName)
    expect(quoteAuthor).toBeInTheDocument()
  })

  it('Debe renderizar una cita aleatoria', async () => {
    render(<Cita />)

    const button = screen.getByText('Obtener cita aleatoria')
    userEvent.click(button)
    const failQuote = screen.getByText('No se encontro ninguna cita')

    await waitFor(
      () => {
        expect(failQuote.textContent).not.toBe('')
      },
      { timeout: 2500 }
    )
  })

  it('Debe tener las propiedades y tipos correctos', () => {
    const cita: ICita = {
      personaje: 'Homer Simpson',
      cita: 'In theory, Communism works! In theory.',
      imagen:
                'https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FHomerSimpson.png?1497567511939',
      direccionPersonaje: 'Right'
    }

    expect(cita).toHaveProperty('personaje', 'Homer Simpson')
    expect(cita).toHaveProperty(
      'cita',
      'In theory, Communism works! In theory.'
    )
    expect(cita).toHaveProperty(
      'imagen',
      'https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FHomerSimpson.png?1497567511939'
    )
    expect(cita).toHaveProperty('direccionPersonaje', 'Right')
  })
})
