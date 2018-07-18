import React, { Component } from 'react';
import Portal from "../components/portal";

class Home extends Component {
    render() {
        console.log(this.props);
        return (
            <div>
                    <Portal/>
            </div>
        );
    }
}

export default Home;