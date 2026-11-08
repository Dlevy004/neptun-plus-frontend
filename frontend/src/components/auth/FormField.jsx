import { useId, useState } from 'react'
import PropTypes from 'prop-types'
import { Eye, EyeOff } from 'lucide-react'

import './FormField.css'


function FormField({ label, name, type = 'text', value, onChange, error, icon: Icon, autoComplete, placeholder }) {
  const id = useId()
  const errorId = `${id}-error`
  const [showPassword, setShowPassword] = useState(false)

  const isPassword = type === 'password'
  const inputType = isPassword && showPassword ? 'text' : type
  const inputClass = [Icon && 'has-icon', isPassword && 'has-toggle'].filter(Boolean).join(' ')

  return (
    <div className={`form-field ${error ? 'form-field--error' : ''}`}>
      <label htmlFor={id}>{label}</label>

      <div className='form-field-control'>
        {Icon && <Icon className='form-field-icon' size={18} aria-hidden='true' />}

        <input
          id={id}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={inputClass}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
        />

        {isPassword && (
          <button
            type='button'
            className='form-field-toggle'
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Jelszó elrejtése' : 'Jelszó megjelenítése'}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error && <p id={errorId} className='form-field-error' role='alert'>{error}</p>}
    </div>
  )
}

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  icon: PropTypes.elementType,
  autoComplete: PropTypes.string,
  placeholder: PropTypes.string
}

export default FormField