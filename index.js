const { GraphQLServer } = require('graphql-yoga')
const rootSchema = require('./graphql/schema')
const rootResolver = require('./graphql/resolver')
const permission = require('./graphql/permission')
const models = require('./models')
require('dotenv').config()

const server = new GraphQLServer({
    typeDefs: rootSchema,
    resolvers: rootResolver,
    middlewares: [permission],
    context: async req => {
        return {
            models: models,
            ...req,
        }
    }
})

server.start(4000, () => console.log('server start at port 4000'))