import styled from 'styled-components'
import React, { Component } from 'react'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import milToStandard from '../tools/milToStandard'

const ToolTip = Slider.createSliderWithTooltip;

const Range = ToolTip(Slider.Range) 


const createSliderWithTooltip = Slider.createSliderWithTooltip;

const day = 24

let times = []

let time = 0
let hours = 0
let minutes = 0
let ampm = 'am'


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