import React from 'react';
import { render, screen } from '@testing-library/react';
import ProjectCard from '../ProjectCard';

const mockProject = {
  id: '1',
  name: 'Test Project',
  description: 'This is a test project description',
  status: 'active',
  dueDate: '2024-12-31',
  organization: {
    name: 'Test Organization'
  }
};

test('renders project card with project information', () => {
  render(<ProjectCard project={mockProject} />);

  // Check if project name is displayed
  const projectName = screen.getByText('Test Project');
  expect(projectName).toBeInTheDocument();

  // Check if project description is displayed
  const projectDescription = screen.getByText('This is a test project description');
  expect(projectDescription).toBeInTheDocument();

  // Check if organization name is displayed
  const orgName = screen.getByText('Test Organization');
  expect(orgName).toBeInTheDocument();

  console.log("✓ ProjectCard renders correctly!");
});

test('renders different project data correctly', () => {
  const differentProject = {
    id: '2',
    name: 'Another Project',
    description: 'Different description',
    status: 'completed',
    dueDate: '2024-11-30',
    organization: {
      name: 'Different Org'
    }
  };

  render(<ProjectCard project={differentProject} />);

  expect(screen.getByText('Another Project')).toBeInTheDocument();
  expect(screen.getByText('Different description')).toBeInTheDocument();
  expect(screen.getByText('Different Org')).toBeInTheDocument();

  console.log("✓ ProjectCard handles different data correctly!");
});