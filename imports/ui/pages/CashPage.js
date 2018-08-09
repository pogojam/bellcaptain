import React, {Component} from 'react'
import CashCalc from "../components/cashCalc";
import styled from "styled-components";

export default class CashPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  handleCashData(data) {

    this.setState(prevState => {

      let userData = prevState.data

      const checkName = (prevuser) => {
        return prevuser.name === data[0].name
      }

      const findElement = (el) => (el.name === data[0].name)

      if (!userData.some(checkName)) {
        return {
          data: userData.concat(data)
        }
      }
      if (userData.some(checkName)) {

        let indexOf = userData.findIndex(findElement)
        userData[indexOf] = data[0]
        return {data: userData}
      }

    })

  }

  render() {

    // Calc Totals

    let totalCash = 0,
    totalAM = 0,
    totalPM = 0

    this.state
      .data
      .forEach(user => {

        totalCash = user.cash + totalCash
// Determine if user is AM shift or PM shift

        let timeAverage = (user.time[0] + user.time[1])/2

        if(timeAverage<=13){
             totalAM += user.cash
        }
        if(timeAverage>=17){
           totalPM += user.cash
        }
 
      })





    return (
      <Page>
        <Header></Header>
        <CashCalc
          handleCashData={this
          .handleCashData
          .bind(this)}
          {...this.props}/>
        <UserTooltip totalAM={totalAM} totalPM={totalPM} totalCash={totalCash} data={this.state.data}/>
      </Page>
    )
  }
}

const UserTooltip = ({totalAM,totalPM,data, totalCash}) => {

  // Styles

  const StyledTooltip = styled.div `
                display:grid;
                text-align: center;
                `
  const StyledInfo = styled.div `
  
  `
  const StyledTotals = styled.div `
      margin:1em;
  `

  // Content
  return (
    <StyledTooltip >

      <StyledTotals>
          <h2>Shift Totals</h2>
      Drop: ${totalCash} <br/>
      AM Shift: ${totalAM} <br/>
      PM Shift: ${totalPM} <br/>
      </StyledTotals>

      {data.map((user, id) => (
        <StyledInfo key={id}>
          {user.name}
          <br/>
          ${user.cash}
          <br/>
          from {user.time[0]} to {user.time[1]}
        </StyledInfo>
      ))}
    </StyledTooltip>
  )

}

const Page = styled.div `
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 1fr 6fr;
}
`

const Header = styled.div `
      background-color:black;
      grid-row: 1;
      grid-column: 1/3;
      
`