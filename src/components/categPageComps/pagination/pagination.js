import React from 'react';

const Pagination = ({productsPerPage, totalProducts, paginate}) => {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i)
    }

    const windowTop = () => {
        // return window.scrollTo(0, 0);
    };

    return (
        <div className='pagination'>
            {
                pageNumbers.map((i) => (
                    <a href={`#page=${i}`} key={i} className='page-link'
                       onClick={() => {
                           paginate(i);
                           windowTop();
                       }}>{i}</a>
                ))
            }
        </div>
    );
};

export default Pagination;