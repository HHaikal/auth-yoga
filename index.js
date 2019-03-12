const { GraphQLServer } = require('graphql-yoga')

const rootSchema = require('./graphql/schema')
const rootResolver = require('./graphql/resolver')

const models = require('./models')

const server = new GraphQLServer({
    typeDefs: rootSchema,
    resolvers: rootResolver,
    context: {
        models: models
    }
})
require('dotenv').config()
server.start(4000, () => console.log('server start at port 4000'))

