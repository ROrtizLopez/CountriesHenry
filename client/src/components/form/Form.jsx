import style from './Form.module.css';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getCountries } from '../../redux/actions';
import validate from './validate';

const Form = () => {

    const countries = useSelector((state) => state.allCountries);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const orderedCountries = countries.sort((a, b) => a.name.localeCompare(b.name));

    const [ errors, setErrors ] = useState({}); 
    const [ formData, setFormData ] = useState({  //Estado local que maneja la info del form.
        name: '',
        difficulty: 0,
        duration: 0,
        season: '',
        countries:[]
    });

    useEffect ( () => {
        dispatch(getCountries()); // dispatch del action que trae todos los paises cuando se monta el componente.
    return ( 
        () => clearForm() // se limpian los campos del form cuando se desmonta el componente.
    )}, [dispatch]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleCountryChange = (event) => {
        const countriesSelected = event.target.value;
        const newCountries = formData.countries;
    
        const isAlreadySelected = newCountries.includes(countriesSelected); // Verifica si el país ya está seleccionado. true -> seleccionado / false -> no  seleccionado.
    
        if (newCountries.length < 3 && !isAlreadySelected) {
            // Agrega el país si está seleccionado si -> 1) no son 3 países seleccionados 2) país que aún no fue seleccionado.

            setFormData((prevFormData) => ({
                ...prevFormData,
                countries: [...prevFormData.countries, countriesSelected]
            }));
        } else if (isAlreadySelected) {
            // elimina el país del array countries si se deselecciona.
            setFormData((prevFormData) => ({
                ...prevFormData,
                countries: prevFormData.countries.filter((id) => id !== countriesSelected) // 
            }));
        }
    };
    
    useEffect(() => {
            setErrors(validate(formData));
    }, [formData]);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
            try {
                const response = await axios.post('http://localhost:3001/activities', {
                    name: formData.name,
                    difficulty: formData.difficulty,
                    duration: formData.duration,
                    season: formData.season,
                    countryIds: formData.countries,
                });
                const activityCreated = response.data

                alert('Activity created');
                clearForm();
                navigate('/home'); // redericción a Home.
                
            } catch (error) {
                alert('Activity not created');
            }
    };

    const clearForm = () => {
        setFormData({
            name: '',
            difficulty: 0,
            duration: 0,
            season: '',
            countries:[]
        });
    };

    return (
        <div className={style.formContainer}>
            <h2 className= {style.title}>Create your tourist activity</h2>
            <form onSubmit={handleSubmit} className={style.form}>
                <div className={style.inputContainer}>
                    <div className={style.nameCont}>
                        <label  htmlFor='name' className={style.label} > Name : </label>
                        <select
                        name='name'
                        id='name'
                        className={style.inputs}
                        value={formData.name}
                        onChange={handleInputChange}
                        >
                            <option value=''> Choose a name for your activity </option>
                            <option value='Hiking'> Hiking </option>
                            <option value='Camping'> Camping </option>
                            <option value='Safari'> Safari </option>
                            <option value='Swimming'> Swimming </option>
                            <option value='Shopping'> Shopping </option>
                            <option value='Skiing'> Skiing </option>
                        </select>
                        {errors.name && <span className={style.span}>{errors.name}</span>}

                    </div>

                    <div className={style.difficultyCont}>
                        <label htmlFor='difficulty' className={style.label}> Difficulty level (1 low - 5 high) : </label>
                        <input type='number'
                        name='difficulty'
                        id='difficulty'
                        className={style.inputsNumb}
                        value={ formData.difficulty }
                        onChange={handleInputChange}
                        min='1' max='5'
                        />
                        {errors.difficulty && <span className={style.span}>{errors.difficulty}</span>}
                    </div>

                    <div className={style.durationCont}>
                        <label htmlFor='duration' className={style.label}> Duration (in hours) : </label>
                        <input type='number'
                        name='duration'
                        id='duration'
                        className={style.inputsNumb}
                        value={ formData.duration }
                        min='1' max='24'
                        onChange={handleInputChange}
                        />
                        {errors.duration && <span className={style.span}>{errors.duration}</span>}
                    </div>

                    <div className={style.seasonCont}>
                        <label htmlFor='season' className={style.label} > Season : </label>
                        <select name='season' 
                        id='season' 
                        className={style.inputs}
                        value={formData.season}  
                        onChange={handleInputChange} 
                        >
                            <option value=''> Choose your favorite season </option>
                            <option value='Summer'> Summer </option>
                            <option value='Fall'> Fall </option>
                            <option value='Winter'>Winter</option>
                            <option value='Spring'>Spring</option>
                        </select>
                        {errors.season && <span className={style.span}>{errors.season}</span>}
                    </div>
                </div>

                <div className={style.countriesContainer}>
                    <label className={style.label}htmlFor="countries"> Countries: choose from 1 to 3 countries</label>
                    <select
                        id="countries"
                        name="countries"
                        multiple
                        className={style.selectCountries}
                        value={formData.countries}
                        onChange={handleCountryChange}
                    >
                        {orderedCountries?.map((country) => (
                            <option key={country.id} value={country.id}>
                                {country.name}
                            </option>
                        ))}
                    </select>

                </div>

                <div className={style.spanCountries}>
                    {errors.countries && <span>{errors.countries}</span>}
                </div>
                
                <div className={style.btnDiv}>
                    <button type="submit"  disabled={Object.keys(errors).length > 0} className={style.btnCreate}>
                        Create Activity</button> 
                </div>
            </form>
        </div>
    )
};

export default Form;