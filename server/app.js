const dotenv = require('dotenv')
const express = require('express');
const graphqlHTTP  = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema');

dotenv.config();

mongoose.connect(process.env.DB_URI)
mongoose.connection.once('open', () => console.log(`Connected to database at ${process.env.DB_URI}`))

const PORT = 4000;
const app = express();

app.use('/graphql', graphqlHTTP ({ 
  schema,
  graphiql: true, // dev tool
}));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
