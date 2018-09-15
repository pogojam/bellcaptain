import React, { Component,Fragment } from 'react';
import {  graphql } from 'react-apollo'
import gql from '../../../node_modules/graphql-tag';
import styled from 'styled-components'

const getTotals = gql`{
    user{
        _id
      Totals{
        LifeTotalDrop
        LifeTotalCashBack
      }
    }
  } 
`



class Totals extends Component {
    render() {
        const {type} = this.props
        const {loading} = this.props.data

        return (
            <Fragment>
                {loading?null:<Content type={type} values={this.props.data.user} />}
            </Fragment>
        );
    }
}

const Content = (props) => {

    

   const value = props.values.Totals.LifeTotalDrop;

        return <Wrapper>
    <h2>${value}</h2>
<p>{props.type}</p>
</Wrapper>
}

const Wrapper = styled.div`
        color:aquamarine;
        padding:1em;
`

export default graphql(getTotals)(Totals);