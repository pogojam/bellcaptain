import { graphql } from "react-apollo";
import React, { Component } from "react";
import gql from "graphql-tag";
import { withRouter, Redirect } from "react-router";

const user = gql`
  {
    user {
      _id
    }
  }
`;

const withAuthentication = userRole => Component => {
  class WithAuthentication extends Component {
    render() {
      const { data, loading ,location } = this.props;
      const isLoggedIn = data.user;

      
      

          if (loading) {
              return <div className="lds-ripple"><div></div><div></div></div>
          }
         
          if (isLoggedIn) {
              console.log("user is",isLoggedIn);
              
              return <Component {...this.props} {...data} />
          }
          else{
                console.log(location);
                
        if(location.pathname === '/'){return <Component {...this.props} {...data} />}
        return <Redirect to='/' />
          }
      
    }
  }

  return graphql(user, { options: { fetchPolicy: "network-only" } })(
    withRouter(WithAuthentication)
  );
};

export default withAuthentication;
