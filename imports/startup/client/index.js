import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import App from "../../ui/App";
import { BrowserRouter } from "react-router-dom";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import {ApolloLink,from} from 'apollo-link'



const authLink = new ApolloLink((operation,forward) =>{
  const token = Accounts._storedLoginToken
  operation.setContext((prevContext)=>({
    header:{
      "meteor-login-token":token
    }
  }))
  return forward(operation)
})


const httpLink = new HttpLink({
  uri: Meteor.absoluteUrl("graphql")
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: from([authLink,httpLink]),
  cache
});


const InitApp = () => {
  return (
    <ApolloProvider client={client} >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  );
};

Meteor.startup(() => {
  render(<InitApp />, document.getElementById("App"));
});
