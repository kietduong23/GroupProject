const customers = [
    {
        email: 'duonganhkiet1@gmail.com',
        phone: '0855395493',
        password: '123123',
        address: 'Nguyen Huu Tho, District 7, HCM City'
    },
    {
        email: 'duonganhkiet2@gmail.com',
        phone: '0855395494',
        password: '123123',
        address: 'Nguyen Huu Tho, District 7, HCM City'
    },
    {
        email: 'duonganhkiet3@gmail.com',
        phone: '0855395495',
        password: '123123',
        address: 'Nguyen Huu Tho, District 7, HCM City'
    }
]

export const doLogin = async (loginData) => {
    const { email, phone, password, loginMethod } = loginData;
    
    return new Promise(function (resolve) {
        setTimeout(() => {
            let customer = undefined;
            if (loginMethod === 'emailLogin') {
                customer = customers.find((customer) => customer.email === email);
            } else {
                customer = customers.find((customer) => customer.phone === phone);
            }
            if (customer !== undefined) {
                if (customer.password === password) {
                    resolve({ success: true, message: 'Successfully logged in', customer: customer });
                } else {
                    resolve({ success: false, message: 'Invalid password' });
                }
            } else {
                resolve({ success: false, message: 'Invalid username' });
            }
        }, 1000);
    });
}