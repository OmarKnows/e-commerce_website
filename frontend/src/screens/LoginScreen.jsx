import React from 'react'

const loginScreen = () => {
  return (
    <div className='container'>
      <form>
        <div className='form-group'>
          <input
            type='text'
            className='form-control'
            id='username'
            placeholder='Username'
          />
        </div>
        <div className='form-group py-3'>
          <input
            type='password'
            className='form-control'
            id='password'
            placeholder='Password'
          />
        </div>
        <div className='d-grid gap-2'>
          <button type='submit' className='btn btn-primary my-3'>
            Login
          </button>
        </div>
      </form>
    </div>
  )
}

export default loginScreen
