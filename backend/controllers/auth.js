'use strict';

const authService = require('../services/auth');
const logger = require('../utils/winston');
require('dotenv').config();

const signupUserController = async (req, res) => {
	const { email, password } = req.body;
	try {
		const result = await authService.createUser(email, password); // Call the 'logic and input validation' function
		res.status(201).json(result); // response success
	} catch (error) {
		logger.error(error);
		res.status(400).json({ error: error.message }); // response: authServices error
	}
};

const loginUserController = async (req, res) => {
	const { email, password } = req.body;
	try {
		const result = await authService.loginUser(email, password); // Call the 'logic and input validation' function
		res.status(200).json(result); // response success
	} catch (error) {
		logger.error(error);
		res.status(401).json({ error: error.message }); // response: authServices error
	}
};

const deleteUserController = async (req, res) => {
	const userId = req.params.id;
	try {
		const result = await authService.deleteUser(userId); // Call the 'logic and input validation' function
		res.status(200).json(result); // response success
	} catch (error) {
		logger.error(error);
		res.status(404).json({ error: error.message }); // response: authServices error
	}
};

module.exports = {
	loginUserController,
	signupUserController,
	deleteUserController,
}; // towards authRoutes
