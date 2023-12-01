import { useState } from 'react'
import * as Styled from './Bio.styled'
import { INFO_SIMPSONS, NombresSimpsons } from './constants'

const Bio = () => {
  const [bioActiva, setBioActiva] = useState(
    INFO_SIMPSONS[NombresSimpsons.BART]
  )

  const onClick: (nombre: NombresSimpsons) => void = (nombre) => { setBioActiva(INFO_SIMPSONS[nombre]) }

  const crearBotones = () => {
    return Object.keys(INFO_SIMPSONS).map((nombre) => (
        <Styled.BotonBioActivo
          key={nombre}
          onClick={() => { onClick(nombre as NombresSimpsons) }}
          className={bioActiva.id === nombre ? 'botonBioActivo' : 'botonBioInactivo'}
        >
          {nombre}
        </Styled.BotonBioActivo>
    ))
  }

  return (
    <Styled.BioContainer>
      <Styled.ContenedorBotones>{crearBotones()}</Styled.ContenedorBotones>
      <div>
        <div>
          <Styled.BioImagen src={bioActiva.image} alt={bioActiva.nombre} />
        </div>
        <div>
          <Styled.BioNombre>{bioActiva.nombre}</Styled.BioNombre>
          <Styled.BioDescripcion>{bioActiva.descripcion}</Styled.BioDescripcion>
        </div>
      </div>
    </Styled.BioContainer>
  )
}

export default Bio
