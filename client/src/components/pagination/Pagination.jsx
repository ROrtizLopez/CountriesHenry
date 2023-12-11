/*
En Array.from, la función de mapeo toma 2 parámetros: el valor del elemento (en este caso no se utiliza y se representa con _) y el índice del elemento en el array -> este ultimo es el que nos interesa. 
*/

import style from './Pagination.module.css';

    const Pagination = ({ currentPage, totalPages, onNextPage, onPrevPage, onPageClick }) => {

        const pageNumb = Array.from({ length: totalPages }, (_, index) => index + 1); // Array.from -> array de números de página. totalPages = cantidad total de páginas.

        return (
            <div className={style.pagesContainer}>
                <div className={style.btns}>
                { currentPage !== 1 && 
                        <button className={style.btnPageChange} onClick={onPrevPage} disabled={currentPage ===1}>
                            Prev
                        </button>}
                </div>

                <div>
                    {
                        pageNumb.map((page) => (
                            <button key={page} 
                            onClick={() => onPageClick(page)} className={style.btnPage} 
                            disabled={currentPage === page}
                            >
                                {page}
                            </button>
                        ))
                    }
                </div>

                <div className={style.btns}>
                    { currentPage !== totalPages &&            
                        <button className={style.btnPageChange} onClick={onNextPage} disabled={currentPage === totalPages}>
                            Next
                        </button>
                    }
                </div>
                <div className= {style.spanPages}> 
                    <span >{ `${currentPage} / ${totalPages}`  }</span>
                </div>
            </div>
        )

    };

export default Pagination;

