import { toCapitalize } from './toCapitalize'

export interface INoticiasNormalizadas {
  id: number
  titulo: string
  descripcion: string
  fecha: Date
  esPremium: boolean
  imagen: string
  descripcionCorta?: string
  minutosTranscurridos?: number
}

const Noticia = (noticia: INoticiasNormalizadas): INoticiasNormalizadas => {
  const titulo = toCapitalize(noticia.titulo)
  const fechaNoticia = new Date(noticia.fecha)
  const fechaActual = new Date()
  const minutosTranscurridos = Math.floor(
    (fechaActual.getTime() - fechaNoticia.getTime()) / 60000
  )
  const descripcionCorta = noticia.descripcion.substring(0, 100)
  return {
    ...noticia,
    titulo,
    fecha: fechaNoticia,
    descripcionCorta,
    minutosTranscurridos
  }
}

export default Noticia
