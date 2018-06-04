import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Pagination = props => {
  let prevLink = null;
  let nextLink = null;
  const { page, pages, count } = props;
  if (page > 1) {
    prevLink = <Link to={`/timelog/${page - 1}`}>Prev</Link>;
  }
  if (page < pages) {
    nextLink = <Link to={`/timelog/${parseFloat(page) + 1}`}>Next</Link>;
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

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
};

export default Pagination;
