import React, { useState } from 'react'

function LoginForm() {
  const [loginData, setLoginData] = useState(
    {
      email: '',
      phone: '',
      password: '',
    }
  )

  const [loginMethod, setloginMethod] = useState('emailLogin')

  const onLoginDataChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    })
    console.log(loginData);
  }

  const handleLogin = (e) => {
    e.preventDefault();

    // Call login API
    console.log("Checking login...");
  }

  const onLoginMethodChange = (e) => {
    setloginMethod(e.target.value);
    // console.log(e.target.value);
  }

  const emailLoginForm =
    <form onSubmit={handleLogin}>
      <div className="form-group mb-2">
        <label htmlFor="loginEmail">Email:</label>
        <input onChange={onLoginDataChange} type="email" className="form-control" id="loginEmail" name="email" placeholder="Enter your email" />
      </div>
      <div className="form-group mb-2">
        <label htmlFor="loginPassword">Password:</label>
        <input onChange={onLoginDataChange} type="password" className="form-control" id="loginPassword" name="password" placeholder="Enter your password" />
      </div>
      <button type="submit" className="btn btn-primary">Login</button>
    </form>

  const phoneLoginForm =
    <form onSubmit={handleLogin}>
      <div className="form-group mb-2">
        <label htmlFor="loginPhone">Phone:</label>
        <input onChange={onLoginDataChange} type="tel" className="form-control" id="loginPhone" name="phone" placeholder="Enter your phone" />
      </div>
      <div className="form-group mb-2">
        <label htmlFor="loginPassword">Password:</label>
        <input onChange={onLoginDataChange} type="password" className="form-control" id="loginPassword" name="password" placeholder="Enter your password" />
      </div>
      <button type="submit" className="btn btn-primary">Login</button>
    </form>
  return (
    <>
      <div className="form-group mb-2">
        <label htmlFor="loginMethod">Select your login method</label>
        <select onChange={onLoginMethodChange} className="form-control" id="loginMethod">
          <option value="emailLogin" name="emailLogin">By email</option>
          <option value="phoneLogin" name="phoneLogin">By phone number</option>
        </select>
      </div>
      {(loginMethod === 'emailLogin') ? emailLoginForm : phoneLoginForm}
    </>
  )
}

export default LoginForm