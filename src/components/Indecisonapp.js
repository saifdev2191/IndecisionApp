import React from 'react';
import AddOption from './AddOption';
import Options from './Options';
import Header from './Header';
import Action from './Action';
import OptionModal from './OptionModal'

class Indecisonapp extends React.Component{
    state = {
        options:  [],
        selectedOption: undefined
    }
   
    componentDidMount(){
        // catching bad data
        try{
            const json = localStorage.getItem('options')
            const options = JSON.parse(json)
            if(options){
                this.setState(()=>({
                    options
                }))
            }

        }
        catch(e){
            // DO NOTING
        }   
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.options.length !== this.state.options.length){
            console.log('did update')
            const jsonData = JSON.stringify(this.state.options)
            localStorage.setItem('options',jsonData)

        }

    }

    clearModal = () => {
        this.setState(()=>({
            selectedOption: undefined
        }))
    }

    handleDeleteAll= ()=> {
        this.setState(()=>({options:[]}))
    }

    handlePick = () =>{
        const lengthArray = this.state.options.length
        if(lengthArray>0){
            const pickedValueIndex =Math.floor(Math.random()*lengthArray) 
            const pickedValue =  this.state.options[pickedValueIndex]
            // alert(pickedValue)
            this.setState(()=>({
                selectedOption: pickedValue
            }))
        }
    }

    handleAddOption= (currentOption) =>{
        if(!currentOption){
            return 'add valid item'
        }
        else if(this.state.options.indexOf(currentOption) > -1){
            return 'this item already exist'
        }
        const modArray = this.state.options.concat(currentOption)
        this.setState((prevState)=>{
                // prevState.options.push(currentOption)
                return{
                 options: modArray
             }
        })
    }

    deleteIndividualEntry =(optionText) =>{
        // this.state.options.splice(index,1)
        // const modArr = this.state.options
        const modArr = this.state.options.filter((el)=> el !== optionText)
        this.setState(()=>({
            options: modArr
        }))
    }



    render(){
        const title = "Indecision App";
        const subtitle = " Put ur life in my hand"
        const {options} = this.state;
        return(
            <div>
            
              <Header title={title} subtitle = {subtitle}/>
              <div className="container">
                <Action hasOption = {options.length > 0  ? true : false}  handlePick = {this.handlePick}  />
                <div className="widget">
                    <Options options= {this.state.options} handleDeleteAll={this.handleDeleteAll} deleteIndividualEntry={this.deleteIndividualEntry}/>
                    <AddOption   
                        handleAddOption={this.handleAddOption}/>
                </div>
              </div>
               <OptionModal selectedOption={this.state.selectedOption} clearModal={this.clearModal}/>
            </div>
        )
    }
}

export default Indecisonapp;