export interface Organization {
  id: string;
  name: string;
  slug: string;
  contactEmail: string;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'ACTIVE' | 'COMPLETED' | 'ON_HOLD';
  dueDate?: string;
  createdAt: string;
  taskCount: number;
  completedTasks: number;
  completionRate: number;
  organization: Organization;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  assigneeEmail: string;
  dueDate?: string;
  createdAt: string;
  project: Project;
}

export interface TaskComment {
  id: string;
  content: string;
  authorEmail: string;
  createdAt: string;
  task: Task;
}