import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { ApolloLink, from } from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import App from "../../ui/App";
import { BrowserRouter } from "react-router-dom";

// http link
const httpLink = new HttpLink({ uri: Meteor.absoluteUrl("graphql") });

// Auth Link
const authLink = new ApolloLink((operation, forward) => {
  const token = Accounts._storedLoginToken();

  operation.setContext(() => ({
    headers: {
      "meteor-login-token": token
    }
  }));
  return forward(operation);
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache
});

Meteor.startup(() => {
  render(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>,
    document.getElementById("App")
  );
});
