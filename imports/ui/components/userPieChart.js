import React, { Component,Fragment } from 'react';
import {  graphql } from 'react-apollo'
import gql from '../../../node_modules/graphql-tag';
import ReactEcharts from 'echarts-for-react';

const getShift = gql`{
    user{
        _id
      Totals{
        PMshift
        AMshift
      }
    }
  } 
`

class UserPieChart extends Component {
    render() {
        const {loading} = this.props.data

        return (
            <Fragment>
                {loading?null:<PieChart  data={this.props.data.user.Totals} />}
            </Fragment>
        );
    }
}



const PieChart = ({data}) => {
    
        if(data===null){
            return null
        }

    const {AMshift,PMshift} = data
    const chartOptions={
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
            }
        },
            {
                name:'Shift Totals',
                type:'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: true,
                label: {
                    normal: {
                        show: true,
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
                    {value:AMshift, name:`AM ${AMshift}`},
                    {value:PMshift, name:`PM ${PMshift}`}
                ]
            }
        ]
    }
    
return   <ReactEcharts option={chartOptions} theme={'captainTheme'} />
}    




export default graphql(getShift)(UserPieChart)