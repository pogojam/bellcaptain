import React, { Component } from 'react';
import { graphql } from "react-apollo";
import gql from "graphql-tag";

const getUser = gql`
    {
        hi
    }
`

class Portal extends Component {
    render() {
        console.log(this.props);
        return (
            <div>
                jio
            </div>
        );
    }
}

export default graphql(getUser)(Portal);