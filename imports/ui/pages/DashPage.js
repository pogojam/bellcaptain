import React, { Component,Fragment } from 'react';
import Nav from "../components/nav";
import styled from '../../../node_modules/styled-components';
import ReactEcharts from 'echarts-for-react';
import {  graphql } from 'react-apollo'
import Chart from "../components/userChart";
import gql from '../../../node_modules/graphql-tag';

// GraphQL Calls 

const GetUser = gql`
    {
        user{
            _id
            email
            name
            phone
        }
    }
`


// Page Comonent

class DashPage extends Component {

    render() {
        return (
            <Fragment>
                {!this.props.data.loading &&<Content {...this.props.data} />}
            </Fragment>
        );
    }
}

class Content extends Component {
    render() {
        const {user}= this.props
        return (
            <StyledContent>
            <Overview {...user} />
            <Charts/>
            </StyledContent>
        );
    }
}


// Main Content

const Overview = ({email,name})=>{
    
    return <StyledOverview>
       <Pic/>
       <div>
        <h2 >Profile</h2> 
        <li>email  {email}</li>
        <li>name  {name}</li>
       </div>
    </StyledOverview>

}


// Charts

const Charts = ()=>{
   
    return <div  >
    <Chart limit={3} />
    </div>
}




// Styles


const StyledContent =  styled.div`
        display:grid;
        height:100%;
        grid-template-columns:1fr 3fr;
`


const StyledOverview=styled.div`
    background-color:#0cebeb;
    display: grid;
    grid-template-rows: 2fr repeat(7,1fr);
    border-top-right-radius: 16px;
    margin-top: 10px;
    grid-gap:10px;
    ul{
        padding-left:10px;
    }
    
    &>*{
        background-color:grey;
        list-style:none;
    }
}


    `


const Pic = styled.img`
background-color:antiquewhite;
    `



export default graphql(GetUser,{options:{fetchPolicy:'cache-and-network'}})(DashPage);