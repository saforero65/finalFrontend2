import { useCallback, useEffect, useState } from 'react'
import { CloseButton as Close, SuscribeImage } from '../../assets'
import Noticia, { type INoticiasNormalizadas } from './Noticia'
import type INoticiasProvider from './NoticiasProvider'
import {
  BotonLectura,
  BotonSuscribir,
  CloseButton,
  ContenedorModal,
  ContenedorNoticias,
  CotenedorTexto,
  DescripcionModal,
  DescripcionTarjetaNoticia,
  FechaTarjetaNoticia,
  ImagenModal,
  ImagenTarjetaNoticia,
  ListaNoticias,
  TarjetaModal,
  TarjetaNoticia,
  TituloModal,
  TituloNoticias,
  TituloTarjetaNoticia
} from './styled'

const Noticias = ({
  noticiasProvider
}: {
  noticiasProvider: INoticiasProvider
}) => {
  const [noticias, setNoticias] = useState<INoticiasNormalizadas[]>([])
  const [modal, setModal] = useState<INoticiasNormalizadas | null>(null)

  const getNoticias = useCallback(async () => {
    const noticiasApi = await noticiasProvider.obtenerNoticias()
    const noticiasNormalizadas = noticiasApi.map((noticia) => Noticia(noticia))
    setNoticias(noticiasNormalizadas)
  }, [noticiasProvider])

  useEffect(() => {
    const updateNoticias = async () => {
      await getNoticias()
    }
    updateNoticias()
  }, [getNoticias])

  return (
    <ContenedorNoticias>
      <TituloNoticias>Noticias de los Simpsons</TituloNoticias>
      <ListaNoticias>
        {noticias.map((n) => (
          <TarjetaNoticia key={n.id}>
            <ImagenTarjetaNoticia src={n.imagen} />
            <TituloTarjetaNoticia>{n.titulo}</TituloTarjetaNoticia>
            <FechaTarjetaNoticia>
              {n.fecha.toLocaleDateString()}
            </FechaTarjetaNoticia>
            <DescripcionTarjetaNoticia>
              {n.descripcionCorta}
            </DescripcionTarjetaNoticia>
            <BotonLectura
              onClick={() => {
                setModal(n)
              }}
            >
              Ver más
            </BotonLectura>
          </TarjetaNoticia>
        ))}
        {modal
          ? (
              modal.esPremium
                ? (
            <ContenedorModal>
              <TarjetaModal>
                <CloseButton
                  onClick={() => {
                    setModal(null)
                  }}
                >
                  <img src={Close} alt="close-button" />
                </CloseButton>
                <ImagenModal src={SuscribeImage} alt="mr-burns-excelent" />
                <CotenedorTexto>
                  <TituloModal>Suscríbete a nuestro Newsletter</TituloModal>
                  <DescripcionModal>
                    Suscríbete a nuestro newsletter y recibe noticias de
                    nuestros personajes favoritos.
                  </DescripcionModal>
                  <BotonSuscribir
                    onClick={() =>
                      setTimeout(() => {
                        alert('Suscripto!')
                        setModal(null)
                      }, 1000)
                    }
                  >
                    Suscríbete
                  </BotonSuscribir>
                </CotenedorTexto>
              </TarjetaModal>
            </ContenedorModal>
                  )
                : (
            <ContenedorModal>
              <TarjetaModal>
                <CloseButton
                  onClick={() => {
                    setModal(null)
                  }}
                >
                  <img src={Close} alt="close-button" />
                </CloseButton>
                <ImagenModal src={modal.imagen} alt="news-image" />
                <CotenedorTexto>
                  <TituloModal>{modal.titulo}</TituloModal>
                  <DescripcionModal>{modal.descripcion}</DescripcionModal>
                </CotenedorTexto>
              </TarjetaModal>
            </ContenedorModal>
                  )
            )
          : null}
      </ListaNoticias>
    </ContenedorNoticias>
  )
}

export default Noticias
