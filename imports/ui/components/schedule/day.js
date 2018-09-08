import React, { Component } from 'react'

 class Day extends Component {
  render() {
      const {date,names} = this.props
    return (
         <div>
            {date}
      <div>
      {/* {names.map((name,id)=>{
            return<UserTimeInput date={date} name={name} key={id} />
   })} */}
      </div>
        </div>
    )
  }
}


class UserTimeInput extends Component {

    handleInput(e){
        this.setState({
                name:this.props.name,
                date:this.props.date,
                time:e.target.vaule
        })
    }

    render(){
        return (
            <input value={this.state.time} onChange={(e)=>{this.handleInput()}} name='time' type="time"/>
        )
    }
}



export default Day