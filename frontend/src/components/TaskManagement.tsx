import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_TASKS = gql`
  query GetTasks($projectId: ID!) {
    tasks(projectId: $projectId) {
      id
      title
      description
      status
      assigneeEmail
      dueDate
      createdAt
    }
  }
`;

const CREATE_TASK = gql`
  mutation CreateTask($projectId: ID!, $title: String!, $description: String, $status: String, $assigneeEmail: String, $dueDate: String) {
    createTask(projectId: $projectId, title: $title, description: $description, status: $status, assigneeEmail: $assigneeEmail, dueDate: $dueDate) {
      task {
        id
        title
        status
        assigneeEmail
      }
    }
  }
`;

const UPDATE_TASK_STATUS = gql`
  mutation UpdateTaskStatus($taskId: ID!, $status: String!) {
    updateTaskStatus(taskId: $taskId, status: $status) {
      task {
        id
        title
        status
      }
    }
  }
`;

interface TaskManagementProps {
  projectId: string;
  projectName: string;
  onClose: () => void;
}

const TaskManagement: React.FC<TaskManagementProps> = ({ projectId, projectName, onClose }) => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'TODO',
    assigneeEmail: '',
    dueDate: ''
  });

  const { data, loading, error, refetch } = useQuery(GET_TASKS, {
    variables: { projectId }
  });

  const [createTask] = useMutation(CREATE_TASK, {
    onCompleted: () => {
      setShowTaskForm(false);
      setNewTask({ title: '', description: '', status: 'TODO', assigneeEmail: '', dueDate: '' });
      refetch();
    }
  });

  const [updateTaskStatus] = useMutation(UPDATE_TASK_STATUS, {
    onCompleted: () => refetch()
  });

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    createTask({
      variables: {
        projectId,
        ...newTask
      }
    });
  };

  const handleStatusUpdate = (taskId: string, newStatus: string) => {
    updateTaskStatus({
      variables: {
        taskId,
        status: newStatus
      }
    });
  };

  const tasks = data?.tasks || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'TODO': return 'bg-gray-100 text-gray-800';
      case 'IN_PROGRESS': return 'bg-blue-100 text-blue-800';
      case 'DONE': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p>Loading tasks...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-md">
        <div className="text-red-600 text-center">
          <p className="font-semibold">Error loading tasks</p>
          <p className="text-sm mt-2">{error.message}</p>
          <button
            onClick={() => refetch()}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Task Management</h2>
              <p className="text-blue-100">{projectName}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-blue-200 text-2xl font-bold focus:outline-none"
              aria-label="Close task management"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {/* Add Task Button */}
          <div className="mb-6">
            <button
              onClick={() => setShowTaskForm(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium flex items-center focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Task
            </button>
          </div>

          {/* Task Form */}
          {showTaskForm && (
            <div className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Create New Task</h3>
              <form onSubmit={handleCreateTask} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Task Title *</label>
                  <input
                    type="text"
                    required
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter task title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={newTask.description}
                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter task description"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={newTask.status}
                      onChange={(e) => setNewTask({...newTask, status: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="TODO">To Do</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="DONE">Done</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Assignee Email</label>
                    <input
                      type="email"
                      value={newTask.assigneeEmail}
                      onChange={(e) => setNewTask({...newTask, assigneeEmail: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="assignee@example.com"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowTaskForm(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                  >
                    Create Task
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Tasks List */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Tasks ({tasks.length})</h3>

            {tasks.length === 0 ? (
              <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-gray-200">
                <svg className="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p>No tasks yet. Create your first task!</p>
              </div>
            ) : (
              tasks.map((task: any) => (
                <div key={task.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-900 text-lg">{task.title}</h4>
                    <select
                      value={task.status}
                      onChange={(e) => handleStatusUpdate(task.id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(task.status)} border-0 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                    >
                      <option value="TODO">To Do</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="DONE">Done</option>
                    </select>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{task.description || 'No description provided'}</p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Assignee: {task.assigneeEmail || 'Unassigned'}</span>
                    <span>Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManagement;