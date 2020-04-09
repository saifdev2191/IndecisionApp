import React from 'react';

class Option extends React.Component{
    render(){
        const {options,optionText,deleteIndividualEntry,count} = this.props
         return(
            <div className="option">
            <p className="option__text">{count}. {optionText}</p>
            
               <button 
                    className="button button--link"
                    onClick = {()=> deleteIndividualEntry(optionText)}>
                    Remove
               </button>
            </div>
        )
    }
  
}

export default Option;