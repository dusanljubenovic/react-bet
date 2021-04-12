import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import classes from './BetOdds.module.css';

import * as matchActions from '../../../../../store/actions/index';

const BetOdds = (props) => {

                   const flagL=props.flag;

                   const dispatch = useDispatch();

                   const onChangeArray = useCallback(
                                  (selVal) => dispatch(matchActions.changeArray(selVal)),
                                  [dispatch]
                           );

               

                const chooseTypeArray = useSelector(state => {
                  return state.chooseTypeArray;
                });
                

                 const ID =  props.currentMatch['id'];


                  const chooseOdds = useCallback((ID, selectIndex, type) =>{

                       let tempCurrentId=ID+selectIndex+type;

                       const current = chooseTypeArray.findIndex(x => tempCurrentId === x.id);

                       const prev2=current - 2;

                       const prev=current - 1;

                       const next=current + 1;

                       const next2=current + 2;

                       const newOdds = chooseTypeArray.map( (x, index, elements) => {

    
                        if (type===0){


                           if ( index === current   ){
               
                                 if (x.activ===false){
                                      return ({...x, activ: true, flag:flagL }) 
                                  }else{
                                      return ({...x, activ: false, flag:flagL }) 
                                  }

                            }

                            if ( next+1 < chooseTypeArray.length && ( index === next  ) ) {

                                 return ({ ...chooseTypeArray[next], activ: false, flag:flagL })
                            
                            }

                            if ( next2 < chooseTypeArray.length && ( index === next2  ) ) {
       
                               return ({ ...chooseTypeArray[next2], activ: false, flag:flagL })
      
                            }


                         }


    
                         if (type===1){

                
                          if ( index === current   ){
               
                         
                            if (x.activ===false){
                                 
                                   return ({...x, activ: true , flag:flagL }) 
                         
                                }else{
                                  
                                  return ({...x, activ: false, flag:flagL }) 
                                }

                            }


      
                             if ( prev > 0 && ( index === prev  ) ) {
       
                              return ({ ...chooseTypeArray[prev], activ: false, flag:flagL })
      
                            }

      
                            if ( next < chooseTypeArray.length && ( index === next  ) ) {
      
                              return ({ ...chooseTypeArray[next], activ: false, flag:flagL })
      
                            }

    
                      }



    
                      if (type===2){

      
                        if ( index === current   ){
               
                         
                          if (x.activ===false){
                         
                              return ({...x, activ: true, flag:flagL  }) 
                         
                          }else{
                                  
                              return ({...x, activ: false, flag:flagL }) 
                        
                          }

                         }


      
                         if ( prev >= 0 && ( index === prev  ) ) {
        
                             return ({ ...chooseTypeArray[prev], activ: false, flag:flagL })
      
                         }

      
                         if ( prev2 >= 0 && ( index === prev2  ) ) {
        
                              return ({ ...chooseTypeArray[prev2], activ: false, flag:flagL })
      
                          }

                     }
  
                    return x
                 
                  })


                    onChangeArray(newOdds);
     

                    return props.onSelectSites(ID, current, tempCurrentId, selectIndex, type, newOdds[current]['activ']);

                  }, [chooseTypeArray,props,onChangeArray, flagL ] )


                          const  sites_pref =   ( <div className={classes.SiteOddsHolderMain} key={ ID + '_00' } >
                                                     <div className={classes.SiteBookmakers}>Bookmakers</div> 
                                                         <div className={classes.Odds}>
                                                              <span>1</span>
                                                              <span>X</span>
                                                              <span>2</span>
                                                          </div>
           
                                                </div>);

                                               

                    let sites = props.currentMatch['sites'].map( (site, index) => {

                       
                        let tempCurrent_0=ID+index+'0';
                        let tempCurrent_1=ID+index+'1';
                        let tempCurrent_2=ID+index+'2';

                        const current_0= chooseTypeArray.findIndex(x => tempCurrent_0 === x.id);
                        const current_1= chooseTypeArray.findIndex(x => tempCurrent_1 === x.id);
                        const current_2= chooseTypeArray.findIndex(x => tempCurrent_2 === x.id);


                       

                        return(
                                     
                          <div className={classes.SiteOddsHolder}   key={ ID + index }>
                                 <div className={classes.Site}>{site['site_nice']}</div> 
                                 <div className={classes.Odds}>
                                    <span onClick={()=>chooseOdds(ID, index, 0)} className={(chooseTypeArray[current_0]['activ'])? classes.SelectedItem : null }>{site['odds']['h2h'][0]}</span>
                                    <span onClick={()=>chooseOdds(ID, index, 2)} className={(chooseTypeArray[current_2]['activ'])? classes.SelectedItem : null } >{site['odds']['h2h'][2]}</span>
                                    <span onClick={()=>chooseOdds(ID, index, 1)} className={(chooseTypeArray[current_1]['activ'])? classes.SelectedItem : null }>{site['odds']['h2h'][1]}</span>
                                </div>
                           </div>  
                          
                        );
                      });    

                
  return (

         <React.Fragment>
               {sites_pref}
              { sites }
              

         </React.Fragment>

  );
}

export default BetOdds;