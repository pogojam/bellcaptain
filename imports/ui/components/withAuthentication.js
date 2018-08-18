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
                <Component {...this.props} {...this.props.data} />
            );
        }
    }

    return graphql(user,{options:{fetchPolicy:'network-only'}})(withRouter(WithAuthentication))
    
})


export default withAuthentication;