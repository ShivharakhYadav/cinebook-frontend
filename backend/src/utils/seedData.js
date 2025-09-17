const Movie = require('../models/Movie');
const Show = require('../models/Show');

const sampleMovies = [
  {
    title: 'Avengers: Endgame',
    description: 'The epic conclusion to the Infinity Saga that sees the Avengers assembling once more to restore the universe.',
    genre: ['Action', 'Adventure', 'Sci-Fi'],
    duration: 181,
    rating: 8.4,
    movieLanguage: 'English',
    poster: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400',
    releaseDate: new Date('2019-04-26'),
    cast: ['Robert Downey Jr.', 'Chris Evans', 'Mark Ruffalo', 'Chris Hemsworth'],
    director: 'Anthony Russo, Joe Russo'
  },
  {
    title: 'The Dark Knight',
    description: 'Batman faces off against his greatest challenge yet: the Joker, a criminal mastermind who wants to plunge Gotham into chaos.',
    genre: ['Action', 'Crime', 'Drama'],
    duration: 152,
    rating: 9.0,
    movieLanguage: 'English',
    poster: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    releaseDate: new Date('2008-07-18'),
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
    director: 'Christopher Nolan'
  },
  {
    title: 'Inception',
    description: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.',
    genre: ['Action', 'Sci-Fi', 'Thriller'],
    duration: 148,
    rating: 8.8,
    movieLanguage: 'English',
    poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400',
    releaseDate: new Date('2010-07-16'),
    cast: ['Leonardo DiCaprio', 'Marion Cotillard', 'Tom Hardy'],
    director: 'Christopher Nolan'
  },
  {
    title: 'RRR',
    description: 'A fictional story about two legendary revolutionaries and their journey away from home before they started fighting for their country.',
    genre: ['Action', 'Adventure', 'Drama'],
    duration: 187,
    rating: 7.9,
    movieLanguage: 'Telugu',
    poster: 'https://images.unsplash.com/photo-1594736797933-d0401ba0a2d3?w=400',
    releaseDate: new Date('2022-03-25'),
    cast: ['N.T. Rama Rao Jr.', 'Ram Charan', 'Alia Bhatt'],
    director: 'S.S. Rajamouli'
  },
  {
    title: 'Spider-Man: No Way Home',
    description: 'Spider-Man seeks help from Doctor Strange to make everyone forget his secret identity, but the spell goes wrong.',
    genre: ['Action', 'Adventure', 'Sci-Fi'],
    duration: 148,
    rating: 8.2,
    movieLanguage: 'English',
    poster: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400',
    releaseDate: new Date('2021-12-17'),
    cast: ['Tom Holland', 'Zendaya', 'Benedict Cumberbatch'],
    director: 'Jon Watts'
  },
  {
    title: 'Dune',
    description: 'Feature adaptation of Frank Herbert\'s science fiction novel about a duke\'s son leading desert warriors against the emperor.',
    genre: ['Action', 'Adventure', 'Sci-Fi'],
    duration: 155,
    rating: 8.0,
    movieLanguage: 'English',
    poster: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400',
    releaseDate: new Date('2021-10-22'),
    cast: ['Timothée Chalamet', 'Rebecca Ferguson', 'Zendaya'],
    director: 'Denis Villeneuve'
  }
];

const theaters = [
  { name: 'PVR Cinemas', screens: ['Screen 1', 'Screen 2', 'Screen 3', 'Screen 4'] },
  { name: 'INOX Movies', screens: ['Screen A', 'Screen B', 'Screen C'] },
  { name: 'Cinépolis', screens: ['Screen 1', 'Screen 2', 'Screen 3'] },
  { name: 'Multiplex Cinema', screens: ['Hall 1', 'Hall 2', 'Hall 3'] }
];

const generateShowsForMovie = (movieId) => {
  const shows = [];
  const today = new Date();

  // Generate shows for next 7 days
  for (let day = 0; day < 7; day++) {
    const showDate = new Date(today);
    showDate.setDate(today.getDate() + day);

    // Generate 3-4 shows per day across different theaters
    const showTimes = ['10:00', '14:30', '18:00', '21:30'];

    showTimes.forEach((time, index) => {
      const theater = theaters[index % theaters.length];
      const screen = theater.screens[Math.floor(Math.random() * theater.screens.length)];

      const [hours, minutes] = time.split(':').map(Number);
      const startTime = new Date(showDate);
      startTime.setHours(hours, minutes, 0, 0);

      const endTime = new Date(startTime);
      endTime.setHours(startTime.getHours() + 3); // Assume 3 hour duration including ads

      shows.push({
        movieId,
        theater: theater.name,
        screen,
        startTime,
        endTime,
        price: Math.floor(Math.random() * 200) + 150, // Random price between ₹150-350
        totalSeats: 140, // 10 rows × 14 seats
        bookedSeats: Math.floor(Math.random() * 30) // Random pre-booked seats
      });
    });
  }

  return shows;
};

const seedData = async () => {
  try {
    // Clear existing data
    await Movie.deleteMany({});
    await Show.deleteMany({});

    console.log('Seeding movies...');

    // Insert movies
    const createdMovies = await Movie.insertMany(sampleMovies);
    console.log(`${createdMovies.length} movies seeded`);

    console.log('Seeding shows...');

    // Generate shows for each movie
    const allShows = [];
    createdMovies.forEach(movie => {
      const movieShows = generateShowsForMovie(movie._id);
      allShows.push(...movieShows);
    });
    console.log("Total shows to be seeded:", allShows);
    // Insert shows
    await Show.insertMany(allShows);
    console.log(`${allShows.length} shows seeded`);

    console.log('Sample data seeded successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

module.exports = { seedData };