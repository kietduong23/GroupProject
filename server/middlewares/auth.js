const jwt = require('jsonwebtoken')
const SECRET_KEY = 'Group16';

const verifyToken = (req, res, next) => {
	const header = req.header('Authorization')
	const token = header && header.split(' ')[1]

	if (!token) {
		return res.status(401).json({ success: false, msg: 'User token not found' })
    }
	try {
		const decrypted = jwt.verify(token, SECRET_KEY)
		req.userID = decrypted.userID
		next()
	} catch (error) {
		console.log(error)
		return res.status(500).json({ success: false, msg: 'Invalid token' })
	}
}

module.exports = verifyToken