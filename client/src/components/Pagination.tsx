import React from 'react';
import { MovieState, updateQuery } from '../actions';
import './pagination.css';
interface Props {
  moviesPerPage: number;
  totalMovies: number;
  updateQuery: typeof updateQuery;
  movieState: MovieState;
}

export const Pagination: React.FC<Props> = ({
  moviesPerPage,
  totalMovies,
  updateQuery,
  movieState,
}): JSX.Element => {
  //functionanlity for switching pages front-end
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
    pageNumbers.push(i);
  }
  let currentPage = movieState.query.page || 1;
  return (
    //simple JS for displaying page-links
    <nav>
      <div className='pageDiv'>
        <ul className='pagination'>
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={
                number === currentPage ? 'page-item active' : 'page-item'
              }
            >
              <a
                onClick={() => updateQuery({ page: number })}
                className='page-link'
              >
                {number}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
