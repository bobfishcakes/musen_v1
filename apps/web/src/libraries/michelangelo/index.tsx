import { useConfiguration } from '@web/core/configuration'
import { ReactNode } from 'react'
import { useMessageReceived, useMessageSend } from './hooks/useMessage'

type Props = {
  children: ReactNode
}

const useMichelangelo = () => {
  const configuration = useConfiguration()

  useMessageSend(configuration.isMarblismMichelangeloActive)

  useMessageReceived(configuration.isMarblismMichelangeloActive)

  return <></>
}

export const MichelangeloProvider: React.FC<Props> = ({ children }) => {
  useMichelangelo()

  return <>{children}</>
}
