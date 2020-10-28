import React from 'react';

interface Props {
    moviesPerPage : number;
    totalMovies: number;
    paginate: any;
}

export const Pagination: React.FC<Props> = ({
    moviesPerPage,
    totalMovies,
    paginate,
}): JSX.Element => {
    //functionanlity for switching pages front-end
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        //simple JS for displaying page-links
        <nav>
            <div className="pageDiv">
                <ul className="pagination">
                    {pageNumbers.map(number => (
                        <li key={number} className="page-item">
                            <a onClick={() => paginate(number)} className="page-link">
                                {number}
                            </a>
                        </li>
                    ))} 
                </ul>
            </div>
        </nav>
    )
}

