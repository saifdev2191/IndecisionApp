class Indecisonapp extends React.Component{
    constructor(props){
        super(props);
        this.handleDeleteAll= this.handleDeleteAll.bind(this)
        this.handlePick= this.handlePick.bind(this)
        this.handleAddOption= this.handleAddOption.bind(this)
        this.deleteIndividualEntry= this.deleteIndividualEntry.bind(this)
        this.state={
            options:  []
        }
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

    handleDeleteAll(){
        this.setState(()=>({options:[]}))
    }

    handlePick(){
        const lengthArray = this.state.options.length
        if(lengthArray>0){
            const pickedValueIndex =Math.floor(Math.random()*lengthArray) 
            const pickedValue =  this.state.options[pickedValueIndex]
            alert(pickedValue)
        }
    }

    handleAddOption(currentOption){
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

    deleteIndividualEntry(optionText){
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
              <Action hasOption = {options.length > 0  ? true : false}  handlePick = {this.handlePick}  />
              <Options options= {this.state.options} handleDeleteAll={this.handleDeleteAll} deleteIndividualEntry={this.deleteIndividualEntry}/>
              <AddOption   
                handleAddOption={this.handleAddOption}/>
            </div>
        )
    }
}

const Header = (props) => {
        return(
            <div>
                <h1> {props.title}</h1>
                <h2> {props.subtitle} </h2>
            </div>
        )
    
}

const Action = (props) => {
    const {hasOption, handlePick} = props
   
    return(
        <div>
            <button disabled={!hasOption} onClick= {handlePick}>What should i do ?</button>
        </div>    
    )
}

const Options = (props) => {
        const {options, deleteIndividualEntry} = props
        return(
            <div>
                <button onClick={props.handleDeleteAll}>Remove all</button>
               {options.map((el,index)=><Option optionText={el} key={el} deleteIndividualEntry={deleteIndividualEntry} index={index} options={options}></Option>)}
            </div>
        )
    
}

class  Option extends React.Component{

    render(){
        const {options,optionText,deleteIndividualEntry} = this.props
         return(
            <div>
               {optionText}
               <button onClick = {()=> deleteIndividualEntry(optionText)}>Remove</button>
            </div>
        )
    }
  
}

class AddOption extends React.Component{
    constructor(props){
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this)
        this.state= {
            error: undefined
        }
    }
    handleAddOption(e){
        e.preventDefault()
        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option)
        this.setState(()=>({error}))
    }
    render(){
        return(
            <div>
                {this.state.error ? this.state.error : null}
                <br></br>
                <form onSubmit= {this.handleAddOption}>
                    <input type="text" name="option"></input>
                    <button> Add Option</button>
                </form>
            </div>
        )
    }
}




ReactDOM.render(<Indecisonapp />, document.getElementById('root'))