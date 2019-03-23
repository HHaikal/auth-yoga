const auth = require('./auth')
const book = require('./book')
const author = require('./author')
const user = require('./user')
const error = require('./error')


module.exports = [auth, book, author, user, error]