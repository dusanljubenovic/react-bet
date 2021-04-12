import * as actionTypes from '../actions/actionTypes';


const initialState = {
    matches:[],
    chooseTypeArray:[],
    loading:false,
    error:false
};



const reducer = ( state = initialState, action ) => {

    switch ( action.type ) {

        case actionTypes.CHANGE_ARRAY:    
        return{
            ...state,
            chooseTypeArray: action.chooseTypeArray
        }; 
      
        case actionTypes.REMOVE_ITEM_FROM_ARRAY:    
        return{
            ...state,
            chooseTypeArray: action.chooseTypeArray
        }; 


        case actionTypes.START_LOADING_MATCHES:    
        return{
            ...state,
            loading:true
        }; 
      
        case actionTypes.SUCCESS_LOADED_MATCHES:

               const matchesArray = [];

          

               action.matches['matches'].map( (match) => {

         
                   matchesArray.push({                           
                      id: match['id'],
                      teams: match['teams'], 
                      sites:match['sites'],
                      activ:false
                   });

                   return matchesArray;
                   
                 });

                 const newArray=matchesArray;

          

                 let tempArray=[];

                 action.matches['matches'].map( currentMatch =>{

                       let ID =  currentMatch['id'];

                        
                        currentMatch['sites'].map( (site, index) => {

                            tempArray.push({                           
                              id: ID+index+'0',
                              activ:false
                             },
                             {                           
                              id: ID+index+'1',
                              activ:false
                             },
                             {                           
                              id: ID+index+'2',
                              activ:false
                             }
                            );
               
                            return tempArray;
                             
                            }) 

                      
                            return tempArray;  

                 });
                        
             
              const newLeague=action.matches['league'];
          
              const objectMatch={newArray, newLeague};
              

               return{
                    ...state,
                    matches:[...state.matches, objectMatch],
                    chooseTypeArray:[...state.chooseTypeArray.concat(tempArray)],
                    loading:false,
                    error:false
               };
        
        case actionTypes.FAILED_LOADED_MATCHES:    
               return{
                   ...state,
                   loading:false,
                   error:true
               };       

        default:
            return state;
    }

    
};

export default reducer;