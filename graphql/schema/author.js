module.exports = `
    extend type Query {
        authors: [Author!]!
        author(id: ID, name: String): Author!
    }

    extend type Mutation {
        createAuthor(name: String!, bio: String!): Author!
        updateAuthor(id: ID!, name: String, bio: String): Author!
        deleteAuthor(id: ID!): deleteAuthor!
    }

    extend type Subscription {
        authorAdded: Author
    }

    type Author {
        id: ID!
        name: String!
        bio: String!
        books: [Book!]!
    }

    type deleteAuthor {
        message: String!
    }
`