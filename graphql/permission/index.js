const { shield, and, not, or } = require('graphql-shield')
const {
    isAuthenticated,
} = require('./rule')

module.exports = shield({
    Query: {
        authors: isAuthenticated,
        user: isAuthenticated
    },
}, {
        debug: true
    })