import React from 'react';

import { useSelector } from 'react-redux';

import Spinner from '../../UI/Spinner/Spinner';

import SingleMatch from './SingleMatch/SingleMatch.js';

import classes from './MatchesList.module.css';


const MatchesList = (props) => {

  const matchesTicket= props.currentMatches;

  const flagLeague=props.flag;


  const loading = useSelector(state => {
    return state.loading;
  });

  const onCurrentTeams= (ID, current, tempCurrentId, selectIndex, type, newOdds) =>{

    return props.currentTicket(ID, current, tempCurrentId, selectIndex, type, newOdds);

  }


     let listMatches=null;
     
     if (matchesTicket!==null){
     
        listMatches = matchesTicket.map( match => {
           

             return (
                <SingleMatch singleMatch={match} key={match['id']}  currentMatches={onCurrentTeams} flag={flagLeague} />
            );

         } );

    }

      if ( loading ) {
            listMatches = <Spinner />
        }

       if(listMatches.length===0){
          listMatches=<div className={classes.EmptyList}>Choose a league first!</div>
       }
      

  return (


      <div className={classes.MatchesHolder}>
        <h2>Matches:</h2>
        <div>{listMatches}</div>
      </div>

  );
}

export default MatchesList;