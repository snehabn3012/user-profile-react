import React from 'react';

 const FormErrors = ({formErrors}) => (
  <ul className='formErrors'>
    {formErrors && Object.keys(formErrors).map((fieldName, i) => {
      if(formErrors[fieldName].length > 0){
        return (
           <li key={i}>{formErrors[fieldName]}</li>
        )        
      } else {
        return '';
      }
    })}
  </ul>
 );

export default FormErrors;