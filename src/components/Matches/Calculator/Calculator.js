import React, { useState } from 'react';

import classes from './Calculator.module.css';
import { updateObject, checkValidity } from '../../../shared/utility';
import Input from '../../UI/Input/Input';

const Calculator = (props) => {

    const ticket = props.allPairs;
    const allMatches = props.matchesAll;

    const [ inputFields, setInputFields  ] = useState({
        stake: {
            elementType: 'input',
            elementConfig: {
                type: 'stake',
                placeholder: 'Enter Stake'
            },
            value: '',
            validation: {
                required: true,
                isNumeric: true
            },
            valid: false,
            touched: false
        }
        // odds_1: {
        //     elementType: 'input',
        //     elementConfig: {
        //         type: 'odds',
        //         placeholder: 'Enter Odds'
        //     },
        //     value: '',
        //     validation: {
        //         required: true,
        //         isNumeric: true
        //     },
        //     valid: false,
        //     touched: false
        // }
    });


    const [removeCount, setRemoveCount  ] = useState(0);

    const [numberObject, setNumberObject]=useState(1);

    const [total, setTotal]=useState(0);

    const inputChangedHandler = (event, inputIdentifier) => {
        
        const updatedFormElement = updateObject(inputFields[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, inputFields[inputIdentifier].validation),
            touched: true
        });
        const updatedFilterForm = updateObject(inputFields, {
            [inputIdentifier]: updatedFormElement
        });
        

        setInputFields(updatedFilterForm);
     

      }

      const filterHandler = ( event ) => {

        event.preventDefault();
  
        const formData = [];

        for (let formElementIdentifier in inputFields) {
            formData.push(inputFields[formElementIdentifier].value);
        }
  
        let valueTotal=1;

        formData.map(data => {

            return valueTotal=valueTotal*data;

        });
        valueTotal=valueTotal.toFixed(2);
        setTotal(valueTotal);

    }

    const addInput = () => {
        const numberObjectIncrease=numberObject+1+removeCount;

        setNumberObject(numberObjectIncrease);

        setRemoveCount(0);

        const prevValue=inputFields;

        const str1='odds_';

        const str2=numberObjectIncrease;

        const odds_var=str1.concat(str2);


        let newObject={...prevValue, 
            [odds_var]: {
                elementType: 'input',
                elementConfig: {
                    type: 'odds',
                    placeholder: 'Enter Odds'
                },
                value: '',
                validation: {
                    required: true,
                    isNumeric: true
                },
                valid: false,
                touched: false
            }
        };

        setInputFields(newObject);

      

    }

    const removeInput = (ID) => {

        const temoRemoveCount= removeCount+1;
       
        setRemoveCount(temoRemoveCount);

        const numberObjectDec=numberObject-1;

        setNumberObject(numberObjectDec);

        const tempObject = inputFields;

        delete tempObject[ID];

        setInputFields(tempObject);

    }

    const formElementsFirst = [];
    const formElementsSecond = [];

    let tempValidation=true;

    let tempVal=true;
    

    for (let key in inputFields) {

        if (key==='stake'){
            formElementsFirst.push({
                id: key,
                config: inputFields[key]
            });
        }else{
            formElementsSecond.push({
                id: key,
                config: inputFields[key]
            }); 
        }

        (inputFields[key]['valid']===inputFields[key]['touched']) ? tempVal=true : tempVal=false;

        tempValidation= tempValidation && tempVal;
      
     
    }


  
 

   const fillHandler = () =>{

        let numberObjectIncrease=numberObject;
     
        let newObject=null;

        let prevValue=inputFields;

        ticket.map(t=>{

            const currentMatchIndex = allMatches.findIndex(match => t['ID'] === match.id);
            
            numberObjectIncrease=numberObjectIncrease+1+removeCount;

            setRemoveCount(0);
        
            const str1='odds_';
        
            const str2=numberObjectIncrease;
        
            const odds_var=str1.concat(str2);
        
            newObject={...prevValue, 
                [odds_var]: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'odds',
                        placeholder: 'Enter Odds'
                    },
                    value: allMatches[currentMatchIndex]['sites'][t['selectIndex']]['odds']['h2h'][t['type']],
                    validation: {
                        required: true,
                        isNumeric: true
                    },
                    valid: false,
                    touched: false
                }
             };
        
             prevValue=newObject;

             return newObject;

        });


    
        setInputFields(newObject);
     
        setNumberObject(numberObjectIncrease);
   
   }

   



    let form = (
        <form className={classes.CalcualtorHolder} onSubmit={filterHandler} >

        <div className={classes.CalculatorTop}>

           <div className={classes.CalculatorLeft}>
            {formElementsFirst.map(formElementFirst => (
               <Input 
                key={formElementFirst.id}
                elementType={formElementFirst.config.elementType}
                elementConfig={formElementFirst.config.elementConfig}
                value={formElementFirst.config.value}
                invalid={!formElementFirst.config.valid}
                shouldValidate={formElementFirst.config.validation}
                touched={formElementFirst.config.touched}
                changed={(event) => inputChangedHandler(event, formElementFirst.id)} />
             ))}
            </div>

            <div className={classes.CalculatorRight}>
            {formElementsSecond.map(formElementSecond => (
               
             
                <div className={classes.RightHolder} key={formElementSecond.id}>
                <Input 
                    key={formElementSecond.id}
                    elementType={formElementSecond.config.elementType}
                    elementConfig={formElementSecond.config.elementConfig}
                    value={formElementSecond.config.value}
                    invalid={!formElementSecond.config.valid}
                    shouldValidate={formElementSecond.config.validation}
                    touched={formElementSecond.config.touched}
                    changed={(event) => inputChangedHandler(event, formElementSecond.id)} />
                  <strong onClick={()=>removeInput(formElementSecond.id)}>-</strong>
                  </div>
                


            ))}

            <span className={classes.AddInput} onClick={()=>addInput()}>+</span>
            </div>
        </div>
             <div className={classes.Total}>Total:{total}</div>
            <div className={classes.Calculate}><button disabled={!tempValidation} >Calculate</button></div>

        </form>
    );


  return (
      <div className={classes.Calculator}>
        <h2>Calcualtor:</h2>
        <div className={classes.CalculatorHeader}> Fill the calculator with odds from the <button onClick={()=>fillHandler()}>ticket</button> or you can do that manually.</div>
         {form}
      </div>

  );
}

export default Calculator;