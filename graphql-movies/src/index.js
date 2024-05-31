const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser'); // Import bodyParser
const { graphqlHTTP } = require('express-graphql'); // Import express-graphql
const schema = require('./schema/movieSchema'); // Import schema
const movieResolver = require('./resolvers/movieResolver'); // Import resolver
const authMiddleware = require('./middleware/auth'); // Import middleware autentikasi
const { sequelize } = require('./models/movie'); // Import sequelize

const app = express();

app.use(bodyParser.json()); // Gunakan bodyParser untuk parsing body permintaan

// Route untuk login
app.post('/login', (req, res) => {
  // Proses autentikasi pengguna (contoh sederhana)
  const { username, password } = req.body;

  // Periksa apakah username dan password valid
  if (username === 'user' && password === 'password') {
    // Buat token JWT
    const token = jwt.sign({ username: 'user' }, 'your_secret_key', { expiresIn: '1h' });
    // Kirim token sebagai respons
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Gunakan middleware autentikasi sebelum menentukan rute GraphQL
app.use('/graphql', authMiddleware, graphqlHTTP({
  schema: schema,
  rootValue: movieResolver,
  graphiql: true,
}));

sequelize.sync()
  .then(() => {
    app.listen(4000, () => {
      console.log('Server is running on http://localhost:4000');
    });
  })
  .catch(err => {
    console.error('Unable to sync database:', err);
    process.exit(1); // Keluar dari proses dengan kode kesalahan
  });
