const express = require('express');
const Joi = require('joi');

const app = express();
app.use(express.json());

app.post('/register', (req, res) => {
    console.log('Received POST request to /register');
    console.log('Request body:', req.body);

    // Define the schema for validation
    const schema = Joi.object({
        username: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().email().required(),
        userType: Joi.string().valid('admin', 'regular').required(),
        // Conditional validation based on userType
        isAdmin: Joi.when('userType', {
            is: 'admin',
            then: Joi.boolean().required(),
            otherwise: Joi.forbidden(),
        }),
    });

    // Validate the request body against the schema
    const { error, value } = schema.validate(req.body);

    if (error) {
        console.log('Validation error:', error.details);
        return res.status(400).json({ error: error.details[0].message });
    }

    // Check if the username or email is already registered
    if (users.some(user => user.username === value.username || user.email === value.email)) {
        console.log('User already registered:', value.username, value.email);
        return res.status(400).json({ error: 'Username or email already registered' });
    }

    // Add the user to the in-memory storage
    users.push(value);

    // In a real-world scenario, you would save the user data to a database here

    console.log('Registration successful for:', value.username);
    res.status(200).json({ message: 'Registration successful', data: value });
});


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
