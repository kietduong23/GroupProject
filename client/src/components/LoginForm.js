import React, { useContext, useState } from 'react'
import { doLogin } from '../api/customers'
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

function LoginForm() {
  const { authState } = useContext(AuthContext);
  const { isAuthenticated } = authState;
  const [loginData, setLoginData] = useState(
    {
      email: '',
      phone: '',
      password: '',
      loginMethod: 'emailLogin',
    }
  )

  const [loginMethod, setloginMethod] = useState('emailLogin');
  const [message, setMessage] = useState('')

  const onLoginDataChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    })
    // console.log(loginData);
  }

  const { doCustomerLogin } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Call login API
    try {
      const res = await doCustomerLogin(loginData);
      setMessage(res.message);
    } catch (error) {
      console.log(error);
    }
  }

  const onLoginMethodChange = (e) => {
    const method = e.target.value;
    setloginMethod(method);
    if (method === 'emailLogin') {
      setLoginData({
        ...loginData,
        phone: '',
        password: '',
        loginMethod: method,
      })
    } else {
      setLoginData({
        ...loginData,
        email: '',
        password: '',
        loginMethod: method,
      })
    }
    // console.log(method);
  }

  const emailLoginForm =
    <form onSubmit={handleLogin}>
      <div className="form-group mb-2">
        <label htmlFor="loginEmail">Email:</label>
        <input onChange={onLoginDataChange} type="email" className="form-control" id="loginEmail" name="email" placeholder="Enter your email" value={loginData.email} />
      </div>
      <div className="form-group mb-2">
        <label htmlFor="loginPassword">Password:</label>
        <input onChange={onLoginDataChange} type="password" className="form-control" id="loginPassword" name="password" placeholder="Enter your password" value={loginData.password} />
      </div>
      <button type="submit" className="btn btn-primary">Login</button>
    </form>

  const phoneLoginForm =
    <form onSubmit={handleLogin}>
      <div className="form-group mb-2">
        <label htmlFor="loginPhone">Phone:</label>
        <input onChange={onLoginDataChange} type="tel" className="form-control" id="loginPhone" name="phone" placeholder="Enter your phone" value={loginData.phone} />
      </div>
      <div className="form-group mb-2">
        <label htmlFor="loginPassword">Password:</label>
        <input onChange={onLoginDataChange} type="password" className="form-control" id="loginPassword" name="password" placeholder="Enter your password" value={loginData.password} />
      </div>
      <button type="submit" className="btn btn-primary">Login</button>
    </form>
  return (
    <>
      {(!isAuthenticated) ? (<>
        <div className='card' style={{ width: '400px' }}>
        <div className='card-body'>
          <h3 className='card-title'>Customer Login</h3>
          <div className="form-group mb-2">
            <label htmlFor="loginMethod">Select your login method</label>
            <select onChange={onLoginMethodChange} className="form-control" id="loginMethod">
              <option value="emailLogin" name="emailLogin">By email</option>
              <option value="phoneLogin" name="phoneLogin">By phone number</option>
            </select>
          </div>
          {(loginMethod === 'emailLogin') ? emailLoginForm : phoneLoginForm}
          <div className='message'>{message}</div>
        </div>
      </div>
      </>) :
        (<Navigate to="/customer" replace />)
      }
    </>
  )
}

export default LoginForm