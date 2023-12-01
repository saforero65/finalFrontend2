import { type INoticias } from './fakeRest'

export interface INoticiasProvider {
  obtenerNoticias: () => Promise<INoticias[]>
}

export default INoticiasProvider
