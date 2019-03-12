const {
    AuthenticationError
} = require('apollo-server')

const jwt = require('jsonwebtoken')

module.exports = {
    Mutation: {
        signup: async (parent, { name, email, password, password_confirmation }, { models }, info) => {
            console.log(email);

            // check if password match 
            if (password !== password_confirmation) {
                throw new AuthenticationError('Password did not match')
            }

            // check if email is avaible
            await models.user.findOne({
                where: { email: email }
            }).then(user => {
                if (user !== null) {
                    throw new AuthenticationError('Email already Used!')
                }
            })

            // create user
            const user = await models.user.create({
                name: name,
                email: email,
                password: password
            }).catch(() => {
                throw new AuthenticationError('Invalid credentials')
            })

            // create token
            const token = await jwt.sign({ userId: user.id, userEmail: user.email }, process.env.JWT_SECRET)
            if (token === null) {
                throw new AuthenticationError('failed to generate token contact developer')
            }

            // return value
            return {
                message: 'Hello',
                token: token
            }
        },
        signin: async (parent, { email, password }, { models }, info) => {
            // find email
            const user = await models.user.findByLogin(email).catch(err => {
                throw new AuthenticationError('Invalid credentials')
            })

            // compare password
            const isValid = await user.validatePassword(password)
            if (!isValid) {
                throw new AuthenticationError('invalid credentials')
            }

            // create token
            const token = await jwt.sign({ userId: user.id, userEmail: user.email }, process.env.JWT_SECRET)
            if (token === null) {
                throw new AuthenticationError('failed to generate token contact developer')
            }

            return {
                message: 'Hello',
                token: token
            }
        }
    }
}