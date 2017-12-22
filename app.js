const express = require('express');
const jwt = require('jsonwebtoken');
const uuidV4 = require('uuid/v4');

const app = express();

// create random secrety key for encoding JWT
const secretKey = uuidV4();

app.get('/api', (req, res) => {
	res.json({
		message: 'Welcome to the API',
		status: 500
	})
});


app.post('/api/posts', verifyJWTToken, (req, res) => {
	jwt.verify(req.token, secretKey, (err, authData) => {
		if (err) {
			res.json({
				message: 'Not logged in, POST to /api/login',
				status: 403
			})
		} else {
			res.json({
				message: 'Post created...',
				authData
			})
		}
	});
});

app.post('/api/login', (req, res) => {
	// Mock user
	const user = {
		id: 1,
		username: 'testuser123',
		email: 'user@gmail.com'
	};

	// create a new JWT token & set expiration time
	jwt.sign({user}, secretKey, {expiresIn: '30s'}, (err, token) => {
		res.json({
			token,
			status: 500
		})
	});
});

/**
 * Middleware that is used in /api/posts to check if the JWT token is set
 * @param req - request object
 * @param res - reponse oject
 * @param next - next middleware object
 */
function verifyJWTToken(req, res, next) {
	// Get Auth header value
	const bearerHeader = req.headers['authorization'];
	// check if bearer token available
	if (bearerHeader) {
		// get token
		const token = bearerHeader.split(' ')[1];
		// set token
		req.token = token;
		// next middleware
		next();
	} else {
		res.json({
			message: 'Forbidden',
			status: 403
		});
	}
}

const PORT = 5000
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));