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


for(let i = 0 ; i < day ; i = i+.5 ){

    time = time + 30    
    hours = time/60 
    hours = Math.floor(hours)

    minutes = time - hours*60

    i<=11 ? ampm = 'am' : ampm = 'pm';

    if(hours === 24 ){
        ampm = 'am'
    }

    times.push(`${hours}:${minutes} ${ampm}`)
}


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
        min={0}
        max={24}
        step={.5}
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