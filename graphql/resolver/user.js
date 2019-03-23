const { AuthenticationError } = require('apollo-server')

module.exports = {
    Query: {
        user: async (_, args, { models, authDecode }, info) => {

            const user = await models.user.findByLogin(authDecode.userEmail).catch(err => {
                throw new AuthenticationError('Invalid credentials')
            })

            return user
        }
    }
}