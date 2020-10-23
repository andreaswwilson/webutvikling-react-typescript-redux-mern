import { Router, Response, Request } from 'express';
// import Movie from '../../models/Movie';
import { DB } from '../../database';
const router = Router();

/**
 * @route   GET api/movies
 * @desc    Get all movies
 * @access  Public TODO - include auth
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const movies = await DB.Models.Movie.find();
    if (!movies) throw Error('No items');

    res.status(200).json(movies);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

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

// // router.delete('/:id', async (req: Request, res: Response) => {
// //   try {
// //     const movie = await Movie.findById(req.params.id);
// //     if (!movie) throw Error('No item found');

// //     const removed = await movie.remove();
// //     if (!removed)
// //       throw Error('Something went wrong while trying to delete the item');

// //     res.status(200).json({ success: true });
// //   } catch (e) {
// //     res.status(400).json({ msg: e.message, success: false });
// //   }
// // });

// /**
//  * @route PUT api/movie/:id
//  * @desc Update a movie
//  * @access Public
//  */
// router.get('/:id', async (req: Request, res: Response) => {
//   Movie.findById(req.params.id, (error: any, result: ana) => {
//     if (error) {
//       res.send(error);
//     } else {
//       res.send(result);
//     }
//   });
// });

// /**
//  * @route PUT api/movie/:id
//  * @desc Update a movie
//  * @access Public
//  */
// router.put('/:id', async (req: Request, res: Response) => {
//   Movie.findByIdAndUpdate(req.params.id, req.body, (error, result) => {
//     if (error) {
//       res.send(error);
//     } else {
//       res.send(result);
//     }
//   });
// });

export default router;
