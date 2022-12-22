const express = require('express')
const app = express()
// build schema helps to build the schema using grpahql schema lanugage and the type system 
const { buildSchema } = require('graphql')
const { loadFilesSync } = require('@graphql-tools/load-files')
// this is the express middleware function that responds to any graphql queries -> used to connect express with graphql
// this is when we are using express-graphql package
const { graphqlHTTP } = require('express-graphql')
// this is when we use apollo server
const { ApolloServer } = require('apollo-server-express')
const { products } = require('./products/products.model')
const { orders } = require('./orders/orders.model')

// this replaces the above build schema as this helps  our graphQL logic and schema to be modularized ... 
const { makeExecutableSchema } = require('@graphql-tools/schema')

// this will include all the " .graphql " files by lookging into every directory and sub directory
const typesArray = loadFilesSync('**/*', {
    extensions: ['graphql'],
  });

const resolversArray = loadFilesSync('**/*', {
    extensions: ['resolvers.js'],
  });


async function startApolloServer(){
  const app = express()
// typeDefs contains an array of string of our schema
// resolvrs takes in the object of all the resolvers for our query
// each of the function takes in an argument in case graphql makes availbale for us
// parent is the root value of tat stuff
//  args is there when we have parameterized query
// context is used for data which is shared between all of the resolvers
// info contains information about the surrent state of the operation
  const schema = makeExecutableSchema({
    typeDefs: typesArray,
    resolvers: resolversArray
  })

  // this contains all the middleware and logic to handle all the incoming request
  const server = new ApolloServer({
    schema:schema
  })

  await server.start();
  // this connects apollo graphql middleware with our express server
  server.applyMiddleware({app, path:'/graphql'})

app.listen(3000,()=>{
  console.log('graphql server listening ...')
})
}

startApolloServer()


// const schemaText = `
// type Query {
//     products: [Product]
//     orders: [Order]
// }

// type Product {
//     id:ID!
//     description: String!
//     reviews: [Review]
//     price: Float!
// }

// type Review {
//     rating: Int!
//     comment: String
// }

// type Order {
//     date: String!
//     subtotal: Float!
//     items: [OrderItem]
// }

// type OrderItem {
//     product: Product!
//     quantity: Int!
// }

// `

// type Query  -> this root defines the entry for wvery graphql entry
// quering to products will return list of " Products "
// " ! " indicates required: true

// const schema = buildSchema(schemaText)


// we no londer need this after we make resolvers 
// const root = {
//     products : products,
//       orders : orders
// }







// this string parameter defines whre to mount our graphql endpoint
// graphiql is an IDE which helps in testing our graphql servers more easily -> it is a frontend application
// graphiql:true -> by doing this we enable graphiql
// app.use('/graphql',graphqlHTTP({
//     schema:schema,
//     // rootValue: root,
//     graphiql:true
// }))


