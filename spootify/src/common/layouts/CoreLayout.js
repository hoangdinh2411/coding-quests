import React, { useEffect } from 'react'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import Player from '../components/Player'
import { getToken } from '../../api'

function CoreLayout({ children, history }) {
  useEffect(() => {
    if (localStorage.getItem('token')) return
    getToken()
      .then((res) => {
        if (res) {
          localStorage.setItem('token', JSON.stringify(res.data))
        }
      })
      .catch((err) => console.log(err))
  }, [])
  return (
    <div className='main'>
      <SideBar />
      <div className='main__content'>
        <Header history={history} />
        <div className='main__content__child'>{children}</div>
      </div>
      <Player />
    </div>
  )
}

export default CoreLayout
