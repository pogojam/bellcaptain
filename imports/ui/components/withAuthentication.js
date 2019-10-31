import { graphql } from "react-apollo";
import React, { Component } from "react";
import gql from "graphql-tag";
import { withRouter, Redirect } from "react-router";

const user = gql`
  {
    user {
      _id
      name
      email
      phone
    }
  }
`;

const withAuthentication = userRole => Component => {
  class WithAuthentication extends Component {
    render() {
      const { data, loading, location } = this.props;
      const isLoggedIn = data.user ? true : false;

      if (loading) {
        return (
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        );
      }

      if (isLoggedIn) {
        return <Component {...this.props} {...data} />;
      } else {
        if (location.pathname === "/") {
          return <Component {...this.props} {...data} />;
        }
        return <Redirect to="/" />;
      }
    }
  }

  return graphql(user, { options: { fetchPolicy: "network-only" } })(
    withRouter(WithAuthentication)
  );
};

export default withAuthentication;
