import React, { Component } from 'react';
import Portal from "../components/portal";
import styled from 'styled-components'
import withAuthentication from "../components/withAuthentication";

class Home extends Component {

    constructor(props) {
        super(props)
    }

    redirect(){
            this.props.history.push('/Dash')
    }
    render() {
        const {user} = this.props

        return (
            <div className='animated'>
                    {user?<Welcome/>:<Portal  logo='https://image.flaticon.com/icons/svg/87/87746.svg' redirect={this.redirect.bind(this)} />}
            </div>
        );
    }
}


const Welcome = ()=>(
    <Container>
    <h1>Welcome back</h1>
    </Container>
)

const Container = styled.div`
display:grid
`

export default withAuthentication()(Home);