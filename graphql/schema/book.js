module.exports = `
    extend type Query {
        books: [Book!]!
        book(id: ID, name: String): Book!
    }

    extend type Mutation {
        createBook(name: String!, description: String!, authorId: ID!): Book!
        deleteBook(id: ID!): deleteBook!
        updateBook(id: ID!, name: String, description: String): Book!
    }

    extend type Subscription {
        bookAdded: Book
    }

    type Book {
        id: ID!
        name: String!
        description: String!
        author: Author!
    }

    type deleteBook {
        message: String!
    }
`