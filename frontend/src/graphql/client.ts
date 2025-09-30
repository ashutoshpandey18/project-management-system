// import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core';
// import { provideApolloClient } from '@apollo/client/composable';

// const httpLink = createHttpLink({
//   uri: 'http://localhost:8000/graphql/',
// });

// export const client = new ApolloClient({
//   link: httpLink,
//   cache: new InMemoryCache(),
// });

// export const apolloProvider = provideApolloClient(client);




// kro use


import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://localhost:8000/graphql/',
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});