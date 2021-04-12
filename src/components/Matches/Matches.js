import React,  {  useEffect, useState, useCallback } from 'react';

import {  useDispatch, useSelector } from 'react-redux';

import * as matchActions from '../../store/actions/index';

import FilterForm from './FilterForm/FilterForm';

import MatchesList from './MatchesList/MatchesList';

import Calculator from './Calculator/Calculator';

import classes from './Matches.module.css';

import it from '../../assets/images/it.png';
import es from '../../assets/images/es.png';
import en from '../../assets/images/en.png';
import ch from '../../assets/images/champs.png';


const Matches = (props) => {

  const dispatch = useDispatch();

   const chooseTypeArray = useSelector(state => {
    return state.chooseTypeArray;
   });
  

  const onInitLoadMatches = useCallback(
    () => dispatch(matchActions.initLoadMatches()),
    [dispatch]
  );

  const onRemoveItemFromArray = useCallback(
    (arrayAftertRemoveOdds) => dispatch(matchActions.removeItemFromArray(arrayAftertRemoveOdds)),
    [dispatch]
  );



let [selectLeague, setSelectLeague]=useState([ ]);

let [currentMatches, setCurrentMatches]=useState([]);

let [allMatches, setAllMatches]=useState([]);

let [ticket,setTicket]=useState([]);

let [flagLeague, setFlagLeague]=useState();

let [sortTicket,setSortTicket]=useState(false);

const matches = useSelector(state => {
  return state.matches;
});



  useEffect( () =>{

    onInitLoadMatches();

  }, [onInitLoadMatches]); 


useEffect( () =>{

  let takeValueArray=[];

  setAllMatches(()=>{

       matches.map(x =>(

             x['newArray'].map( ySingle => {

                  takeValueArray.push(ySingle);

                  return takeValueArray;

             })        

       ));

       return takeValueArray;

  });

}, [matches]); 





let ticketCurrent=null;


const onChooseLeague = (league) =>{

   setFlagLeague(league);
  
   const matchIndex = matches.findIndex(match => league === match.newLeague);

   setSelectLeague(matches[matchIndex]['newArray']);

}







let onCurrentTicket = useCallback((ID, current, tempCurrentId, selectIndex, type, activ) => {

      let ticketTemp=[];

      let matchesArray = currentMatches;

      let matchesArrayRemove;
    

      if (activ){


            matchesArray.push({                           
                  'ID': ID,
                  'current':current,
                  'tempCurrentId':tempCurrentId,
                  'selectIndex':selectIndex,
                  'type':type
                 });


            setCurrentMatches(matchesArray);
 
            if (currentMatches!==null) {
      
                currentMatches.map( x => {

                     ticketTemp.push({                           
                        'ID': x.ID,
                        'current':x.current,
                        'tempCurrentId':x.tempCurrentId,
                        'selectIndex':x.selectIndex,
                        'type':x.type
                      });

                      return ticketTemp;

                  });

               }
          

               setTicket(ticketTemp);

               let tempArrayIndex=[ID+selectIndex+0,ID+selectIndex+1,ID+selectIndex+2];

               let removeArrayIndex=tempArrayIndex.filter(o => o!== tempCurrentId );
     

               let tempArr= ticketTemp.filter(q => q.tempCurrentId !== removeArrayIndex[0]);  
               
               let tempArr2=tempArr.filter(q => q.tempCurrentId !== removeArrayIndex[1]);  
     
               setCurrentMatches(tempArr2);
               setTicket(tempArr2);


        }else{

             matchesArrayRemove=matchesArray.filter(y => y.tempCurrentId!== tempCurrentId );

             setCurrentMatches(matchesArrayRemove);

             if (currentMatches!==null) {

              ticketTemp=matchesArrayRemove;

              ticketTemp.filter(z => z.tempCurrentId!== tempCurrentId );

             }

            setTicket(ticketTemp);
        }

 

        
   

},[currentMatches]);


  const removeItemHandler = (ID, current, tempCurrentId, selectIndex, type) => {


        const arrayAftertRemoveOdds = chooseTypeArray.map( xSingle => {

                       if (xSingle['id']===tempCurrentId){

                          return ({...xSingle, activ: false }) 

                       }else{

                          return xSingle

                       }
             }
         )


          onRemoveItemFromArray(arrayAftertRemoveOdds);

          const arrayForTicket=ticket.filter( singleTicket => singleTicket.tempCurrentId!== tempCurrentId);

          setCurrentMatches(arrayForTicket);
          setTicket(arrayForTicket);

  } 


  const sortByOdds = () => {

    setSortTicket(!sortTicket);


    const sorted = ticket.sort((a, b) => {

      const currentMatchIndex_a = allMatches.findIndex(match => a['ID'] === match.id);

      const currentMatchIndex_b = allMatches.findIndex(match => b['ID'] === match.id);

      if(sortTicket){

        return  allMatches[currentMatchIndex_b]['sites'][b['selectIndex']]['odds']['h2h'][b['type']] -  allMatches[currentMatchIndex_a]['sites'][a['selectIndex']]['odds']['h2h'][a['type']]

      }else{

        return  allMatches[currentMatchIndex_a]['sites'][a['selectIndex']]['odds']['h2h'][a['type']] -  allMatches[currentMatchIndex_b]['sites'][b['selectIndex']]['odds']['h2h'][b['type']]

      }


    });
    
    setTicket(sorted);


  }


   const TicketMatches = () =>{

    ticketCurrent=ticket.map( x => {

        let type=null;

        switch (x['type']) {

            case 1 : type='2'; break;
            case 2 : type='X'; break;
            case 0 : type='1'; break;
            default :  type='No TYPE'; 

        }
        const chooseMatchIndex = chooseTypeArray.findIndex(chooseMatch => x['tempCurrentId'] === chooseMatch.id);

        let imgSrc=null;

        switch (chooseTypeArray[chooseMatchIndex]['flag']){
         
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
    



        const currentMatchIndex = allMatches.findIndex(match => x['ID'] === match.id);

        return (currentMatchIndex!==-1)?(<div key={x.tempCurrentId} className={classes.TicketSingleMatch}>
                        <div className={classes.TicketSingleLeft}>
                         <div className={classes.TicketSingleFlag}><img src={imgSrc} alt="Flag" /></div>
                         <div className={classes.TicketSingleTeam}> {allMatches[currentMatchIndex]['teams'][0]}-{allMatches[currentMatchIndex]['teams'][1]}</div>
                       </div>
                       <div className={classes.TicketSingleRight}>
                         <div className={classes.TicketSingleBookmaker}> {allMatches[currentMatchIndex]['sites'][x['selectIndex']]['site_nice']}</div>
                         <div className={classes.TicketSingleType}>  {type} </div>
                         <div className={classes.TicketSingleOdd}> {allMatches[currentMatchIndex]['sites'][x['selectIndex']]['odds']['h2h'][x['type']]} </div>
                         <div className={classes.TicketSingleRemove} onClick={()=>removeItemHandler(x['ID'], x['current'], x['tempCurrentId'], x['selectIndex'], x['type'])} >-</div>
                       </div>
              </div>):null;

    });


   

    return <div className={classes.TicketSingleHolder}>
                     { (ticket.length>0) 
                      ? <div className={classes.TicketSingleMatchHeader}><div className={classes.TicketSingleMatchHeaderOdd} onClick={() => sortByOdds()}>{(sortTicket)?'Sort +/-':' Sort -/+'}</div></div>
                       :<div className={classes.EmptyTicket}> Choose matches!</div>}
                     {ticketCurrent}
            </div>;  

   
   };





  return (

    <div className={classes.App}>

    <div className={classes.FilterFormHolder}>
         <h2>Choose a league:</h2>
         <FilterForm chooseLeague={onChooseLeague} />
      </div>

      <div className={classes.MatchTicketHolder}>
          
          <MatchesList currentMatches={selectLeague} currentTicket={onCurrentTicket} flag={flagLeague} />

          <div className={classes.TicketHolder}>
                <h2>Your Ticket:</h2>
                <TicketMatches />
           </div>

      </div>

      <Calculator allPairs={ticket} matchesAll={allMatches} />


    </div>
  );
}

export default Matches;
