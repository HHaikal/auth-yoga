const { shield, and, not, or } = require('graphql-shield')
const {
    isAuthenticated,
    ruleWithCustomError,
    ruleWithCustomErrorMessage
} = require('./rule')

module.exports = shield({
    Query: {
        authors: isAuthenticated,
        user: isAuthenticated,
        customErrorInRule: ruleWithCustomError,
        customErrorMessageInRule: ruleWithCustomErrorMessage,
    },
}, {
        debug: true
    })