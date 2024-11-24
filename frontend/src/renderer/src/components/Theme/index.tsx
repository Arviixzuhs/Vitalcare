import React from 'react'
import { Themes } from './Themes'

export const ChangeTheme = () => {
  const [theme, setTheme] = React.useState(Themes.light)

  React.useEffect(() => {
    const temaGuardado = localStorage.getItem('theme')
    if (temaGuardado) {
      document.body.classList.remove('light')
      const nuevoTema = temaGuardado === 'light' ? Themes.light : Themes.nigth
      setTheme(nuevoTema)
      document.body.classList.add(nuevoTema.name)
    } else {
      setTheme(Themes.light)
      document.body.classList.add('light')
    }
  }, [])

  const changeTheme = () => {
    const nuevoTema = theme.name === 'light' ? Themes.nigth : Themes.light
    document.body.classList.remove(theme.name)
    document.body.classList.add(nuevoTema.name)
    localStorage.setItem('theme', nuevoTema.name)
    setTheme(nuevoTema)
  }

  return (
    <span onClick={changeTheme} className='changeThemeIcon'>
      {theme.icon}
    </span>
  )
}
