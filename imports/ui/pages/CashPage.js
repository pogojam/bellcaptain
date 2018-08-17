import React, {Component} from 'react'
import CashCalc from "../components/cashCalc";
import styled from "styled-components";
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import Nav from "../components/nav";
import ReactEcharts from 'echarts-for-react';



const dropCash = gql`
    mutation createCashdrop ($totalDrop:Int,$amDrop:Int,$pmDrop:Int,$shiftStart:Float,$shiftEnd:Float,$userDrop:Int,$name:String) {
      createCashdrop(totalDrop:$totalDrop,amDrop:$amDrop,pmDrop:$pmDrop,shiftStart:$shiftStart,shiftEnd:$shiftEnd,userDrop:$userDrop,name:$name){
        name
      }
    }
`

class CashPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      totalAM:0,
      totalPM:0,
      totalCash:0
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

    },()=>this.calcTotals())
    
  }

  handleCashDrop(){
    console.log('drop');
    const {totalDrop,totalAM,totalPM} = this.state

    this.state.data.map(user=>{
      this.props.dropCash(
        {variables:{
          totalDrop:totalDrop,
          amDrop:totalAM,
          pmDrop:totalPM,
          userDrop:user.cash,
          shiftStart:user.time[0],
          shiftEnd:user.time[1],
          name:user.name
        }}
      )
    })

  }

  calcTotals(){

    let totalCash = 0,
    totalAM = 0,
    totalPM = 0

    this.state
    .data
    .forEach(user => {

      totalCash = user.cash + totalCash

// Determine if user adds to AM shift or PM shift

      let timeAverage = (user.time[0] + user.time[1])/2

      if(timeAverage<=13){
           totalAM += user.cash
      }
      if(timeAverage>=17){
         totalPM += user.cash
      }

    })

    console.log(this.state.data);

    this.setState({
      totalCash:totalCash,
      totalAM:totalAM,
      totalPM:totalPM
    })

  }

  render() {
    //  Totals
    const {totalCash,totalAM,totalPM}=this.state

    return (
      <Page>
        <Header>
          <Nav> </Nav>
        </Header>
        <CashCalc
          handleCashData={this
          .handleCashData
          .bind(this)}
          handleCashDrop={this.handleCashDrop.bind(this)}
          {...this.props}/>
        <UserTooltip totalAM={totalAM} totalPM={totalPM} totalCash={totalCash} data={this.state.data} handleCashDrop={this.handleCashDrop.bind(this)} />
      </Page>
    )
  }
}

const UserTooltip = ({totalAM,totalPM,data, totalCash,handleCashDrop}) => {

  // Styles

  const StyledTooltip = styled.div `
                display:grid;
                text-align: center;
                `
  const StyledInfo = styled.div `
  
  `
  const StyledTotals = styled.div `
      margin:1em;
      min-width: 15vw;
  `
  const totalsChartOptios = {
  
    legend: {
        orient: 'vertical',
        x: 'center',
        y:'top',
        data:[`AM $${totalAM}`,`PM $${totalPM}`,`Total $${totalCash}`]
    },
    series: [
      {
        type:'pie',
        radius: [0, '30%'],

        label: {
            normal: {
                position: 'center',
                show:false
            },
            emphasis: {
              show: true,
              textStyle: {
                  fontSize: '10',
                  fontWeight: 'bold',
                  color:'black'
              }
          }
        }, 
        labelLine: {
            normal: {
                show: false
            }
        },
        data:[
            {value:totalCash, name:`Total $${totalCash}`},
        ]
    },
        {
            name:'Shift Totals',
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '10',
                        fontWeight: 'bold'
                    }
                }
            },
          
            data:[
                {value:totalAM, name:`AM $${totalAM}`},
                {value:totalPM, name:`PM $${totalPM}`}
            ]
        }
    ]
}

  // Content
  return (
    <StyledTooltip >

      <StyledTotals>
   
      <ReactEcharts style={{ width:'100%' }} option={totalsChartOptios} />
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
    <button style={{ minHeight:'20vh' }} onClick={()=>handleCashDrop()} >Drop Cash</button>
    </StyledTooltip>
  )

}

const Page = styled.div `
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 1fr 6fr;
    grid-template-columns: 1fr;
}
`

const Header = styled.div `
      background-color:black;
      grid-row: 1;
      grid-column: 1/3;
      
`


export default graphql(dropCash,{name:'dropCash'})(CashPage)