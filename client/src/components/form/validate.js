
const validate = (formData) => {

    let errors = {};

    if (!formData.name){
        errors.name = 'Name is required'
    }

    if (!formData.difficulty) {
        errors.difficulty = 'Difficulty is required'
    } else if (formData.difficulty <= 0 || formData.difficulty > 5) {
        errors.difficulty = 'Must must be between 1 and 5'
    };

    if (!formData.duration) {
        errors.duration = 'Duration is required'
    } else if (formData.duration <= 0 || formData.duration > 24) {
        errors.duration = 'Must be between 1 and 24 hours'
    };

    if (!formData.season || formData.season === '') {
        errors.season = 'Season is required'
    };

    if (!formData.countries || formData.countries.length === 0) {
        errors.countries = 'Choose at least one country'
    };

    console.log('errors:', errors);
    console.log('formData.countries en validate:', formData.countries);

    return errors;

};

export default validate;
