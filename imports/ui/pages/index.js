import React, { Component } from 'react';
import Portal from "../components/portal";
import styled from 'styled-components'


class Home extends Component {

    constructor(props) {
        super(props)
    }

    redirect(){
            this.props.history.push('/Cash')
    }
    render() {
        return (
            <div className='animated'>
                    <Portal  logo='https://image.flaticon.com/icons/svg/87/87746.svg' redirect={this.redirect.bind(this)} />
            </div>
        );
    }
}

export default Home;