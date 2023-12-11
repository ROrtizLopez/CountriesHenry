/* Style */
import style from './Home.module.css'

/* Hooks */
import { useEffect, useState } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

/* Components to render */
import Cards from '../cards/Cards';
import Filter from '../filter/Filter';
import Pagination from '../pagination/Pagination';

/* Redux actions */
import { getCountries, applyFilters, resetFilters } from '../../redux/actions';

const Home = () => {

    const dispatch = useDispatch();
    const allCountries = useSelector((state) => state.allCountries); // Estado Global de todos los paises. 
    const byName = useSelector((state) => state.byName); // Estado Global de los paises buscados por nombre. 
    const [ currentPage, setCurrentPage] = useState(1); // Estado Local página.
    
    useEffect(() => {
        dispatch(getCountries());
    }, [dispatch]);

    const handleFilterChange =(filters) => {  // fn que hace dispatch del action applyFilters -> click en Apply
        dispatch(applyFilters(filters));
        setCurrentPage(1);
    };

    const handleResetCountries = () => {
        dispatch(resetFilters());
        dispatch(getCountries());
        setCurrentPage(1);
    };

    const countriesDisplay = byName.length > 0 ? byName : allCountries;
    const pageSize = 10;
    const totalPages = Math.ceil(countriesDisplay.length / pageSize); // countriesDisplay = total de elementos a mostrar / pageSize = cant de elementos por pag. 

    const startIndex = (currentPage - 1) * pageSize; 
    const endIndex = startIndex + pageSize; 
    const countriesToShow = countriesDisplay.slice(startIndex, endIndex); // paises que se mostrarán en currentPage.

    const onNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1) // setCurrentPage con CB -> asegura que el nuevo valor de currentPage se base en el valor previo (prevPage), para evitar problemas con actualizaciones de estado asíncronas.
    };

    const onPrevPage = () => {
        setCurrentPage((prevPage) => prevPage -1)
    };

    const handlePageClick = (page) => { // page -> num de la página a la que se debe cambiar.
        setCurrentPage(page);
      };

    return (
        <div className= {style.homeContainer}>
            <div>
                {  byName.length === 0 ? (
                <Filter onFilterChange={handleFilterChange} onResetResults={handleResetCountries} />) : null }   
            </div>

            <div>
                <Cards countries = {countriesToShow} />
            </div>

            <div>            
                <Pagination currentPage={currentPage}  totalPages={totalPages} 
                onNextPage={onNextPage} onPrevPage={onPrevPage}  onPageClick={handlePageClick}
                />
            </div>
        </div>
    )
};

export default Home;

