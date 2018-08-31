import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import {  graphql } from 'react-apollo'
import gql from '../../../node_modules/graphql-tag';


const query = gql`
        query userDrops($limit:Int){
            userDrops(limit:$limit){
                cashBack
                date
                name
            }
        }
`
// Components

class UserChart extends Component {
    componentDidMount(){
       
    }
    render() {
        return (
            <ReactEcharts option={chartOptions} />
        );
    }
}

// Chart Options

const chartOptions = {
    series : [
        {
            name: 'Reference Page',
            type: 'pie',
            radius: '55%',
            data:[
                {value:400, name:'Searching Engine'},
                {value:335, name:'Direct'},
                {value:310, name:'Email'},
                {value:274, name:'Alliance Advertisement'},
                {value:235, name:'Video Advertisement'}
            ]
        }
    ]
}



export default graphql(query,{options:({limit})=>{
    console.log(limit);
    return {variables:{limit:limit}}
}})(UserChart)