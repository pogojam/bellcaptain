import React, { Component ,Fragment } from 'react'
import { compose, graphql } from 'react-apollo'
import gql from '../../../../node_modules/graphql-tag';
import Day from './day'

const getUsers = gql`
        {
  users{
    name
  }
}
`

const daysOfWeek  = ['Monday','Tuesday','Wednesday','Thurday','Friday']


today = new Date().getDay
const GetWeek = ()=>{
}

console.log(today)

 class Week extends Component {
  render() {
    const {users} = this.props.data
    return (
        <Fragment>
      {
          daysOfWeek.map((day,id)=>{
          return  <Day date={day} key={id} names={users} />
          })
      }
        </Fragment>
    )
  }
}

export default graphql(getUsers)(Week)