import React from 'react'
import { ModeProvider } from '../../context/modeContext'

export default function App({ children }) {
  return <ModeProvider>{children}</ModeProvider>
}
