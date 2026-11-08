import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Mail, Lock, LogIn } from 'lucide-react'

import AuthLayout from '../components/auth/AuthLayout'
import FormField from '../components/auth/FormField'
import { useAuth } from '../context/AuthContext'
import { isValidEmail } from '../utils/validators'
import { getLoginErrorMessage } from '../utils/apiErrors'


function Login() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { login } = useAuth()

  const [form, setForm] = useState({ email: state?.email ?? '', password: '' })
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const validate = () => {
    const next = {}

    if (!form.email.trim()) next.email = 'Add meg az e-mail címed.'
    else if (!isValidEmail(form.email)) next.email = 'Érvénytelen e-mail cím.'

    if (!form.password) next.password = 'Add meg a jelszavad.'

    return next
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isSubmitting) return

    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setSubmitError('')
    setIsSubmitting(true)

    try {
      await login(form.email.trim(), form.password)
      navigate('/courses', { replace: true })
    } catch (err) {
      setSubmitError(getLoginErrorMessage(err))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title='Üdv újra!'
      subtitle='Jelentkezz be a tárgyfelvételhez.'
      footer={<>Nincs még fiókod? <Link to='/register'>Regisztráció</Link></>}
    >
      <form className='auth-form' onSubmit={handleSubmit} noValidate>
        {state?.registered && !submitError && (
          <div className='auth-alert auth-alert--success' role='status'>
            Sikeres regisztráció! Most már bejelentkezhetsz.
          </div>
        )}

        {submitError && <div className='auth-alert' role='alert'>{submitError}</div>}

        <FormField
          label='E-mail cím'
          name='email'
          type='email'
          icon={Mail}
          autoComplete='email'
          placeholder='nev@example.com'
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />

        <FormField
          label='Jelszó'
          name='password'
          type='password'
          icon={Lock}
          autoComplete='current-password'
          placeholder='••••••••'
          value={form.password}
          onChange={handleChange}
          error={errors.password}
        />

        <button type='submit' className='auth-submit' disabled={isSubmitting}>
          <LogIn size={18} strokeWidth={2.5} /> {isSubmitting ? 'Bejelentkezés...' : 'Bejelentkezés'}
        </button>
      </form>
    </AuthLayout>
  )
}

export default Login