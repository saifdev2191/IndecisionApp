import React from 'react';
import Option from './Option';
const Options = (props) => {
    const {options, deleteIndividualEntry} = props
    return(
        <div>
            <div className="widget-header">
                <h3 className="widget-header__title">Your Options</h3>
                <button className="button button--link" onClick={props.handleDeleteAll}>Remove all</button>
            </div>
            {props.options.length === 0 && <p className = "widget__message">Please add an option to get started</p>}
           {options.map((el,index)=><Option optionText={el} key={el} deleteIndividualEntry={deleteIndividualEntry} index={index} options={options} count={index+1}></Option>)}
        </div>
    )

}
export default Options