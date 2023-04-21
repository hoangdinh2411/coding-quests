import React from 'react'

const themeValue = {
  dark_mode: false,
  changeMode: () => {},
}
const ModeContext = React.createContext(themeValue)

const ModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = React.useState(themeValue.dark_mode)

  const changeMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <ModeContext.Provider value={{ isDarkMode, changeMode }}>
      {children}
    </ModeContext.Provider>
  )
}
export { ModeProvider, ModeContext }
