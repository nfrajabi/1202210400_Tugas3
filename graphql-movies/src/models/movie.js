const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql://root:@localhost:3308/graphql_movies', {
  logging: console.log, // Tambahkan logging untuk debug
});

sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

const Movie = sequelize.define('Movie', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  director: {
    type: DataTypes.STRING,
  },
  releaseYear: {
    type: DataTypes.INTEGER,
  },
  rating: {
    type: DataTypes.FLOAT,
  },
});

module.exports = { sequelize, Movie };
