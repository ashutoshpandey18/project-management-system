import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PROJECTS, CREATE_PROJECT } from '../graphql/queries';
// import { Project } from '../types';
import ProjectCard from '../components/ProjectCard';
import ProjectForm from '../components/ProjectForm';

const ProjectDashboard: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState('tech-solutions');

  // REAL GraphQL Query - All projects or filtered by organization
  const { data, loading, error, refetch } = useQuery(GET_PROJECTS, {
    variables: { organizationSlug: selectedOrganization }
  });

  // REAL GraphQL Mutation
  const [createProject] = useMutation(CREATE_PROJECT, {
    onCompleted: () => {
      setShowForm(false);
      refetch(); // Refresh data after mutation
    },
    onError: (error) => {
      console.error('Error creating project:', error);
      alert('Error creating project: ' + error.message);
    }
  });

  // Debug log
  console.log('Projects data:', data?.projects);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      <span className="ml-3 text-gray-600">Loading projects...</span>
    </div>
  );

  if (error) return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <p className="text-red-800 font-medium">Error loading projects</p>
      <p className="text-red-700 text-sm mt-1">{error.message}</p>
      <button
        onClick={() => refetch()}
        className="mt-2 bg-red-600 text-white px-3 py-1 rounded text-sm"
      >
        Retry
      </button>
    </div>
  );

  const projects = data?.projects || [];

  const handleCreateProject = (projectData: {
    name: string;
    description: string;
    status: string;
    dueDate?: string;
  }) => {
    createProject({
      variables: {
        ...projectData,
        organizationSlug: selectedOrganization
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Projects</h2>
          <p className="text-gray-600">Real-time data from GraphQL backend</p>

          {/* Organization Selector */}
          <div className="mt-2">
            <label htmlFor="organization" className="text-sm font-medium text-gray-700 mr-2">
              Organization:
            </label>
            <select
              id="organization"
              value={selectedOrganization}
              onChange={(e) => setSelectedOrganization(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="tech-solutions">Tech Solutions Inc</option>
              <option value="acme-corp">Acme Corp</option>
              <option value="my-company">My Company</option>
            </select>
          </div>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
        >
          <span className="mr-2">+</span> New Project
        </button>
      </div>

      {showForm && (
        <ProjectForm
          onSubmit={handleCreateProject}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Projects Count */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-blue-800 font-medium">
          Showing {projects.length} projects for {selectedOrganization}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project: Project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
          <p className="text-gray-600 mb-4">
            Create your first project for <strong>{selectedOrganization}</strong>
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
          >
            Create First Project
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectDashboard;