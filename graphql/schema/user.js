module.exports = `
    extend type Query{
        user: User!
    }

    type User {
        id: ID!
        name: String!        
    }
`