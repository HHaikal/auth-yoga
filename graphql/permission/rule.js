const { rule } = require('graphql-shield')
const { skip } = require('graphql-resolvers')
const jwt = require('jsonwebtoken')
const { AuthenticationError } = require('apollo-server')

const isAuthenticated = rule()(async (_, args, { request }, info) => {

    const bearerToken = request.headers.authorization
    const token = bearerToken && bearerToken.split(' ')[1] ? bearerToken.split(' ')[1] : undefined

    if (typeof token !== 'undefined') {
        await jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log('error')
                throw new AuthenticationError('Token Expired !')
            }
        })

        return true
    } else {
        throw new AuthenticationError('Bearer Type')
    }
})

const ruleWithCustomError = rule()(async (parent, args, ctx, info) => {
    return new Error('Custom error from rule.')
})

const ruleWithCustomErrorMessage = rule()(async (parent, args, ctx, info) => {
    return new Error('Custom error from rule.')
})



module.exports = {
    isAuthenticated,
    ruleWithCustomError,
    ruleWithCustomErrorMessage
}