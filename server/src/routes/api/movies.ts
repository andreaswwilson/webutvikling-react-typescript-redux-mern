import { Response, Request } from 'express';
import { DB } from '../../database';
import { Router } from '../Router';
/**
 * @route   GET api/movies
 * @desc    Get all movies
 * @access  Public
 */
Router.instance.get('/', async (req: Request, res: Response) => {
  try {
    req === req; // remove annoying "req not used warning"
    const movies = await DB.Models.Movie.find({});
    if (!movies) throw Error('No items');

    res.status(200).json(movies);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route Get api/movies/:id
 * @desc Get movie by id
 * @access Public
 */
Router.instance.get('/:id', async (req: Request, res: Response) => {
  try {
    const movie = await DB.Models.Movie.findById(req.params.id);
    if (!movie) throw Error('No record found');
    res.status(200).json(movie);
  } catch (error) {
    res.status(400).json({ id: req.params.id, msg: error.message });
  }
});

/**
 * @route Get api/movies/year/:year
 * @desc get movie by year
 * @access Public
 */
Router.instance.get('/year/:year', async (req: Request, res: Response) => {
  try {
    const movie = await DB.Models.Movie.find({ Year: req.params.year });
    if (!movie) throw Error('No record found');
    res.status(200).json(movie);
  } catch (error) {
    res.status(400).json({ year: req.params.year, msg: error.message });
  }
});

/**
 * @route Get api/movies/title/:title
 * @desc get movie by a partial title. case-insensitive
 * @access Public
 */
Router.instance.get('/title/:title', async (req: Request, res: Response) => {
  try {
    const movie = await DB.Models.Movie.find({
      Title: { $regex: req.params.title, $options: 'i' }, // option i = case insensitive
    });
    if (!movie) throw Error('No record found');
    res.status(200).json(movie);
  } catch (error) {
    res.status(400).json({ year: req.params.title, msg: error.message });
  }
});

export default Router.instance;

// /**
//  * @route   POST api/movies
//  * @desc    Create a movie
//  * @access	Public
//  */

// router.post('/', async (req: Request, res: Response) => {
//   const newMovie = new Movie({
//     title: req.body.title,
//     plot: req.body.plot,
//     year: req.body.year,
//     genre: req.body.genre,
//     director: req.body.director,
//     actors: req.body.actors,
//     imdbRating: req.body.imdbRating,
//     poster: req.body.poster,
//   });

//   try {
//     const movie = await newMovie.save();
//     if (!movie) throw Error('Something went wrong saving the item');

//     res.status(200).json(movie);
//   } catch (e) {
//     res.status(400).json({ msg: e.message });
//   }
// });

// // /**
// //  * @route   DELETE api/movie/:id
// //  * @desc    Delete A movie
// //  * @access  Public
// //  */

// router.delete('/:id', async (req: Request, res: Response) => {
//   try {
//     const movie = await Movie.findById(req.params.id);
//     if (!movie) throw Error('No item found');

//     const removed = await movie.remove();
//     if (!removed)
//       throw Error('Something went wrong while trying to delete the item');

//     res.status(200).json({ success: true });
//   } catch (e) {
//     res.status(400).json({ msg: e.message, success: false });
//   }
// });
