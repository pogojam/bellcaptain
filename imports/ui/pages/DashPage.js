import React, { Component } from 'react';
import Nav from "../components/nav";
import styled from '../../../node_modules/styled-components';
import ReactEcharts from 'echarts-for-react';
import {  graphql } from 'react-apollo'
import gql from '../../../node_modules/graphql-tag';

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

const Container = styled.div`
    display: grid;
    grid-template:'nav' 1fr 'content' 10fr;
    height: 100vh;
    width: 100vw;
`

class DashPage extends Component {

    render() {
        console.log('fire');
        return (
            <Container>
                <Nav history={this.props.history} />

                {!this.props.data.loading &&<Content {...this.props.data} />}
            </Container>
        );
    }
}


// const Content = ({user})=>{
//     console.log(user)


// return <StyledContent>
//     <ProfilePic/>
//     <Overview {...user} />
//     <Charts/>
//     </StyledContent>
// }
const StyledContent =  styled.div`
display:grid;
grid-template:  'pic overview overview' 20% 
                'charts charts charts'; 

`

class Content extends Component {
    render() {
        const {user}= this.props
        return (
            <StyledContent>
            <ProfilePic/>
            <Overview {...user} />

            </StyledContent>
        );
    }
}

const Overview = ({email,name})=>{
    const StyledOverview=styled.div`
    grid-area: overview;
    background: #5BC0BE;
    padding: 2em;
    display: grid;
    align-content: center;
    `
    return <StyledOverview>

        <p>email: {email}</p>
        <p>name:{name}</p>


    </StyledOverview>

}

const ProfilePic = ()=>{
    const Pic = styled.img`
    `
    const Container = styled.div`
    background:#FA7921;
    `
    

    return <Container style={{gridArea:'pic'}} >
        <Pic/>
    </Container>
}

const Charts = ()=>{
   
    return <div style={{gridArea:'charts'}} >
    <ReactEcharts option={chartOptions} />
    </div>
}


// Chart options


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






export default graphql(GetUser,{options:{fetchPolicy:'cache-and-network'}})(DashPage);