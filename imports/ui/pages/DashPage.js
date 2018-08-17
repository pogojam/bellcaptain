import React, { Component } from 'react';
import Nav from "../components/nav";
import styled from '../../../node_modules/styled-components';
import ReactEcharts from 'echarts-for-react';

const Container = styled.div`
    display: grid;
    grid-template:'nav' 1fr 'content' 10fr;
    height: 100vh;
    width: 100vw;
`

class DashPage extends Component {

    render() {
        return (
            <Container>
                <Nav/>
                <Content/>
            </Container>
        );
    }
}

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



const Content = ()=>{


    const StyledContent =  styled.div`
        display:grid;
`

const StyledChart =  styled.div`

`

return <StyledContent>
    <StyledChart id="CashChart"></StyledChart>
        <ReactEcharts option={chartOptions} />
</StyledContent>
}



export default DashPage;