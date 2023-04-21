import React, { useEffect, useState } from 'react'
import bottyConfig from '../../../common/constants/bottyConfig'

export default function Typing(props) {
  const [numberOfDots, setDots] = useState(1)

  const incrementDots = () => {
    setDots(numberOfDots === 3 ? 1 : numberOfDots + 1)
  }

  useEffect(() => {
    const timeout = setTimeout(incrementDots, 500)

    return () => {
      clearTimeout(timeout)
    }
  }, [numberOfDots])

  return (
    <p className='messages__message messages__message--typing' key='typing'>
      {`${
        props.botTyping === bottyConfig.USER_TYPING_EVENT ? 'You ' : 'Botty '
      } Typing${''.padStart(numberOfDots, '.')}`}
    </p>
  )
}
