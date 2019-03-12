module.exports = `
    extend type Mutation {
        signup(name: String!, email: String!, password: String!, password_confirmation: String!): Signup!
        signin(email: String!, password: String!): Signin!
    }

    type Signup {
        message: String!
        token: String!
    }
    
    type Signin {
        message: String!
        token: String!
    }
`