const { skip } = require('graphql-resolvers')
const { AuthenticationError } = require('apollo-server')

export const isAuthenticated = (parent, args, { me }) =>
    me ? skip : new AuthenticationError('Not authenticated as user')