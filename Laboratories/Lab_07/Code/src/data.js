// Array of film objects with details such as title, favorite status, watch date, and rating
const films = [
  { id: 1, title: 'Pulp Fiction', favorite: true, watchDate: '2023-03-10', rating: 5 },
  { id: 2, title: 'The Godfather', favorite: false, watchDate: null, rating: null },
  { id: 3, title: 'The Dark Knight', favorite: true, watchDate: '2023-03-15', rating: 4 },
  // ...other films
];

// Array of filter objects, each containing a name, display name, and a filter function
const filters = [
  { name: 'All', displayName: 'All Films', filterFunction: () => true }, // Show all films
  { name: 'Favorites', displayName: 'Favorites', filterFunction: film => film.favorite }, // Show favorite films
  { name: 'Unwatched', displayName: 'Unwatched', filterFunction: film => !film.watchDate }, // Show films not watched
  { name: 'Best Rated', displayName: 'Best Rated', filterFunction: film => film.rating >= 5 }, // Show films with a rating of 5 or higher
  { name: 'Seen Last Month', displayName: 'Seen Last Month', filterFunction: film => false }, // Placeholder for future logic
];

// Export the films and filters arrays for use in other parts of the application
export { films, filters };
