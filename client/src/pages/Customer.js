import React from 'react'
import RegisterForm from '../components/RegisterForm'
import LoginForm from '../components/LoginForm'

function Customer() {
    return (
        <div className='container'>
            <div className='card'>
                <div className='card-body'>
                    <h3 className='card-title'>Register</h3>
                    <RegisterForm />
                </div>
            </div>

            <div className='card'>
                <div className='card-body'>
                    <h3 className='card-title'>Login</h3>
                    <LoginForm />
                </div>
            </div>
            
        </div>
    )
}

export default Customer