const jwt = require('jsonwebtoken')
const { AuthenticationError } = require('apollo-server')

module.exports = {
    Authentication: async () => {
        const bearerToken = request.headers.authorization
        const token = bearerToken && bearerToken.split(' ')[1] ? bearerToken.split(' ')[1] : undefined

        if (typeof token !== 'undefined') {
            try {
                return await jwt.verify(token, process.env.JWT_SECRET)
            } catch (error) {
                // throw new AuthenticationError('Token Expired')
                // return new Error('Token Expired.')
                console.log('token expired')
                return false
            }
        } else {
            console.log('Bearer type')
            return false // FIXME: throw error 
            // console.log('testing');

            // return new Error('Bearer type')
            // throw new AuthenticationError('Bearer Type')
        }
    }
}