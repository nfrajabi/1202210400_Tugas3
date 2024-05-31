const { Movie } = require('../models/movie'); // Import model Movie

const movieResolver = {
    getMovie: async ({ id }) => {
      try {
        const movie = await Movie.findByPk(id);
        console.log('getMovie:', movie);
        return movie;
      } catch (error) {
        console.error('Error fetching movie:', error);
        throw new Error('Movie not found');
      }
    },
    getMovies: async () => {
      try {
        const movies = await Movie.findAll();
        console.log('getMovies:', movies);
        return movies;
      } catch (error) {
        console.error('Error fetching movies:', error);
        throw new Error('Could not fetch movies');
      }
    },
    addMovie: async ({ title, director, releaseYear, rating }) => {
        try {
          if (!title || typeof title !== 'string') {
            throw new Error('Invalid title');
          }
          if (rating < 0 || rating > 10) {
            throw new Error('Rating must be between 0 and 10');
          }
          console.log('addMovie input:', { title, director, releaseYear, rating });
          const newMovie = await Movie.create({ title, director, releaseYear, rating });
          console.log('addMovie result:', newMovie);
          return newMovie;
        } catch (error) {
          console.error('Error adding movie:', error);
          throw new Error('Could not add movie');
        }
      },
    updateMovie: async ({ id, title, director, releaseYear, rating }) => {
        try {
          const movie = await Movie.findByPk(id);
          if (!movie) {
            throw new Error('Movie not found');
          }
          if (title && typeof title !== 'string') {
            throw new Error('Invalid title');
          }
          if (rating !== undefined && (rating < 0 || rating > 10)) {
            throw new Error('Rating must be between 0 and 10');
          }
          await movie.update({ title, director, releaseYear, rating });
          console.log('updateMovie result:', movie);
          return movie;
        } catch (error) {
          console.error('Error updating movie:', error);
          throw new Error('Could not update movie');
        }
      },
    deleteMovie: async ({ id }) => {
      try {
        const movie = await Movie.findByPk(id);
        if (!movie) {
          throw new Error('Movie not found');
        }
        await movie.destroy();
        console.log('deleteMovie result: Movie deleted');
        return 'Movie deleted';
      } catch (error) {
        console.error('Error deleting movie:', error);
        throw new Error('Could not delete movie');
      }
    },
  };
  
  module.exports = movieResolver;
