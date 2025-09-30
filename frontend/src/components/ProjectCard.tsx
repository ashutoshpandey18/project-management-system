import React from 'react';
// import { Project } from '../types/index';


// Temporary interface - remove later
interface Project {
  id: string;
  name: string;
  description: string;
  status: 'ACTIVE' | 'COMPLETED' | 'ON_HOLD';
  dueDate?: string;
  createdAt: string;
  taskCount: number;
  completedTasks: number;
  completionRate: number;
  organization: {
    id: string;
    name: string;
    slug: string;
  };
}

interface ProjectCardProps {
  project: Project;
}

// ... rest of your code

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800';
      case 'COMPLETED': return 'bg-blue-100 text-blue-800';
      case 'ON_HOLD': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{project.name}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
          {project.status}
        </span>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm text-gray-500">
          <span>Total Tasks:</span>
          <span className="font-medium">{project.taskCount}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>Completed:</span>
          <span className="font-medium">{project.completedTasks}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>Completion:</span>
          <span className="font-medium">{project.completionRate}%</span>
        </div>
      </div>

      {project.dueDate && (
        <div className="text-sm text-gray-500 mb-4">
          Due: {new Date(project.dueDate).toLocaleDateString()}
        </div>
      )}

      <div className="flex space-x-2">
        <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-sm font-medium transition-colors">
          View Tasks
        </button>
        <button className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded text-sm font-medium transition-colors">
          Edit
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;