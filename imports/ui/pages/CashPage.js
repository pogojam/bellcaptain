import React, {Component} from 'react'
import CashCalc from "../components/cashCalc";
import styled from "styled-components";
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import Nav from "../components/nav";
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import milToStandard from '../tools/milToStandard'
import graphTheme from "../themes/graphThemes";

echarts.registerTheme('captainTheme',graphTheme)


const dropCash = gql`
    mutation createCashdrop ($totalDrop:Int,$amDrop:Int,$pmDrop:Int,$shiftStart:Float,$shiftEnd:Float,$userDrop:Int,$name:String,$date:DateScalarType) {
      createCashdrop(totalDrop:$totalDrop,amDrop:$amDrop,pmDrop:$pmDrop,shiftStart:$shiftStart,shiftEnd:$shiftEnd,userDrop:$userDrop,name:$name,date:$date){
        amDrop
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
    const {totalDrop,totalAM,totalPM} = this.state

    var date = new Date()
    var begun = moment(date).format("MM.DD.YYYY");
    
                console.log(begun)
                
    this.state.data.map(user=>{
      this.props.dropCash(
        {variables:{
          totalDrop:totalDrop,
          amDrop:totalAM,
          pmDrop:totalPM,
          userDrop:user.cash,
          shiftStart:user.time[0],
          shiftEnd:user.time[1],
          name:user.name,
          date:begun
        }}
      )
    })

  }

  calcTotals(){

    let totalCash = 0,
    totalAM = 0,
    totalPM = 0,
    cutTo = null

    this.state
    .data
    .forEach(user => {
      totalCash = user.cash + totalCash
      
      user.shift==='AM'? totalAM += user.cash:null
      user.shift==='PM'? totalPM += user.cash:null
    })

    totalAM>totalPM?cutTo='AM':cutTo='PM'

    this.setState({
      totalCash:totalCash,
      totalAM:totalAM,
      totalPM:totalPM,
      cutTo:cutTo
    })

  }

  showConfirmation(){
    this.setState({
      confirm:true
    })
  }

  render() {
    //  Totals
    const {totalCash,totalAM,totalPM,confirm}=this.state
    return (
      <Page>
        <Header>
          <Nav history={this.props.history} > </Nav>
        </Header>
        <CashCalc
          handleCashData={this
          .handleCashData
          .bind(this)}
          handleCashDrop={this.handleCashDrop.bind(this)}
          {...this.props}/>
        <UserTooltip totalAM={totalAM} totalPM={totalPM} totalCash={totalCash} data={this.state.data}  showConfirmation={this.showConfirmation.bind(this)} />
        {confirm===true&& <Confirm {...this.state} handleCashDrop={this.handleCashDrop.bind(this)} />}
      </Page>
    )
  }
}

const Confirm= (props)=>{

      const {cutTo,totalCash} = props
        let TotalCuts = 0

    const adjustCut = (perHr)=>{ 
    if(!perHr){
      // Gets perHr cut form user ,recurssive
       props.data.map(user=>{
          let shiftLength = user.time[1]-user.time[0]
              TotalCuts = TotalCuts + shiftLength
          if(user.shift === cutTo){ 
            user.cuts= shiftLength + 3
            cuts=TotalCuts + 3
          }
          else{
            user.cuts = shiftLength
          }
      }),adjustCut(totalCash/TotalCuts);
    }
  // adds cuts to the user object 
    if(perHr){
  return  props.data.map((user)=>{
      let shiftLength = user.time[1]-user.time[0]
      user.cashBack = perHr * user.cuts
    })}
    }

    adjustCut()

    console.log(props);


    return <StyledConfirm className={'animated fadeIn'} >
          <div>
          {props.data.map(user=>{
              return <p>
                {user.name}
                {user.shift}
                {user.cashBack}
              </p>
          })}
          </div>
    </StyledConfirm>
}



const UserTooltip = ({totalAM,totalPM,data, totalCash,showConfirmation}) => {

  let cash = totalCash.toString()
 
  const totalsChartOptions = {
  
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
            avoidLabelOverlap: true,
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

console.log(data.length);

  // Content
  return (
    <StyledTooltip >

      <StyledTotals>
   
      <ReactEcharts theme={'captainTheme'} style={{ height:'40vh' }} option={totalsChartOptions} />
      </StyledTotals>

      {data.map((user, id) => (
        <StyledInfo className="animated fadeIn" key={id}>
          {user.name}
          <br/>
          drop ${user.cash}
          <br/>
          {milToStandard(user.time[0])} to {milToStandard(user.time[1])}
        </StyledInfo>
      ))}
    {data.length>0&&<StyledButton className={'animated fadeIn'}   onClick={()=>showConfirmation()} > <i className="fas fa-piggy-bank"/><br />Drop Cash</StyledButton>}
    </StyledTooltip>
  )

}


// Styles

const StyledConfirm = styled.div`
   width: 100vw;
    height: 100vh;
    position: absolute;
    background-color: rgba(127,255,212 ,.5 );
`


const StyledButton = styled.button`
      background-color:aquamarine;
      min-height:10vh;
      font-size:1.5em;
&:hover{
  
}
`
const StyledTooltip = styled.div `
display:grid;
text-align: center;
`
const StyledInfo = styled.div `
align-self: center;
`
const StyledTotals = styled.div `
margin:1em;
min-width: 15vw;
`
const Page = styled.div `
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 1fr 10fr;
    grid-template-columns: 1fr;
}
`

const Header = styled.div `
      justify-content:center;
      grid-column: 1/4;
      padding: 1em;
`


export default graphql(dropCash,{name:'dropCash'})(CashPage)