import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectForm from '../ProjectForm';

// Mock Apollo Client
jest.mock('@apollo/client', () => ({
  useMutation: () => [jest.fn(), { loading: false, error: null }],
}));

test('renders project form with all fields', () => {
  render(<ProjectForm />);

  // Check if form fields are present
  expect(screen.getByLabelText(/project name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /create/i })).toBeInTheDocument();

  console.log("✓ ProjectForm renders all fields!");
});

test('allows user to input project name', async () => {
  const user = userEvent.setup();
  render(<ProjectForm />);

  const nameInput = screen.getByLabelText(/project name/i);
  await user.type(nameInput, 'My New Project');

  expect(nameInput).toHaveValue('My New Project');
  console.log("✓ ProjectForm allows user input!");
});