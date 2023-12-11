import style from './Cards.module.css';

import Card from '../card/Card';

const Cards = ({ countries }) => {
    return (
        <div className={style.cards}>
          {countries.map((country) => (
            <Card key={country.id} country={country} />
          ))}
        </div>
    );
  };
  
  export default Cards;