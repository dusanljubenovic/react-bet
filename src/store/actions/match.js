import * as actionTypes from './actionTypes';

import axios from "axios";

export const startLoadingMatches = () => {
    return{
         type:actionTypes.START_LOADING_MATCHES
    };
};


export const loadedMatches = (matches, league) => {
      return{
           type:actionTypes.SUCCESS_LOADED_MATCHES,
           matches:{matches,league}
      };
};


export const loadedMatchesFailed = () => {
    return{
         type:actionTypes.FAILED_LOADED_MATCHES
    };
};


export const changeArray = (selectOdd) => {
  return{
       type:actionTypes.CHANGE_ARRAY,
       chooseTypeArray:selectOdd
  };
};

export const removeItemFromArray = (selectOdd) => {
  return{
       type:actionTypes.REMOVE_ITEM_FROM_ARRAY,
       chooseTypeArray:selectOdd
  };
};


export const initLoadMatches = () => {


      const options = {
        method: 'GET',
        url: 'https://odds.p.rapidapi.com/v1/odds',
        params: {
          sport: 'soccer_epl',
          region: 'uk',
          mkt: 'h2h',
          dateFormat: 'iso',
          oddsFormat: 'decimal'
        },
        headers: {
          'x-rapidapi-key': '***********************************************',
          'x-rapidapi-host': 'odds.p.rapidapi.com'
        }
      };

      const options2 = {
        method: 'GET',
        url: 'https://odds.p.rapidapi.com/v1/odds',
        params: {
          sport: 'soccer_italy_serie_a',
          region: 'uk',
          mkt: 'h2h',
          dateFormat: 'iso',
          oddsFormat: 'decimal'
        },
        headers: {
          'x-rapidapi-key': '***********************************************',
             'x-rapidapi-host': 'odds.p.rapidapi.com'
        }
      };

      const options3 = {
        method: 'GET',
        url: 'https://odds.p.rapidapi.com/v1/odds',
        params: {
          sport: 'soccer_spain_la_liga',
          region: 'uk',
          mkt: 'h2h',
          dateFormat: 'iso',
          oddsFormat: 'decimal'
        },
        headers: {
          'x-rapidapi-key': '***********************************************',
            'x-rapidapi-host': 'odds.p.rapidapi.com'
        }
      };

    

      const options4 = {
        method: 'GET',
        url: 'https://odds.p.rapidapi.com/v1/odds',
        params: {
          sport: 'soccer_uefa_champs_league',
          region: 'uk',
          mkt: 'h2h',
          dateFormat: 'iso',
          oddsFormat: 'decimal'
        },
        headers: {
             'x-rapidapi-key': '***********************************************',
               'x-rapidapi-host': 'odds.p.rapidapi.com'
        }
      };
    
    return dispatch => {

        dispatch(startLoadingMatches());


        axios.request(options)
        .then( responseData => {

             dispatch(loadedMatches(responseData.data.data, 'premier'));
         
        } )
        .catch( error => {
         
            dispatch(loadedMatchesFailed());

        } );

        axios.request(options2)
        .then( responseData => {

             dispatch(loadedMatches(responseData.data.data, 'calcio'));
         
        } )
        .catch( error => {
         
            dispatch(loadedMatchesFailed());

        } );
            
        axios.request(options3)
        .then( responseData => {

             dispatch(loadedMatches(responseData.data.data, 'laleague'));
         
        } )
        .catch( error => {

            dispatch(loadedMatchesFailed());

        } );

        axios.request(options4)
        .then( responseData => {

             dispatch(loadedMatches(responseData.data.data, 'champsleague'));
         
        } )
        .catch( error => {
         
            dispatch(loadedMatchesFailed());

        } );

       

    };
};