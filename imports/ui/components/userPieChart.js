import React, { Component,Fragment } from 'react';
import {  graphql } from 'react-apollo'
import gql from '../../../node_modules/graphql-tag';
import ReactEcharts from 'echarts-for-react';

const getShift = gql`
query Shifts {
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
            if(this.props.data.user === null){return null}
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

    let {AMshift,PMshift} = data


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
    
return   <ReactEcharts style={{ height:'500px' }}   option={chartOptions} theme={'captainTheme'} />
}    




export default graphql(getShift,{options:{fetchPolicy:'network-only'}})(UserPieChart)