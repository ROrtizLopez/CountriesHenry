/* Style */
import style from './Filter.module.css'
import { useState } from 'react';

const Filter = ({ onFilterChange, onResetResults }) => {
  const [sortName, setSortName] = useState('');
  const [sortPop, setSortPop] = useState('');
  const [filterContinent, setFilterContinent] = useState('');
  const [filterActivity, setFilterActivity] = useState('');

  const handleFilterChange = () => {
    onFilterChange({ sortName, sortPop, filterContinent, filterActivity }); // Home -> handleFilterChange -> applyFilters(reducer)
  };

  const handleResetCountries = () => { // Home -> handleResetCountries -> resetFilters(reducer)
    onResetResults();
    setSortName('');
    setSortPop('');
    setFilterContinent('');
    setFilterActivity('');
  };

  return (
    <div className={style.filterContainer}>
      <h2 className={style.title} > Filters & Order </h2>
      <div className={style.sortContainer}>
        <label className={style.label} htmlFor='sortName'> Sort by name: </label>
        <select
          className={style.sortSelect}
          name='sortName'
          id='sortName'
          value={sortName}
          onChange={(event) => setSortName(event.target.value)}
        >
          <option value=''> Please choose an option </option>
          <option value='AZ'> A-Z </option>
          <option value='ZA'> Z-A </option>
        </select>

        <label className={style.label} htmlFor='sortPop'> Sort by population: </label>
        <select
          className={style.sortSelect}
          name='sortPop'
          id='sortPop'
          value={sortPop}
          onChange={(event) => setSortPop(event.target.value)}
        >
          <option value=''> Please choose an option </option>
          <option value='A'> Ascending </option>
          <option value='D'> Descending </option>
        </select>
      </div>

      <div className={style.filtersContainer}>
        <label className={style.label}> Filter by continent: </label>
        <select
          className={style.filterSelect}
          name='filterContinent'
          id='filterContinent'
          value={filterContinent}
          onChange={(event) => setFilterContinent(event.target.value)}
        >
          <option value=''> Please choose a continent </option>
          <option value='Europe'> Europe </option>
          <option value='Asia'> Asia </option>
          <option value='Africa'> Africa </option>
          <option value='North America'> North America </option>
          <option value='South America '> South America </option>
          <option value='Antarctica'> Antarctica </option>
        </select>

        <label className={style.label}> Filter by tourist activity: </label>
        <select
          className={style.filterSelect}
          name='filterActivity'
          id='filterActivity'
          value={filterActivity}
          onChange={(event) => setFilterActivity(event.target.value)}
        >
          <option value=''> Choose a name for your activity </option>
          <option value='Hiking'> Hiking </option>
          <option value='Camping'> Camping </option>
          <option value='Safari'> Safari </option>
          <option value='Swimming'> Swimming </option>
          <option value='Shopping'> Shopping </option>
          <option value='Skiing'> Skiing </option>
        </select>
      </div>

      <div className={style.buttonContainer} >
        <button className={style.button} onClick={handleFilterChange}> Apply </button>

        <button className={style.button} onClick={handleResetCountries}> Clear filters </button>
      </div>
      

    </div>
  );
};

export default Filter;
