const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./graphql/schema')
const { resolvers } = require('./graphql/resolvers')

require('dotenv').config()
const cors = require('cors')
const rateLimit = require("express-rate-limit");
const morgan = require('morgan')
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
let db = mongoose.connection
db.on('error',  console.error.bind(console, 'Connection Error:'))
db.once('open', () => console.log('MongoDB Connected'))

let Projects = require('./model/Projects')

const app = express()
const corsOptions = {
    origin: "http://localhost:7000/",
    credentials: true
}
// app.use(cors(corsOptions));
app.use(cors());
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000                 // limit each IP to 1000 requests per windowMs
  }))
app.use(morgan('tiny'))       // or ('combined')


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
      Projects
  }),
});

server.applyMiddleware({ app }); // app is from an existing express app

app.listen({ port: 4000 }, () =>
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
)
