import styled from 'styled-components'
import React, { Component } from 'react'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const ToolTip = Slider.createSliderWithTooltip;

const Range = ToolTip(Slider.Range) 


const createSliderWithTooltip = Slider.createSliderWithTooltip;

const day = 24

let times = []

let time = 0
let hours = 0
let minutes = 0
let ampm = 'am'

const milToStandard = (mil)=>{

    let hour = Math.floor(mil)
    let min = (((mil - hour)/.25)*.15)
        min= min.toFixed(2)*100


    let time

    if(hour<12){
        time = hour+':'+min+'am'
    }
    if(hour===12){
        time=12+':'+min+'pm'
    }
    if(hour>12){
        time = (hour-12)+':'+min+'pm'
    }
    if(hour===24){
        time = 12+':'+min+'am'
    }

    return time
}

console.log(milToStandard(13.5));


class TimeInput extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            time:times[0]
        }
    }

    handleOnChange(val){
        this.setState({
            time:val
        })
    }

  render() {


    return (
        <StyledRange
           tipProps={{placement:'bottom'}}
           tipFormatter={(val)=>milToStandard(val)}
        min={0}
        max={24}
        step={.25}
        defaultValue={[6,14]}
        pushable={3}
        onChange={this.props.makeUserTooltip}
        />
    )
  }
}

const StyledRange = styled(Range)`
    grid-area:slider;
    align-self: center;
    `

export default TimeInput




//   <select>
//         {times.map((t,i)=><option key={i} value={t}>{t}</option>)}
//         </select>