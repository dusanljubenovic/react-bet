import React, { useState } from 'react';

import classes from './FilterForm.module.css';
import Input from '../../UI/Input/Input';
import { updateObject } from '../../../shared/utility';


const FilterForm = React.memo(props => {



      const [ filterForm, setFilterForm] = useState({
       
            league: {
              elementType: 'select',
              elementConfig: {
                  options: [
                      {value: 'champsleague', displayValue: 'Champions League'},
                      {value: 'laleague', displayValue: 'LaLiga'},
                      {value: 'calcio', displayValue: 'Serie A'},
                      {value: 'premier', displayValue: 'Premier League'},
                  ]
              },
              value: 'champsleague',
          }
        });


        const inputChangedHandler = (event, inputIdentifier) => {
        
          const updatedFormElement = updateObject(filterForm[inputIdentifier], {
              value: event.target.value
          });
          const updatedFilterForm = updateObject(filterForm, {
              [inputIdentifier]: updatedFormElement
          });
          

          setFilterForm(updatedFilterForm);
       
  
        }

        const filterHandler = ( event ) => {

          event.preventDefault();
    
          const formData = {};

          for (let formElementIdentifier in filterForm) {
              formData[formElementIdentifier] = filterForm[formElementIdentifier].value;
          }
  
          return props.chooseLeague(formData['league']);

      }

        const formElementsArray = [];

        for (let key in filterForm) {
            formElementsArray.push({
                id: key,
                config: filterForm[key]
            });
        }

        let form = (
            <form className={classes.Form} onSubmit={filterHandler} >

                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => inputChangedHandler(event, formElement.id)} />
                ))}

                <div className={classes.ButtonApplyFilter}><button>ApplyFilter</button></div>

            </form>
        );

  return (
            <React.Fragment>
         
                   {form}
             
            </React.Fragment>
  );
});

export default FilterForm;
