import React from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { Input } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'
import { authRegister } from '@renderer/api/Requests'
import BackgroundImage from '../../assets/img/background.gif'
import './Auth.scss'

export const Register = () => {
  const navigate = useNavigate()
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

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      await authRegister(data)
      navigate('/login')
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
      name: 'name',
      type: 'text',
      label: 'Nombre',
      placeholder: 'Ingresa tu nombre',
    },
    {
      name: 'lastName',
      type: 'text',
      label: 'Apellido',
      placeholder: 'Ingresa tu apellido',
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password',
      placeholder: 'Ingresa la contraceña para tu cuenta',
    },
  ]

  return (
    <form onSubmit={handleRegister}>
      <div className='authContainer'>
        <div className='authFormLeft'>
          <div className='authFormContainer'>
            <div>
              <h3>
                <span className='degradezPalabra'>Registrarme</span>
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
              </div>
              <button className='loginButton' type='submit'>
                Registrarme
              </button>
              <p className='authFormMessage'>
                ¿Ya estas registrado en la plataforma?
                <span>
                  <Link to='/login'> Inicia sesión</Link>
                </span>
              </p>
            </div>
            <div className='or'>
              <span>O</span>
            </div>
            <p className='authFormTermsAndConditions'>
              Al registrarse aceptas nuestros &nbsp;
              <span>Términos y condiciones</span> y la <span>Política de privacidad</span>.
            </p>
          </div>
        </div>
        <div className='authFormimageRight'>
          <img src={BackgroundImage} />
        </div>
      </div>
    </form>
  )
}
