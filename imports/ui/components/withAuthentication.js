import { graphql } from "react-apollo";
import React, { Component } from 'react';
import gql from 'graphql-tag'
import { withRouter } from "react-router";

const user = gql`
    {
        user{
            _id
        }
    }
`

const withAuthentication = (userRole)=>((Component)=>{
    
 class WithAuthentication extends Component {

    constructor(props) {
        super(props);
        
    }
    
            
        render() {
            return (
                <Component {...this.props} user={this.props.data.user} />
            );
        }
    }

    return graphql(user)(withRouter(WithAuthentication))
    
})


export default withAuthentication;