import React from 'react'
import toast from 'react-hot-toast'
import { Input } from '@nextui-org/react'
import { authLogin } from '@renderer/api/Requests'
import { Link, NavLink } from 'react-router-dom'
import BackgroundImage from '../../assets/img/background.gif'
import './Auth.scss'

export const Login = () => {
  const [data, setData] = React.useState({
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      const token = localStorage.getItem('token')
      const response = await authLogin(data)
      const tokenRes = response.data

      if (!token) {
        localStorage.setItem('token', tokenRes)
        window.location.reload()
      }
    } catch (error: any) {
      if (error.response.data.errors) {
        toast.error(error.response.data.errors[0].messages[0])
      }

      if (error.response.data.message) {
        toast.error(error.response.data.message)
      }
    }
  }

  const inputs = [
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      placeholder: 'Ingresa tu correo',
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password',
      placeholder: 'Ingresa tu contraceña',
    },
  ]

  return (
    <form onSubmit={handleLogin}>
      <div className='authContainer'>
        <div className='authFormLeft'>
          <div className='authFormContainer'>
            <div>
              <h3>
                <span className='degradezPalabra'>Iniciar Sesión</span>
              </h3>
              <div className='authForm'>
                {inputs.map((item, index) => (
                  <Input
                    key={index}
                    type={item.type}
                    name={item.name}
                    label={item.label}
                    onChange={handleChange}
                    placeholder={item.placeholder}
                  />
                ))}
                <div className='forgetPassword'>
                  <div className='rememberMe'>
                    <input type='checkbox' />
                    <span>Recordarme</span>
                  </div>
                  <Link to='/password/reset'>¿Olvidó la contraseña?</Link>
                </div>
              </div>
              <button className='loginButton' type='submit'>
                Iniciar sesión
              </button>
              <p className='authFormMessage'>
                ¿Aún no estas registrado en la plaraforma?
                <span>
                  <NavLink to='/register'> Regístrese</NavLink>
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className='authFormimageRight'>
          <img src={BackgroundImage} />
        </div>
      </div>
    </form>
  )
}
