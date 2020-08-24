import * as React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  page: number;
  pages: number;
  count: number;
}

const Pagination = (props: Props): JSX.Element => {
  let prevLink = null;
  let nextLink = null;
  const { page, pages, count } = props;
  if (page > 1) {
    prevLink = <Link to={`/timelog/${page - 1}`}>Prev</Link>;
  }
  if (page < pages) {
    nextLink = <Link to={`/timelog/${Number(page) + 1}`}>Next</Link>;
  }
  return (
    <div className="pagination">
      <span>{prevLink}</span>
      <span>
        Page {page} of {pages} — {count} total results
      </span>
      <span>{nextLink}</span>
    </div>
  );
};

export default Pagination;
