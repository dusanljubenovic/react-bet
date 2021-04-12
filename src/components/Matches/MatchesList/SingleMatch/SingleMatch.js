import React,  { useState } from 'react';

import classes from './SingleMatch.module.css';

import it from '../../../../assets/images/it.png';
import es from '../../../../assets/images/es.png';
import en from '../../../../assets/images/en.png';
import ch from '../../../../assets/images/champs.png';

import './SingleMatch.css';

import { CSSTransition } from 'react-transition-group';

import BetOdds from './BetOdds/BetOdds';

const SingleMatch = (props) => {

    const animationTiming = {
        enter:200,
        exit:400
     };

    const flagLeague=props.flag;

    const [activToggle, setActivToggle] = useState(props.singleMatch['activ']);

    // const [currentTeams, setCurrentTeams] = useState();

    const oddsHandler = () =>{

        props.singleMatch['activ']=!props.singleMatch['activ'];

        setActivToggle(props.singleMatch['activ']);

    }
 

    const curHandler = (ID, current, tempCurrentId, selectIndex, type, newOdds) =>{

        return props.currentMatches(ID, current, tempCurrentId, selectIndex, type, newOdds);

    }

    let imgSrc=null;

    switch (flagLeague){
     
       case ('champsleague'):  
          imgSrc=ch;
          break;

       case ('laleague'):  
          imgSrc=es;
          break;
          
       case ('premier'):  
          imgSrc=en;
          break;
          
       case ('calcio'):  
          imgSrc=it;
          break;

        default:  
           imgSrc=it;
    }

   


  return (

      
     
          <div className={classes.Matches} key={props.singleMatch['id']} >
           
               <div className={classes.MatchesHolder}>
                    <div className={classes.MatchesLeft}>
                      <div className={classes.MatchesFlag}>
                       <img src={imgSrc} alt="Flag" />
                      </div>
                      <div className={classes.MatchesGame}>
                         {props.singleMatch['teams'][0] + ' - ' + props.singleMatch['teams'][1]}
                       </div>
                    </div>
                    <div className={classes.MatchesOdds}>
                           <strong>Odds</strong><span onClick={oddsHandler}>{(activToggle)? '-' : '+' }</span>
                    </div> 
               </div>

               <CSSTransition 
               mountOnEnter
               unmountOnExit
               in={activToggle}
              timeout={animationTiming}
              classNames={{
                  enter:'',
                  enterActive:'ModalOpen',
                  exit:'',
                  exitActive:'ModalClosed'
              }}
              >
         
                   
                   <div className="Modal">
                         <BetOdds show={activToggle}  currentMatch={props.singleMatch} onSelectSites={curHandler}  flag={flagLeague} />
                   </div>

               </CSSTransition>
            </div>

     

  );
}

export default SingleMatch;