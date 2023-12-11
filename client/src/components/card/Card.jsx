import style from './Card.module.css'

import { Link } from 'react-router-dom';

const Card = ({ country }) => {
    const {name, continent, flagImage, id } = country;

    return (
        <div className={style.card}>
            <Link to={`/country/${id}`} >
                <img className={style.flag} src={flagImage} alt={name}  />
            </Link>
            <h3 className={style.countryName}> {name} </h3>
            <p className={style.paragp}> Continent: {continent} </p>
        </div>
    )
};

export default Card;