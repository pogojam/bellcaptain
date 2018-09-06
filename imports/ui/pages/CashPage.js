import React, {Component} from 'react'
import CashCalc from "../components/cashCalc";
import styled from "styled-components";
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import milToStandard from '../tools/milToStandard'
import graphTheme from "../themes/graphThemes";

echarts.registerTheme('captainTheme',graphTheme)


const dropCash = gql`
    mutation createCashdrop ($userId:ID,$cashBack:Int,$shift:String,$totalDrop:Int,$amDrop:Int,$pmDrop:Int,$shiftStart:Float,$shiftEnd:Float,$userDrop:Int,$name:String,$date:DateScalarType,$phone:ID) {
      createCashdrop( userId:$userId,cashBack:$cashBack,shift:$shift,totalDrop:$totalDrop,amDrop:$amDrop,pmDrop:$pmDrop,shiftStart:$shiftStart,shiftEnd:$shiftEnd,userDrop:$userDrop,name:$name,date:$date,phone:$phone){
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

  handleCashDrop(data){
    const {totalCash,totalAM,totalPM} = this.state

    var date = new Date()
    var begun = moment(date).format("MM.DD.YYYY");

    data.map(user=>{
      this.props.dropCash(
        {variables:{
          userId:user._id,
          totalDrop:totalCash,
          amDrop:totalAM,
          pmDrop:totalPM,
          userDrop:user.cash,
          shiftStart:user.time[0],
          shiftEnd:user.time[1],
          shift:user.shift,
          cashBack:user.cashBack,
          name:user.name,
          phone:user.phone,
          date:begun
        }}
      )
    })
    this.props.history.push('/Dash')
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

  toggleConfirm(){
    this.setState((prevState)=> {
      return {confirm:!prevState.confirm}
    })
  }

  render() {
    //  Totals
    const {totalCash,totalAM,totalPM,confirm}=this.state
    return (
      <Page>
        
        <CashCalc
          handleCashData={this
          .handleCashData
          .bind(this)}
          handleCashDrop={this.handleCashDrop.bind(this)}
          {...this.props}/>
        <UserTooltip totalAM={totalAM} totalPM={totalPM} totalCash={totalCash} data={this.state.data}  toggleConfirm={this.toggleConfirm.bind(this)} />
        {confirm===true&& <Confirm {...this.state} toggleConfirm={this.toggleConfirm.bind(this)}  handleCashDrop={this.handleCashDrop.bind(this)} />}
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
          let shiftLength = user.time[1]-user.time[0];

              TotalCuts = TotalCuts + shiftLength;

          !user.shift?user.shift='MID':null


          
          if(user.shift === cutTo){ 
            user.cut= shiftLength + 3
            TotalCuts=TotalCuts + 3
          }
            
          // Case: shift past 5pm on a PM cut credit  
          else if(cutTo==='PM'&&user.time[1]>=17){
            user.time[1]<20?(user.cut = shiftLength+(20-user.time[1]),TotalCuts+=20-user.time[1]):(TotalCuts+=3,user.cut=shiftLength+3)
          }
          // Case: shift before 10am on a AM cut credit
          else if( cutTo ==='AM'&&user.time[0]<=10) {
              user.time[0]<7?(user.cut=shiftLength+3,TotalCuts+=3):(user.cut=shiftLength+(10-user.time[0]),TotalCuts+=10-user.time[0])
          }
          
          else{
            user.cut = shiftLength
          }



      }),adjustCut(totalCash/TotalCuts);
    }
  // adds cuts to the user object 
    if(perHr){
  return  props.data.map((user)=>{
      let shiftLength = user.time[1]-user.time[0]
      user.cashBack = Math.floor(perHr * user.cut)
    })}

    }

    adjustCut()


    return <StyledConfirm className={'animated fadeIn'} >
    <div>
          {props.data.map((user,id)=>{
              return <ul key={id}>
              <li>  {user.name} </li>
                <li>{user.shift}</li> 
                <li>Drop ${user.cash}</li> 
                 <li>Cash Back ${user.cashBack }</li>
              </ul>
          })}

            <button onClick={()=>(props.handleCashDrop(props.data))} > Confirm </button>
            <button onClick={()=>(props.toggleConfirm())} > Cancel </button>
    </div>

    </StyledConfirm>
}



const UserTooltip = ({totalAM,totalPM,data, totalCash,toggleConfirm}) => {

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


  // Content
  return (
    <StyledTooltip >

      <StyledTotals>
   
      <ReactEcharts theme={'captainTheme'} style={{ height:'30vh' }} option={totalsChartOptions} />
      </StyledTotals>

      {data.map((user, id) => (
        <StyledInfo className="animated fadeIn fadeInRight" key={id}>
          {user.name}
          <br/>
          drop ${user.cash}
          <br/>
          {milToStandard(user.time[0])} to {milToStandard(user.time[1])}
        </StyledInfo>
      ))}
    {data.length>0&&<StyledButton className={'animated fadeIn'}   onClick={()=>toggleConfirm()} > <i className="fas fa-piggy-bank"/><br />Drop Cash</StyledButton>}
    </StyledTooltip>
  )

}


// Styles

const StyledConfirm = styled.div`
      align-content: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    position: absolute;
    display: grid;
    background-color: rgba(127,255,212 ,.5 );

    button{
      
    }

      div{
        border-radius: 9px;
        width: 60vw;
    background: aquamarine;
    height: 60vh;
    padding: 2em;
    position: absolute;
    justify-self: center;

          
          ul{
            list-style: none;
    display: flex;
    align-items: center;
    background-color: mediumaquamarine;
    height: 2em;
    border-radius: 16px;
    margin-top: 1em;
            li{
              margin:auto;
              }
          }
      }

`


const StyledButton = styled.button`
background-color:rgba(41,52,65,1);
    color: #87f7cf;
      min-height:10vh;
      font-size:1.5em;
&:hover{
  
}
`
const StyledTooltip = styled.div `
display:grid;
height:100%;
text-align: center;
transition:all 1s linear;
`
const StyledInfo = styled.div `

align-self: center;
margin-left: 2em;
font-size: 0.7em;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    text-align:center;
    background-color:rgba(41,52,65,1);
    color: #87f7cf;
padding: .3em;

`
const StyledTotals = styled.div `
margin:1em;
min-width: 15vw;
`
const Page = styled.div `
       display:grid;
       grid-template-columns: 10fr 1fr;
       height:100%
}
`

const Header = styled.div `
      grid-column: 1/4;
`


export default graphql(dropCash,{name:'dropCash',options:{fetchPolicy:'cache-and-network'}})(CashPage)