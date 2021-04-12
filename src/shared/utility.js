export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const checkValidity = ( value, rules ) => {

    let isValid = true;
  
    if ( !rules ) {
        return true;
    }


    if ( rules.required ) {
        isValid = value.trim() !== '' && isValid;
    }

    if ( rules.isNumeric ) {
        // const pattern = /^\d+$/;

        const pattern = /^\d{0,15}(\.\d{1,5})?$/;
        isValid = pattern.test( value ) && isValid;
    }




    return isValid;
}