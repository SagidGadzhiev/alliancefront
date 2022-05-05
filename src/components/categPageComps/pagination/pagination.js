import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getCurrentPage, setEndPage, setStartPage } from '../../../redux/reducers/storeItems';

function Pagination({ productsPerPage, totalProducts, paginate }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const startPage = useSelector((s) => s.storeItems.startPage);
  const endPage = useSelector((s) => s.storeItems.endPage);
  const currentPage = useSelector((s) => s.storeItems.currentPageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  const windowTop = () => window.scrollTo(0, 0);

  const lastPageHandler = (i) => {
    dispatch(getCurrentPage(i));
    paginate(i);
    windowTop();
  };
  const pageHandler = (i) => {
    dispatch(getCurrentPage(i));
    paginate(i);
    windowTop();
    if (i === endPage) {
      dispatch(setStartPage(i));
      return dispatch(setEndPage(endPage + 5));
    }
  };

  const backPageHandler = () => {
    if (currentPage === startPage) {
      dispatch(setStartPage(currentPage - 5));
      dispatch(setEndPage(currentPage));
    }
    dispatch(getCurrentPage(currentPage - 1));
    return history.push(`#page=${currentPage - 1}`);
  };
  const nextPageHandler = () => {
    if (currentPage === endPage) {
      dispatch(setStartPage(currentPage));
      dispatch(setEndPage(currentPage + 5));
    }
    dispatch(getCurrentPage(currentPage + 1));
    return history.push(`#page=${currentPage + 1}`);
  };

  return (
    <div className='pagination'>

      <button
        disabled={currentPage === 1}
        type='button'
        onClick={backPageHandler}
        className='pagination__navBtn'
      >
        Назад
      </button>

      {pageNumbers.slice(startPage, endPage).map((i) => (
        <a
          key={i}
          className='pagination__item'
          href={`#page=${i}`}
          onClick={() => pageHandler(i)}
        >
          {i}
        </a>
      ))}
      <span className='pagination__dots'>...</span>
      <a
        className='pagination__item'
        href={`#page=${pageNumbers.length}`}
        onClick={() => lastPageHandler(pageNumbers.length)}
      >
        {pageNumbers[pageNumbers.length - 1]}
      </a>

      <button
        disabled={currentPage === pageNumbers.length}
        type='button'
        onClick={nextPageHandler}
        className='pagination__navBtn'
      >
        Вперед
      </button>
    </div>
  );
}

export default Pagination;
