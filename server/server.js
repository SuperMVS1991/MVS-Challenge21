const express = require('express'); 
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4'); 
const cors = require('cors');
const { typeDefs, resolvers } = require('./schema'); 
const { authMiddleware } = require('./utils/auth')
const path = require('path');
const db = require('./config/connection');
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

const app = express();
const PORT = process.env.PORT || 3001;

app.use('*.css', (req, res, next) => {
  res.type('text/css');
  next();
}); 

app.use('*.js', (req, res, next) => {
  res.type('application/javascript');
  next();
});



const startApolloServer = async () => {
  await server.start();
  app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/graphql', expressMiddleware(server));
// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build'))); 

  app.use(express.static(path.join(__dirname, 'public'), {
    index: false, // Disable automatic index.html serving
    extensions: ['html', 'js'] // Allow serving .html and .js files
  }));
  

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
}


startApolloServer();