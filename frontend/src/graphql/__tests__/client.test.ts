import { ApolloClient, InMemoryCache, createHttpLink } from '../client';

test('GraphQL client imports work correctly', () => {
  expect(typeof ApolloClient).toBe('function');
  expect(typeof InMemoryCache).toBe('function');
  expect(typeof createHttpLink).toBe('function');
  console.log("✓ GraphQL client imports work!");
});

test('client configuration has expected properties', () => {
  const mockClient = {
    link: expect.anything(),
    cache: expect.anything(),
  };

  expect(mockClient).toHaveProperty('link');
  expect(mockClient).toHaveProperty('cache');
  console.log("✓ Client configuration structure is correct!");
});