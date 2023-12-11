import style from './LandingPage.module.css';
import { Link } from 'react-router-dom';

const LandingPage = () => {

    return (
        <div className={style.landingPage} >
            <h1 className={style.title} > Countries </h1>
            <h2 className={style.subtitle}>Are you ready to discover the world?</h2>

            <Link to='/home'>
                <button className={style.button}>Discover</button>
            </Link>
        </div>
    )
};

export default LandingPage;