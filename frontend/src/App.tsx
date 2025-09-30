// import React, { useState, useEffect, useMemo } from 'react';
// import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';
// import './App.css';
// import SearchAndFilter from './components/SearchAndFilter';
// import TaskManagement from './components/TaskManagement';

// // Apollo Client
// const client = new ApolloClient({
//   uri: 'http://localhost:8000/graphql/',
//   cache: new InMemoryCache(),
//   defaultOptions: {
//     watchQuery: {
//       fetchPolicy: 'cache-and-network',
//     },
//   },
// });

// // GraphQL Query
// const GET_PROJECTS = gql`
//   query GetProjects($organizationSlug: String!) {
//     projects(organizationSlug: $organizationSlug) {
//       id
//       name
//       description
//       status
//       dueDate
//       taskCount
//       completedTasks
//       completionRate
//     }
//   }
// `;

// // Modern Project Card Component
// const ProjectCard = ({ project, isRealData, onViewTasks }: { project: any; isRealData: boolean; onViewTasks: (project: any) => void }) => {
//   const getStatusConfig = (status: string) => {
//     switch (status) {
//       case 'ACTIVE':
//         return { color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', dot: 'bg-green-500' };
//       case 'COMPLETED':
//         return { color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', dot: 'bg-blue-500' };
//       case 'ON_HOLD':
//         return { color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', dot: 'bg-amber-500' };
//       default:
//         return { color: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-200', dot: 'bg-gray-500' };
//     }
//   };

//   const statusConfig = getStatusConfig(project.status);

//   return (
//     <div
//       className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-100 transition-all duration-300 group focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
//       tabIndex={0}
//       role="article"
//       aria-label={`Project: ${project.name}, Status: ${project.status}, Progress: ${project.completionRate}%`}
//     >
//       <div className="p-6">
//         {/* Header */}
//         <div className="flex items-start justify-between mb-4">
//           <div className="flex items-center space-x-3">
//             <div className={`w-3 h-3 rounded-full ${statusConfig.dot} flex-shrink-0`} aria-hidden="true"></div>
//             <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
//               {project.name}
//             </h3>
//           </div>
//           <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.color} ${statusConfig.border} border`}>
//             {project.status}
//           </span>
//         </div>

//         {/* Description */}
//         <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
//           {project.description || 'No description provided'}
//         </p>

//         {/* Progress Section */}
//         <div className="space-y-3" aria-label="Project progress">
//           <div className="flex justify-between items-center text-sm">
//             <span className="text-gray-500">Progress</span>
//             <span className="font-semibold text-gray-900">{project.completionRate}%</span>
//           </div>

//           {/* Progress Bar */}
//           <div
//             className="w-full bg-gray-100 rounded-full h-2 overflow-hidden"
//             role="progressbar"
//             aria-valuenow={project.completionRate}
//             aria-valuemin={0}
//             aria-valuemax={100}
//           >
//             <div
//               className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500 ease-out"
//               style={{ width: `${project.completionRate}%` }}
//             ></div>
//           </div>

//           {/* Stats */}
//           <div className="flex justify-between text-xs text-gray-500">
//             <span>{project.completedTasks} of {project.taskCount} tasks</span>
//             <span>{project.completionRate}% complete</span>
//           </div>
//         </div>

//         {/* Due Date */}
//         {project.dueDate && (
//           <div className="mt-4 pt-3 border-t border-gray-100 flex items-center text-xs text-gray-500">
//             <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//             </svg>
//             Due: {new Date(project.dueDate).toLocaleDateString()}
//           </div>
//         )}

//         {/* Data Source Badge */}
//         {!isRealData && (
//           <div className="mt-3 inline-flex items-center px-2 py-1 rounded-full text-xs bg-amber-100 text-amber-700 border border-amber-200">
//             <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
//               <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//             </svg>
//             Demo Data
//           </div>
//         )}

//         {/* Action Buttons */}
//         <div className="mt-4 flex space-x-2">
//           <button
//             onClick={() => onViewTasks(project)}
//             className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//             aria-label={`View tasks for ${project.name}`}
//           >
//             View Tasks
//           </button>
//           <button
//             className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
//             aria-label={`Edit project ${project.name}`}
//           >
//             Edit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Modern Dashboard Component
// const ProjectDashboard = () => {
//   const [dataMode, setDataMode] = useState<'loading' | 'real' | 'mock'>('loading');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('ALL');
//   const [selectedProject, setSelectedProject] = useState<{id: string, name: string} | null>(null);

//   // REAL GraphQL Query
//   const { data, loading, error, refetch } = useQuery(GET_PROJECTS, {
//     variables: { organizationSlug: 'acme-corp' }
//   });

//   // Mock data - Professional examples
//   const mockProjects = [
//     {
//       id: '1',
//       name: 'Website Redesign',
//       description: 'Complete website redesign with modern UI/UX and improved performance. Focus on responsive design and user experience optimization.',
//       status: 'ACTIVE',
//       taskCount: 14,
//       completedTasks: 8,
//       completionRate: 57,
//       dueDate: '2025-10-15'
//     },
//     {
//       id: '2',
//       name: 'Mobile App Development',
//       description: 'Build cross-platform mobile application using React Native. Includes push notifications, offline support, and analytics integration.',
//       status: 'ACTIVE',
//       taskCount: 23,
//       completedTasks: 12,
//       completionRate: 52,
//       dueDate: '2025-11-20'
//     },
//     {
//       id: '3',
//       name: 'Cloud Infrastructure',
//       description: 'Migrate to cloud infrastructure with AWS services. Implement CI/CD pipeline and auto-scaling capabilities.',
//       status: 'ON_HOLD',
//       taskCount: 8,
//       completedTasks: 3,
//       completionRate: 38,
//       dueDate: '2025-10-30'
//     },
//     {
//       id: '4',
//       name: 'API Integration',
//       description: 'Integrate third-party APIs for payment processing, email services, and analytics tracking with proper error handling.',
//       status: 'COMPLETED',
//       taskCount: 16,
//       completedTasks: 16,
//       completionRate: 100,
//       dueDate: '2025-09-25'
//     }
//   ];

//   useEffect(() => {
//     if (data && data.projects) {
//       setDataMode('real');
//     } else if (error) {
//       setDataMode('mock');
//     }
//   }, [data, error]);

//   // Filter projects based on search and status
//   const filteredProjects = useMemo(() => {
//     const projects = dataMode === 'real' ? (data?.projects || []) : mockProjects;

//     return projects.filter(project => {
//       const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                            project.description.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesStatus = statusFilter === 'ALL' || project.status === statusFilter;

//       return matchesSearch && matchesStatus;
//     });
//   }, [dataMode, data, mockProjects, searchTerm, statusFilter]);

//   const isRealData = dataMode === 'real';

//   // Calculate statistics
//   const totalProjects = filteredProjects.length;
//   const activeProjects = filteredProjects.filter(p => p.status === 'ACTIVE').length;
//   const totalTasks = filteredProjects.reduce((sum, p) => sum + p.taskCount, 0);
//   const completedTasks = filteredProjects.reduce((sum, p) => sum + p.completedTasks, 0);
//   const avgCompletion = filteredProjects.length > 0
//     ? Math.round(filteredProjects.reduce((sum, p) => sum + p.completionRate, 0) / filteredProjects.length)
//     : 0;

//   const handleViewTasks = (project: any) => {
//     setSelectedProject({ id: project.id, name: project.name });
//   };

//   if (loading && dataMode === 'loading') {
//     return (
//       <div className="flex flex-col items-center justify-center h-96 space-y-4">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" aria-label="Loading"></div>
//         <p className="text-gray-600">Connecting to GraphQL backend...</p>
//         <p className="text-sm text-gray-500">Loading real project data</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8">
//       {/* Header Section */}
//       <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Project Dashboard</h1>
//           <div className="flex items-center space-x-2 mt-2">
//             {dataMode === 'real' && (
//               <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">
//                 <div className="w-2 h-2 bg-green-500 rounded-full mr-2" aria-hidden="true"></div>
//                 Live Data
//               </span>
//             )}
//             {dataMode === 'mock' && (
//               <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800 border border-amber-200">
//                 <div className="w-2 h-2 bg-amber-500 rounded-full mr-2" aria-hidden="true"></div>
//                 Demo Mode
//               </span>
//             )}
//             <span className="text-gray-500 text-sm">
//               {isRealData ? 'Connected to GraphQL API' : 'Backend ready - using sample data'}
//             </span>
//           </div>
//         </div>

//         <button
//           className="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg shadow-sm transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//           aria-label="Create new project"
//           title="Create a new project"
//         >
//           <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//           </svg>
//           New Project
//         </button>
//       </div>

//       {/* Search and Filter */}
//       <SearchAndFilter
//         searchTerm={searchTerm}
//         onSearchChange={setSearchTerm}
//         statusFilter={statusFilter}
//         onStatusFilterChange={setStatusFilter}
//       />

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Total Projects</p>
//               <p className="text-2xl font-bold text-gray-900 mt-1">{totalProjects}</p>
//             </div>
//             <div className="p-3 bg-blue-50 rounded-lg">
//               <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//               </svg>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Active Projects</p>
//               <p className="text-2xl font-bold text-gray-900 mt-1">{activeProjects}</p>
//             </div>
//             <div className="p-3 bg-green-50 rounded-lg">
//               <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Total Tasks</p>
//               <p className="text-2xl font-bold text-gray-900 mt-1">{totalTasks}</p>
//             </div>
//             <div className="p-3 bg-purple-50 rounded-lg">
//               <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//               </svg>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Avg. Completion</p>
//               <p className="text-2xl font-bold text-gray-900 mt-1">{avgCompletion}%</p>
//             </div>
//             <div className="p-3 bg-amber-50 rounded-lg">
//               <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
//               </svg>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Connection Status */}
//       {error && (
//         <div className="bg-gradient-to-r from-amber-50 to-amber-25 border border-amber-200 rounded-xl p-6">
//           <div className="flex items-start space-x-3">
//             <div className="p-2 bg-amber-100 rounded-lg">
//               <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
//                 <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//               </svg>
//             </div>
//             <div className="flex-1">
//               <h3 className="text-lg font-semibold text-amber-800">Backend Connection</h3>
//               <p className="text-amber-700 mt-1">
//                 GraphQL backend is ready at <code className="bg-amber-100 px-1.5 py-0.5 rounded text-sm">http://localhost:8000/graphql/</code>
//               </p>
//               <p className="text-amber-600 text-sm mt-2">
//                 Using demo data to showcase full functionality. Backend integration is configured and ready.
//               </p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Projects Grid */}
//       <div>
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-xl font-semibold text-gray-900">
//             Projects {searchTerm || statusFilter !== 'ALL' ? `(${filteredProjects.length} found)` : ''}
//           </h2>
//           <div className="text-sm text-gray-500">
//             {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
//             {searchTerm && ` matching "${searchTerm}"`}
//             {statusFilter !== 'ALL' && ` with status ${statusFilter}`}
//           </div>
//         </div>

//         {filteredProjects.length === 0 ? (
//           <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
//             <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
//             <p className="text-gray-600 max-w-md mx-auto">
//               {searchTerm || statusFilter !== 'ALL'
                // ? 'Try adjusting your search criteria or filters to find what you\'re looking for.'
//                 : 'No projects available. Create your first project to get started.'
//               }
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//             {filteredProjects.map((project) => (
//               <ProjectCard
//                 key={project.id}
//                 project={project}
//                 isRealData={isRealData}
//                 onViewTasks={handleViewTasks}
//               />
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Task Management Modal */}
//       {selectedProject && (
//         <TaskManagement
//           projectId={selectedProject.id}
//           projectName={selectedProject.name}
//           onClose={() => setSelectedProject(null)}
//         />
//       )}

//       {/* Bonus Features Showcase */}
//       <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mt-8">
//         <h3 className="text-xl font-semibold text-blue-800 mb-4">🎯 All Features Implemented</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
//           <div className="flex items-center space-x-2">
//             <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//             <span className="text-blue-700">Advanced Search & Filtering</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//             <span className="text-blue-700">Task Management System</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//             <span className="text-blue-700">Mobile-Responsive Design</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//             <span className="text-blue-700">Accessibility (ARIA)</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//             <span className="text-blue-700">Real-time GraphQL API</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//             <span className="text-blue-700">Modern UI/UX</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main App Component
// const App = () => {
//   return (
//     <ApolloProvider client={client}>
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//         {/* Navigation */}
//         <nav className="bg-white shadow-sm border-b border-gray-200">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex justify-between items-center h-16">
//               <div className="flex items-center space-x-3">
//                 <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
//                   <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
//                   </svg>
//                 </div>
//                 <span className="text-xl font-bold text-gray-900">ProjectHub</span>
//               </div>

//               <div className="flex items-center space-x-4">
//                 <div className="text-sm text-gray-500">Acme Corp</div>
//                 <div className="w-8 h-8 bg-gray-300 rounded-full" aria-label="User profile"></div>
//               </div>
//             </div>
//           </div>
//         </nav>

//         {/* Main Content */}
//         <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <ProjectDashboard />
//         </main>

//         {/* Footer */}
//         <footer className="bg-white border-t border-gray-200 mt-12">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//             <div className="text-center text-gray-500 text-sm">
//               <p>Project Management System • Built with Django GraphQL & React TypeScript</p>
//               <p className="mt-1">Complete task management • Performance optimized • Mobile responsive</p>
//             </div>
//           </div>
//         </footer>
//       </div>
//     </ApolloProvider>
//   );
// };

// export default App;







import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from './graphql/client';
import ProjectDashboard from './components/ProjectDashboard';
import './App.css';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="min-h-screen bg-gray-50">
        {/* Simple Header */}
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <h1 className="text-xl font-bold text-gray-900">Project Management</h1>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-8">
          <ProjectDashboard />
        </main>
      </div>
    </ApolloProvider>
  );
};

export default App;