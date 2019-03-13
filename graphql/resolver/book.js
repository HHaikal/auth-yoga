const { ForbiddenError, PubSub } = require('apollo-server')
const Op = require('sequelize').Op

const pubsub = new PubSub();
const BOOK_ADDED = 'BOOK_ADDED'

module.exports = {
    Query: {
        books: async (_, args, { models }) => {
            const books = await models.book.all().catch(() => {
                throw new ForbiddenError('Cant find any book')
            })

            return books
        },
        book: async (_, { id, name }, { models }) => {
            const book = await models.book.findOne({
                where: {
                    [Op.or]: [{ id: id }, { name: name }]
                }
            })
                .catch((err) => {
                    throw new ForbiddenError(err)
                })

            if (book === null) {
                throw new ForbiddenError('Cant find any book')
            } else {
                return book
            }
        }
    },
    Mutation: {
        createBook: async (_, { name, description, authorId }, { models }) => {
            const book = await models.book.create({
                name: name,
                description: description,
                authorId: authorId
            }).catch(() => {
                throw new ForbiddenError('Cant create book')
            })

            pubsub.publish(BOOK_ADDED, { bookAdded: book })
            return book
        },
        deleteBook: async (_, { id }, { models }) => {
            await models.book.destroy({
                where: {
                    id: id
                }
            }).catch(() => {
                throw new ForbiddenError('Failed to delete book')
            })

            return {
                message: 'Successful delete book!'
            }
        },
        updateBook: async (_, { id, name, description }, { models }) => {
            await models.book.update({
                name: name,
                description: description
            }, {
                    where: {
                        id: id
                    }
                })
                .catch(() => {
                    throw new ForbiddenError('Failed to update book')
                })

            const book = await models.book.findOne({
                where: {
                    id: id
                }
            }).catch(() => {
                throw new ForbiddenError('Failed to retrive book')
            })

            return book
        }
    },
    Subscription: {
        bookAdded: {
            // Additional event labels can be passed to asyncIterator creation
            subscribe: () => pubsub.asyncIterator([BOOK_ADDED]),
        },
    },
    Book: {
        author: async (_, args, { models }) => {
            const author = await models.author.findOne({
                where: {
                    id: _.authorId
                }
            }).catch(() => {
                throw new ForbiddenError('Failed to retrive author')
            })

            return author
        }
    }
}