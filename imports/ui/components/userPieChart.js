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
        const {loading,AMshift,PMshift} = this.props.data
        const totalShifts = AMshift+PMshift
        return (
            <Fragment>
                {loading?null:<PieChart AMshift={AMshift} PMshift={PMshift} totalShifts={totalShifts} />}            
            </Fragment>
        );
    }
}



const PieChart = ({AMshift,PMshift,totalShifts}) => {

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
            },
            data:[
                {value:totalShifts, name:`Total $${totalShifts}`},
            ]
        },
            {
                name:'Shift Totals',
                type:'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: true,
                label: {
                    normal: {
                        show: false,
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
                    {value:AMshift, name:`AM $${AMshift}`},
                    {value:PMshift, name:`PM $${PMshift}`}
                ]
            }
        ]
    }
    
return   <ReactEcharts option={chartOptions} theme={'captainTheme'} />
}    




export default graphql(getShift)(UserPieChart)