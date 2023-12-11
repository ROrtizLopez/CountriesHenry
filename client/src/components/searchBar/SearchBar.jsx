import style from './searchBar.module.css'

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCountryByName, clearSeachResult } from '../../redux/actions';

const SearchBar = () => {

    const dispatch = useDispatch();
    const [name, setName ] = useState('');

    const handleSearch = () => {
        if(name.trim() !== ''){
            dispatch(getCountryByName(name))
        }
        setName('');
    };

    const handleClearSearch = () => {
        setName('');
        dispatch(clearSeachResult());
    };


  return (
    <div className={style.searchBar}>
        <input className={style.input}
            type='text'
            placeholder='Search by name'
            value={name}
            onChange = { (event) => setName(event.target.value) } 
        />

        <button className={style.button} onClick={handleSearch}> Search </button>
        <button className={style.button} onClick={handleClearSearch} > All countries </button>

    </div>
  );
};

export default SearchBar;
