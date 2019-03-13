const { ForbiddenError, PubSub } = require('apollo-server')
const Op = require('sequelize').Op

const pubsub = new PubSub();
const AUTHOR_ADDED = 'AUTHOR_ADDED'

module.exports = {
    Query: {
        authors: async (_, args, { models }) => {
            const authors = await models.author.all().catch(() => {
                throw new ForbiddenError('Cant find any author')
            })

            return authors
        },
        author: async (_, { id, name }, { models }) => {
            const author = await models.author.findOne({
                where: {
                    [Op.or]: [{ id: id }, { name: name }]
                }
            }).catch((err) => {
                throw new ForbiddenError('Cant retrive any author ' + err)
            })

            if (author === null) {
                throw new ForbiddenError('Cant retrive any author')
            } else {
                return author
            }
        }
    },
    Mutation: {
        createAuthor: async (_, { name, bio }, { models }) => {
            const author = await models.author.create({
                name: name,
                bio: bio
            }).catch(() => {
                throw new ForbiddenError('Cant create author')
            })

            pubsub.publish(AUTHOR_ADDED, { authorAdded: author })
            return author
        },
        updateAuthor: async (_, { id, name, bio }, { models }) => {
            await models.author.update({
                name: name,
                bio: bio
            }, {
                    where: {
                        id: id
                    }
                })
                .catch(err => {
                    throw new ForbiddenError('Failed to update author ' + err)
                })

            const author = await models.author.findOne({
                where: {
                    id: id
                }
            })
                .catch(err => {
                    throw new ForbiddenError('Failed to retrive author ' + err)
                })

            return author
        },
        deleteAuthor: async (_, { id }, { models }) => {
            const books = await models.book.findAll({ // FIXME: cannot return resolve inside then()
                where: {
                    authorId: id
                }
            })

            if (books[0]) {
                const rowId = []

                books.map(row => {
                    rowId.push(row.id)
                })
                return {
                    message: "you cant delete author if theres still a book id " + rowId
                }

            }

            await models.author.destroy({
                where: {
                    id: id
                }
            })

            return {
                message: 'Successfully delete author'
            }
        }
    },
    Subscription: {
        authorAdded: {
            subscribe: () => pubsub.asyncIterator([AUTHOR_ADDED])
        }
    },
    Author: {
        books: async (_, args, { models }) => {
            const books = await models.book.findAll({
                where: {
                    authorId: _.id
                }
            }).catch((err) => {
                throw new ForbiddenError('Cant retrive any book ' + err)
            })

            return books
        }
    }

}