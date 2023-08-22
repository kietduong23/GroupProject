import React, { useState } from 'react'

function RegisterForm() {
    const [registerData, setRegisterData] = useState({
        email: '',
        phone: '',
        password: '',
        address: '',
    });

    const onRegisterDataChange = (e) => {
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value,
        });
        // console.log(registerData);
    }

    const handleRegister = (e) => {
        e.preventDefault();

        // Call register API
        console.log("Checking register...");
    }

    return (
        <form onSubmit={handleRegister}>
            <div className="form-group mb-2">
                <label htmlFor="email">Enter your email address:</label>
                <input onChange={onRegisterDataChange} type="email" className="form-control" id="email" name="email" placeholder="Enter your email" />
            </div>
            <div className="form-group mb-2">
                <label htmlFor="phone">Enter your phone:</label>
                <input onChange={onRegisterDataChange} type="tel" className="form-control" id="phone" name="phone" placeholder="Enter your phone" />
            </div>
            <div className="form-group mb-2">
                <label htmlFor="password">Enter your password:</label>
                <input onChange={onRegisterDataChange} type="password" className="form-control" id="password" name="password" placeholder="Enter your password" />
            </div>
            <div className="form-group mb-2">
                <label htmlFor="address">Enter your address:</label>
                <input onChange={onRegisterDataChange} type="text" className="form-control" id="address" name="address" placeholder="Enter your address" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default RegisterForm