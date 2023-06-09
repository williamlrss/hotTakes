'use strict';

const jwt = require('jsonwebtoken');
const logger = require('../utils/winston');
require('dotenv').config();

const authenticate = async (req, res, next) => {
	// Get the authentication token from the request headers or query parameters

	if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
		logger.error('No token provided');

		return res.status(401).json({ error: 'Authentication failed, try to reconnect' });
	}

	try {
		// Verify the authentication token
		const token = req.headers.authorization.split(' ')[1];
		const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
		// Pass the decoded user ID to the next middleware or route handler
		const userId = decodedToken.userId;
		req.auth = { userId };

		// Proceed to the next middleware or route handler
		next();
	} catch (error) {
		logger.error('invalid token', error);
		return res
			.status(403)
			.json({ error: 'Wrong token or outdated after one hour, please reconnect' });
	}
};

module.exports = authenticate;
