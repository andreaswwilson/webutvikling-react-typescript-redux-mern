import { Response, Request } from 'express';
import { DB } from '../../database';
import { Router } from '../Router';

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

Router.instance.get('/page/:page', async (req: Request, res: Response) => {
  try {
    const movies = await DB.Models.Movie.find();
    const page = parseInt(req.params.page);
    const perPage = 4;
    const skipped = (page - 1) * perPage;
    if (!movies) throw Error('No record found');
    const paginatedMovies = movies.slice(skipped, skipped + perPage);
    res.status(200).json(paginatedMovies);
  } catch (error) {
    res.status(400).json({ id: req.params.id, msg: error.message });
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

/**
 * @route   GET api/movies
 * @desc    Get all movies
 * @access  Public
 */
Router.instance.get('/', async (req: Request, res: Response) => {
  try {
    let { title, genre, year } = req.query;
    if (typeof title !== 'string') {
      title = '';
    }
    let query: any = {};
    title && (query.Title = title);
    genre && (query.Genre = genre);
    year && (query.Year = year);
    console.log(query);
    const movies = await DB.Models.Movie.find(query);

    if (!movies) throw Error('No items');

    res.status(200).json(movies);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route Put api/movies/id/:id
 * @desc Update movie
 * @access Public
 */
Router.instance.put('/:id', async (req: Request, res: Response) => {
  try {
    // Create new Movie object
    const updatedMovie = new DB.Models.Movie(req.body);
    const movie = await DB.Models.Movie.replaceOne(
      { _id: req.params.id },
      updatedMovie,
    );

    if (movie) {
      res.status(200).json({ success: true });
    }
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

export default Router.instance;
