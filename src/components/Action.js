import React from 'react';
const Action = (props) => {
    const {hasOption, handlePick} = props
   
    return(
        <div>
            <button className="big-button" disabled={!hasOption} onClick= {handlePick}>What should i do ?</button>
        </div>    
    )
}

export default Action;