import { gql } from '@apollo/client';

export const GET_ORGANIZATIONS = gql`
  query GetOrganizations {
    organizations {
      id
      name
      slug
      contactEmail
      createdAt
    }
  }
`;

export const GET_PROJECTS = gql`
  query GetProjects($organizationSlug: String) {
    projects(organizationSlug: $organizationSlug) {
      id
      name
      description
      status
      dueDate
      createdAt
      taskCount
      completedTasks
      completionRate
      organization {
        id
        name
      }
    }
  }
`;

export const GET_PROJECT_BY_ID = gql`
  query GetProjectById($id: ID!) {
    projectById(id: $id) {
      id
      name
      description
      status
      dueDate
      createdAt
      taskCount
      completedTasks
      completionRate
      organization {
        id
        name
        contactEmail
      }
    }
  }
`;

export const GET_TASKS = gql`
  query GetTasks($projectId: ID) {
    tasks(projectId: $projectId) {
      id
      title
      description
      status
      assigneeEmail
      dueDate
      createdAt
      project {
        id
        name
      }
    }
  }
`;

export const GET_TASK_BY_ID = gql`
  query GetTaskById($id: ID!) {
    taskById(id: $id) {
      id
      title
      description
      status
      assigneeEmail
      dueDate
      createdAt
      project {
        id
        name
        organization {
          name
        }
      }
    }
  }
`;

export const GET_TASK_COMMENTS = gql`
  query GetTaskComments($taskId: ID!) {
    taskComments(taskId: $taskId) {
      id
      content
      authorEmail
      createdAt
      task {
        title
      }
    }
  }
`;

// MUTATIONS
export const CREATE_ORGANIZATION = gql`
  mutation CreateOrganization($name: String!, $slug: String!, $contactEmail: String!) {
    createOrganization(name: $name, slug: $slug, contactEmail: $contactEmail) {
      organization {
        id
        name
        slug
        contactEmail
      }
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation CreateProject($organizationSlug: String!, $name: String!, $description: String, $status: String, $dueDate: String) {
    createProject(organizationSlug: $organizationSlug, name: $name, description: $description, status: $status, dueDate: $dueDate) {
      project {
        id
        name
        description
        status
        dueDate
        taskCount
        completionRate
      }
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation UpdateProject($projectId: ID!, $name: String, $description: String, $status: String, $dueDate: String) {
    updateProject(projectId: $projectId, name: $name, description: $description, status: $status, dueDate: $dueDate) {
      project {
        id
        name
        description
        status
        dueDate
        taskCount
        completionRate
      }
    }
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask($projectId: ID!, $title: String!, $description: String, $status: String, $assigneeEmail: String, $dueDate: String) {
    createTask(projectId: $projectId, title: $title, description: $description, status: $status, assigneeEmail: $assigneeEmail, dueDate: $dueDate) {
      task {
        id
        title
        description
        status
        assigneeEmail
        dueDate
      }
    }
  }
`;

export const UPDATE_TASK_STATUS = gql`
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

export const ADD_TASK_COMMENT = gql`
  mutation AddTaskComment($taskId: ID!, $content: String!, $authorEmail: String!) {
    addTaskComment(taskId: $taskId, content: $content, authorEmail: $authorEmail) {
      comment {
        id
        content
        authorEmail
        createdAt
      }
    }
  }
`;