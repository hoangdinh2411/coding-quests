import React, { useState, createContext, useCallback } from 'react'
import initialMessages from './constants/initialMessages'

const LatestMessagesContext = createContext({})

export default LatestMessagesContext

export function LatestMessages({ children }) {
  const [messages, setMessages] = useState([])

  const setLatestMessage = useCallback(
    (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage])
    },
    [messages]
  )

  return (
    <LatestMessagesContext.Provider value={{ messages, setLatestMessage }}>
      {children}
    </LatestMessagesContext.Provider>
  )
}
