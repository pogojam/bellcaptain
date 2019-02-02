import React, { Component } from 'react';
import Week from '../components/schedule/week'
import withAuthentication from '../components/withAuthentication'

class SchedulePage extends Component {
    render() {
        return (
            <div style={{ display:'grid' }} >
                <h2 style={{     justifySelf: 'center' }}  >Comming Soon</h2>
            </div>
        );
    }
}

export default withAuthentication()(SchedulePage);