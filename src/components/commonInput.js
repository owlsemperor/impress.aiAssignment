import React, { useState } from 'react'
import './inputHandler.css'

const InputHandler = ({ onSubmit, editMode = false }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({ name: '', email: '' })

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ //this validate email part is copied
    return emailRegex.test(email)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let validationErrors = {}
    if (!name) {
      validationErrors.name = 'Name cannot be empty'
    }
    if (!email) {
      validationErrors.email = 'Email cannot be empty'
    } else if (!validateEmail(email)) {
      validationErrors.email = 'Invalid email format'
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    // Clear errors and submit
    setErrors({})
    onSubmit({ name, email })
    setName('')
    setEmail('')
  }

  return (
    <div className='input-container'>
      <div>
        <input
          type='text'
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <span className='error'>{errors.name}</span>}
      </div>
      <div>
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <span className='error'>{errors.email}</span>}
      </div>
      <div>
        <button onClick={handleSubmit}>
          {editMode ? 'Edit user' : 'Add user'}
        </button>
      </div>
    </div>
  )
}

export default InputHandler
