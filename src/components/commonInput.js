import React, { useState } from 'react'
import { Button, Input } from 'antd'
import 'antd/dist/antd.css'

import './inputHandler.css' // Custom styles

const InputHandler = ({ onSubmit, editMode = false }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({ name: '', email: '' })

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
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

    setErrors({})
    onSubmit({ name, email })
    setName('')
    setEmail('')
  }

  return (
    <div className='input-container'>
      <div className='input-field'>
        <Input
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <span className='error'>{errors.name}</span>}
      </div>
      <div className='input-field'>
        <Input
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <span className='error'>{errors.email}</span>}
      </div>
      <div className='submit-button'>
        <Button type='primary' onClick={handleSubmit} block>
          {editMode ? 'Edit user' : 'Add user'}
        </Button>
      </div>
    </div>
  )
}

export default InputHandler
