import styled from "styled-components";
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


import React, { Component } from 'react'

class calculator extends Component {
    constructor(props) {
        super(props)
        this.state={
            TotalCash:''
        }
    }

    calcCuts(){

            let cuts =  this.TC.value/this.TH.value
                cuts = Math.round(cuts)
            this.setState({
                TotalCuts:cuts
            })
    }

    handleUserInput(val){
        this.setState(prevState=>{
            return {TotalCuts:prevState.TotalCuts - val}
        })
    }

    handleNumChange(e){
        let val = this.TC.value
        this.setState({TotalCash:val})

    }

    symbol(TC){
        return `$${TC}`
    }

  render() {
      const {TotalCuts,TotalCash} = this.state
      const users = ['Ryan','Alex','Kong','Kevin','Bob']
    return (
      <div className='animated calculator ' >
        <input type="number"  ref={e=>this.TH = e} placeholder='Total Hours' />
        <input  value={this.state.TotalCash} onChange={this.handleNumChange.bind(this)}  ref={e=>this.TC = e} placeholder='Total Cash' />
        <button onClick={this.calcCuts.bind(this)} >Enter</button>
        {TotalCuts?<UserCash TotalCuts={TotalCuts} users={users} handleUserInput={this.handleUserInput.bind(this)} />:null}
      </div>
    )
  }
}

const UserCash = ({users,TotalCuts,handleUserInput})=>{
    return <div className='animated fadeInUp' >
        <h1>TotalCuts {TotalCuts}</h1>
        {users.map((item,id)=><UserCashInput key={id} name={item} handleUserInput={handleUserInput} />)}
    </div>
}


const UserCashInput = ({name,handleUserInput})=>{

    let cut

    return <form action="">
        {name} <input ref={e=>cut = e} onChange={e=>handleUserInput(cut.value)} placeholder='Cuts Given' type="number"/>
    </form>
}

// Styled

const CashCalc = styled(calculator)`

`


export default CashCalc 
