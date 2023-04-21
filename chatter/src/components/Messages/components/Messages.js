import React, { useCallback, useContext, useEffect } from 'react'
import io from 'socket.io-client'
import useSound from 'use-sound'
import config from '../../../config'
import LatestMessagesContext from '../../../contexts/LatestMessages/LatestMessages'
import TypingMessage from './TypingMessage'
import Header from './Header'
import Footer from './Footer'
import Message from './Message'
import '../styles/_messages.scss'
import bottyConfig from '../../../common/constants/bottyConfig'

const socket = io(config.BOT_SERVER_ENDPOINT, {
  transports: ['websocket', 'polling', 'flashsocket'],
})

function Messages() {
  const [playSend] = useSound(config.SEND_AUDIO_URL)
  const [playReceive] = useSound(config.RECEIVE_AUDIO_URL)
  const { messages, setLatestMessage } = useContext(LatestMessagesContext)
  const [message, setMessage] = React.useState('')
  const [botTyping, setBotTyping] = React.useState('')
  const onChangeMessage = (e) => {
    setMessage(e.target.value)
  }

  useEffect(() => {
    if (message === '') {
      setBotTyping('')
    } else {
      setBotTyping(bottyConfig.USER_TYPING_EVENT)
    }
  }, [message])
  const sendMessage = (e) => {
    if (message) {
      socket.emit(bottyConfig.USER_MESSAGE_EVENT, message)
      playSend()
      const newMessage = {
        id: new Date().getTime(),
        user: 'me',
        message: message,
      }
      setLatestMessage(newMessage)
      setMessage('')
      setBotTyping('')
    }
  }

  useEffect(() => {
    const messageList = document.getElementById('message-list')
    messageList.scrollTop = messageList.scrollHeight
  }, [messages])
  useEffect(() => {
    socket.on(bottyConfig.BOT_TYPING_EVENT, () => {
      setBotTyping(bottyConfig.BOT_TYPING_EVENT)
    })
    socket.on(bottyConfig.BOT_MESSAGE_EVENT, (message) => {
      const newMessage = {
        id: new Date().getTime(),
        user: 'bot',
        message: message,
      }
      setLatestMessage(newMessage)
      playReceive()
      setBotTyping('')
    })
  }, [])

  return (
    <div className='messages'>
      <Header />
      <div className='messages__list' id='message-list'>
        {messages.map((message, messageIndex) => (
          <Message
            key={messageIndex}
            message={message}
            nextMessage={messages[messageIndex + 1]}
            botTyping={botTyping}
          />
        ))}
      </div>
      {botTyping && <TypingMessage botTyping={botTyping} />}
      <Footer
        message={message}
        sendMessage={sendMessage}
        onChangeMessage={onChangeMessage}
      />
    </div>
  )
}

export default Messages
