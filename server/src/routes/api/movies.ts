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
    const movie = await DB.Models.Movie.find({ _id: req.params.id });
    if (!movie) throw Error('No record found');
    res.status(200).json({ totalCount: 1, data: movie });
  } catch (error) {
    res.status(400).json({ id: req.params.id, msg: error.message });
  }
});

/**
 * @route   GET api/movies
 * @desc    Get a page of movies based on search criterias,
 *          filter on category and/or sorted by year
 * @access  Public
 */
Router.instance.get('/', async (req: Request, res: Response) => {
  try {
    // Setup query for filtering data from database
    const query: { Title?: RegExp; Year?: RegExp; Genre?: RegExp } = {};

    if (req.query.title) {
      query['Title'] = new RegExp(req.query.title as string, 'i');
    }
    if (req.query.year) {
      query['Year'] = new RegExp(req.query.year as string, 'i');
    }
    let sort = {};
    if (req.query.sortByYear) {
      // Oldest year first
      if (req.query.sortByYear === 'ascending') {
        sort = { Year: 1 };
      }
      if (req.query.sortByYear === 'descending') {
        sort = { Year: -1 };
      }
    }

    // Create regex for genre. Using lookahead assertion
    // to match all genres in any order.
    if (req.query.genre) {
      let re = '';
      let genres = req.query.genre as string[];
      genres.forEach((genre: string) => {
        re += '(?=.*' + genre + ')';
      });

      query['Genre'] = new RegExp(re, 'i');
    }
    // Get total count of all the querys we have done
    const totalCount = await DB.Models.Movie.find(query)
      .countDocuments()
      .exec();
    // Pagination
    let page = 1;
    if (req.query.page && typeof req.query.page === 'string') {
      page = parseInt(req.query.page);
      page = Math.max(1, page);
    }
    let limit = 4;
    if (req.query.limit && typeof req.query.limit === 'string') {
      limit = parseInt(req.query.limit);
    }
    const startIndex = Math.max((page - 1) * limit, 0);

    const movies = await DB.Models.Movie.find(query)
      .limit(limit)
      .skip(startIndex)
      .sort(sort)
      .exec();

    if (!movies) throw Error('No items');

    res.status(200).json({ totalCount: totalCount, data: movies });
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
