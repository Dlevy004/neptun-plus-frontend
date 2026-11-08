import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, User, AtSign, GraduationCap, UserPlus } from 'lucide-react'

import AuthLayout from '../components/auth/AuthLayout'
import FormField from '../components/auth/FormField'
import { useAuth } from '../context/AuthContext'
import { isValidEmail } from '../utils/validators'
import { getGenericErrorMessage, getRegisterFieldErrors } from '../utils/apiErrors'

const INITIAL_FORM = {
  last_name: '',
  first_name: '',
  username: '',
  email: '',
  department: '',
  password: '',
  confirmPassword: '',
}


function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()

  const [form, setForm] = useState(INITIAL_FORM)
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

    if (!form.last_name.trim()) next.last_name = 'Add meg a vezetékneved.'
    if (!form.first_name.trim()) next.first_name = 'Add meg a keresztneved.'

    const username = form.username.trim()
    if (!username) next.username = 'Add meg a felhasználóneved.'
    else if (username.length < 3 || username.length > 50) next.username = 'A felhasználónév 3–50 karakter legyen.'

    if (!form.email.trim()) next.email = 'Add meg az e-mail címed.'
    else if (!isValidEmail(form.email)) next.email = 'Érvénytelen e-mail cím.'

    if (!form.department.trim()) next.department = 'Add meg a szakod vagy tanszéked.'

    if (!form.password) next.password = 'Adj meg egy jelszót.'
    else if (form.password.length < 8) next.password = 'A jelszó legalább 8 karakter legyen.'

    if (!form.confirmPassword) next.confirmPassword = 'Erősítsd meg a jelszavad.'
    else if (form.confirmPassword !== form.password) next.confirmPassword = 'A két jelszó nem egyezik.'

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
      await register({
        email: form.email.trim(),
        username: form.username.trim(),
        password: form.password,
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        department: form.department.trim(),
      })

      navigate('/login', { state: { registered: true, email: form.email.trim() } })
    } catch (err) {
      const fieldErrors = getRegisterFieldErrors(err)
      const hasVisibleFieldError = Object.keys(fieldErrors).some((key) => key in INITIAL_FORM)

      if (hasVisibleFieldError) setErrors(fieldErrors)
      else setSubmitError(getGenericErrorMessage(err))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title='Fiók létrehozása'
      subtitle='Pár adat, és már fel is veheted a tárgyaidat.'
      footer={<>Van már fiókod? <Link to='/login'>Bejelentkezés</Link></>}
    >
      <form className='auth-form' onSubmit={handleSubmit} noValidate>
        {submitError && <div className='auth-alert' role='alert'>{submitError}</div>}

        <div className='auth-row'>
          <FormField
            label='Vezetéknév'
            name='last_name'
            icon={User}
            autoComplete='family-name'
            value={form.last_name}
            onChange={handleChange}
            error={errors.last_name}
          />
          <FormField
            label='Keresztnév'
            name='first_name'
            autoComplete='given-name'
            value={form.first_name}
            onChange={handleChange}
            error={errors.first_name}
          />
        </div>

        <FormField
          label='Felhasználónév'
          name='username'
          icon={AtSign}
          autoComplete='username'
          value={form.username}
          onChange={handleChange}
          error={errors.username}
        />

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
          label='Szak / tanszék'
          name='department'
          icon={GraduationCap}
          value={form.department}
          onChange={handleChange}
          error={errors.department}
        />

        <FormField
          label='Jelszó'
          name='password'
          type='password'
          icon={Lock}
          autoComplete='new-password'
          value={form.password}
          onChange={handleChange}
          error={errors.password}
        />

        <FormField
          label='Jelszó megerősítése'
          name='confirmPassword'
          type='password'
          icon={Lock}
          autoComplete='new-password'
          value={form.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        <button type='submit' className='auth-submit' disabled={isSubmitting}>
          <UserPlus size={18} strokeWidth={2.5} /> {isSubmitting ? 'Regisztráció...' : 'Regisztráció'}
        </button>
      </form>
    </AuthLayout>
  )
}

export default Register