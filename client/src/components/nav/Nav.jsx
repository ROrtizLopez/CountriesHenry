/* Style */
import style from './Nav.module.css';
import SearchBar from '../searchBar/SearchBar'

import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearSeachResult, getCountries } from "../../redux/actions";


const Nav = () => {

    const { pathname } = useLocation();

    const dispatch = useDispatch();

    const handleHomeClick = () => {
        dispatch(clearSeachResult());
        dispatch(getCountries())
    };

    return (
        <nav className={style.navBar}>
            <Link to='/home'>
                <button
                className={style.button}
                onClick={handleHomeClick}
                > Home </button>
            </Link>

            { pathname !== '/activity' && 
            <Link to='/activity'> 
                <button className={style.button}> Create Tourist Activity </button>
            </Link>  }

            { pathname === '/home' ? <SearchBar /> : null }          
        </nav>
    )
};

export default Nav;