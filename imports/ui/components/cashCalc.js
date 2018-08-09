import styled from "styled-components";
import CurrencyInput from 'react-currency-input';
import TimeInput from './TimeInput'
import React, { Component } from 'react'
//  staff 
//  total hours worked TH
//  total cash TC
// 
//     TC/TH = Cuts
// 
//  display list of staff and allow Bell Captain to enter 
//  number of cuts given to the individual 
// 
// Show Running Cuts ie.. Ryan:8cuts Bob:4cuts  RC= Cuts - Bob+Ryan





class calculator extends Component {
    constructor(props) {
        super(props)
        this.state={
            TotalCash:'',
            users:[]
        }
    }





    handleNumChange(e){
        let val = this.TC.value
        this.setState({TotalCash:val})
    }



 
  render() {
      const {TotalCuts,TotalCash} = this.state
      const users = ['Ryan','Alex','Kong','Kevin','Bob']
      
    return (
      <div className='animated calculator ' >
      {users.map((item,id)=><UserCashInput {...this.props}  key={id} name={item} />)}
      </div>
    )
  }
}

class UserCashInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cash:0,
            locked:false
        }
    }

    makeUserTooltip(e){
        let hours = e[1]-e[0]
        let time = [e[0],e[1]]
        this.setState({
            hours:hours,
            time:time,
            tooltip:true
        })
    }

    handleCashChange(){
        this.setState({
            cash:this.cash.state.value
        })
    }
    
    confirm(){

        const {time,cash,locked} = this.state
        const {name} = this.props
        this.setState({
            locked:true
        })

        let data = [{time,name,cash}]
        this.props.handleCashData(data)
    }


    render(){
        const {name}= this.props
        const {hours,time,cash,tooltip,locked} = this.state
        const handleRadio = this.handleRadio

return <UserStyle >
        <h3 style={{ gridArea:'name' }} >
        {name} 
        </h3>
        <CurrencyInput style={{ gridArea:'cash' }} onChange={this.handleCashChange.bind(this)} value={cash}  ref={e=>this.cash = e}  precision={0} prefix='$' ></CurrencyInput>
        <UserToolTip confirm={this.confirm.bind(this)} tooltip={tooltip} hours={hours} />
        <TimeInput makeUserTooltip={this.makeUserTooltip.bind(this)} />
    </UserStyle>
    }
}


const Confirm = ({confirm})=>{
    const StyledButton = styled.div`
    grid-area:confirm;
    text-orientation: mixed;
    align-self:center;
    `
    return <StyledButton >
        <button  onClick={confirm} >    
        confirm
        </button>
    </StyledButton>
}




const UserToolTip = ({hours,tooltip,confirm})=>{
 
    const StyledTooltip = styled.div`

                min-width:70px;
                grid-area: tooltip;
                display:grid;
                grid-template:'hours' 'confirm';
                justify-content:center
                border-left: 1px solid;
                
        `

        const StyledHours = styled.div`
            grid-area:hours;
        `
        const StyledNumber = styled.p`
            width:30px;
            float:right;
        `

        
   return (<StyledTooltip>
      <StyledHours > Hours Worked: <StyledNumber className='animated fadeIn' >{hours}</StyledNumber> </StyledHours> 
      {tooltip && <Confirm  confirm={confirm} />}
    </StyledTooltip>)
}


// Styled

const CashCalc = styled(calculator)`

`

const UserStyle = styled.div`
        width: 100%;
        display: grid;
        text-align: center;
        grid-template:'name cash tooltip' 
                        'slider slider tooltip';
        margin:1em;
        grid-gap: .5em;
        max-height: 50px;
    `


export default CashCalc 
