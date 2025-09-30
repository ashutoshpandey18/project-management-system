import { gql } from '@apollo/client';
import * as queries from '../queries';

test('organizations query is defined correctly', () => {
  expect(queries.GET_ORGANIZATIONS_QUERY).toBeDefined();
  expect(typeof queries.GET_ORGANIZATIONS_QUERY).toBe('object');
  console.log("✓ Organizations query is properly defined!");
});

test('projects query is defined correctly', () => {
  expect(queries.GET_PROJECTS_QUERY).toBeDefined();
  expect(typeof queries.GET_PROJECTS_QUERY).toBe('object');
  console.log("✓ Projects query is properly defined!");
});

test('tasks query is defined correctly', () => {
  expect(queries.GET_TASKS_QUERY).toBeDefined();
  expect(typeof queries.GET_TASKS_QUERY).toBe('object');
  console.log("✓ Tasks query is properly defined!");
});