import style from './Detail.module.css';
import actImage from '../../assets/ActivitiesDefault.jpg'

import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const URL_BASE = 'http://localhost:3001/countries'

const Detail = () => {
    const { id } = useParams();
    console.log(id);

    const [country, setCountry] = useState({}); // Estado local -> Country

    useEffect(() => {
        axios.get(`${URL_BASE}/${id}`)
        .then(({ data }) => {
            if(data.name) {
                setCountry(data)
            } else {
                throw new Error(`Country with ID ${id} not found`)
            }
        })
        .catch ((error) => {
            throw new Error(error.message);
        })

        return setCountry({});  // se limpia el estado cuando se desmonta el componente.
        
    }, [id]);

    return (
        <div className={style.detailContainer} >
            <div className={style.countryDetail} >
                <h2 className={style.title} >Discover a little more about { country?.name }</h2>
                <img className={style.flag} src={country?.flagImage} alt={country?.name} />
                <h4>Country ID: {country?.id} </h4>
                <h4>Continent: {country?.continent} </h4>
                {!country?.subregion ? null : <h4> Subregion: {country.subregion}</h4>}
                {!country?.capital ? null : <h4> Capital: {country.capital}</h4>}
                <h4>Population: {country?.population} </h4>
            </div>

            <div>
                <h2 className={style.title}> Tourist activities in {country?.name} </h2>

                <div className={style.activity}>
                    { country?.Activities && country.Activities.length > 0 ?
                    country.Activities.map(activity => {
                        return (
                            <div key={activity.id}>
                                <img className={style.imgAct} src={actImage} alt='Activity Collage'
                                />
                                <h3> Activity Name: { activity.name } </h3>
                                <p className={style.act} > Level of Difficulty: {activity.difficulty} </p>
                                <p className={style.act}> Duration in hours: {activity.duration} </p>
                                <p className={style.act}> Best season to enjoy it: {activity.season}</p>
                            </div>
                        )
                    }) : <p className={style.notAct}> {country?.name} doesn't have any tourist activities created yet. </p>
                    }
                </div>

            </div>
        </div>
    )
};


export default Detail;