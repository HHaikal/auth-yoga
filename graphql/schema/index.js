const auth = require('./auth')
const author = require('./author')
const book = require('./book')

const rootSchema = `
    type Query {
        _: Boolean
    }

    type Mutation {
        _: Boolean
    }

    type Subscription {
        _: Boolean
    }
`

module.exports = [rootSchema, auth, book, author]