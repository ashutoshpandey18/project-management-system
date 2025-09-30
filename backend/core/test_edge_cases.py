"""
GRAPHQL MUTATIONS TESTS - Test GraphQL mutations with exact schema matching
"""
from django.test import TestCase
from graphene.test import Client
from core.schema import schema
from core.models import Organization, Project, Task, TaskComment
from django.utils import timezone

class TestGraphQLMutations(TestCase):
    """Test GraphQL mutation operations"""

    def setUp(self):
        """Set up test data"""
        self.client = Client(schema)
        self.organization = Organization.objects.create(
            name="Existing Organization",
            slug="existing-org",
            contact_email="existing@org.com"
        )
        print("✓ Test data setup complete!")

    def test_create_organization_mutation(self):
        """Test creating a new organization"""
        mutation = '''
            mutation CreateOrganization($slug: String!, $name: String!, $contactEmail: String!) {
                createOrganization(slug: $slug, name: $name, contactEmail: $contactEmail) {
                    organization {
                        id
                        name
                        slug
                        contactEmail
                    }
                }
            }
        '''

        variables = {
            'slug': 'new-test-org',
            'name': 'New Test Organization',
            'contactEmail': 'new@organization.com'
        }
        result = self.client.execute(mutation, variables=variables)

        self.assertNotIn('errors', result)
        self.assertEqual(result['data']['createOrganization']['organization']['name'], 'New Test Organization')
        self.assertEqual(result['data']['createOrganization']['organization']['slug'], 'new-test-org')
        self.assertEqual(result['data']['createOrganization']['organization']['contactEmail'], 'new@organization.com')
        print("✓ Create organization mutation works!")

    def test_create_project_mutation(self):
        """Test creating a new project"""
        mutation = '''
            mutation CreateProject($name: String!, $description: String!, $organizationSlug: String!) {
                createProject(name: $name, description: $description, organizationSlug: $organizationSlug) {
                    project {
                        id
                        name
                        description
                        organization {
                            name
                        }
                    }
                }
            }
        '''

        variables = {
            'name': 'New Test Project',
            'description': 'Project description',
            'organizationSlug': self.organization.slug
        }
        result = self.client.execute(mutation, variables=variables)

        self.assertNotIn('errors', result)
        self.assertEqual(result['data']['createProject']['project']['name'], 'New Test Project')
        self.assertEqual(result['data']['createProject']['project']['description'], 'Project description')
        self.assertEqual(result['data']['createProject']['project']['organization']['name'], 'Existing Organization')
        print("✓ Create project mutation works!")

    def test_create_task_mutation(self):
        """Test creating a new task"""
        project = Project.objects.create(
            name="Test Project",
            description="Project description",
            organization=self.organization
        )

        mutation = '''
            mutation CreateTask($title: String!, $description: String!, $projectId: ID!) {
                createTask(title: $title, description: $description, projectId: $projectId) {
                    task {
                        id
                        title
                        description
                        project {
                            name
                        }
                    }
                }
            }
        '''

        variables = {
            'title': 'New Test Task',
            'description': 'Test task description',
            'projectId': str(project.id)
        }
        result = self.client.execute(mutation, variables=variables)

        self.assertNotIn('errors', result)
        self.assertEqual(result['data']['createTask']['task']['title'], 'New Test Task')
        self.assertEqual(result['data']['createTask']['task']['description'], 'Test task description')
        print("✓ Create task mutation works!")

    def test_update_task_status_mutation(self):
        """Test updating task status with string type"""
        project = Project.objects.create(
            name="Test Project",
            organization=self.organization
        )
        task = Task.objects.create(
            title="Test Task",
            project=project,
            status="TODO"
        )

        mutation = '''
            mutation UpdateTaskStatus($taskId: ID!, $status: String!) {
                updateTaskStatus(taskId: $taskId, status: $status) {
                    task {
                        id
                        title
                        status
                    }
                }
            }
        '''

        variables = {
            'taskId': str(task.id),
            'status': 'IN_PROGRESS'  # Pass as string, not enum
        }
        result = self.client.execute(mutation, variables=variables)

        self.assertNotIn('errors', result)
        self.assertEqual(result['data']['updateTaskStatus']['task']['status'], 'IN_PROGRESS')
        print("✓ Update task status mutation works!")

    def test_update_task_status_to_done(self):
        """Test updating task status to DONE"""
        project = Project.objects.create(
            name="Test Project",
            organization=self.organization
        )
        task = Task.objects.create(
            title="Test Task",
            project=project,
            status="IN_PROGRESS"
        )

        mutation = '''
            mutation UpdateTaskStatus($taskId: ID!, $status: String!) {
                updateTaskStatus(taskId: $taskId, status: $status) {
                    task {
                        id
                        title
                        status
                    }
                }
            }
        '''

        variables = {
            'taskId': str(task.id),
            'status': 'DONE'  # Pass as string, not enum
        }
        result = self.client.execute(mutation, variables=variables)

        self.assertNotIn('errors', result)
        self.assertEqual(result['data']['updateTaskStatus']['task']['status'], 'DONE')
        print("✓ Update task status to DONE works!")

    def test_add_task_comment_mutation(self):
        """Test adding a task comment with correct return field"""
        project = Project.objects.create(
            name="Test Project",
            organization=self.organization
        )
        task = Task.objects.create(
            title="Test Task",
            project=project
        )

        mutation = '''
            mutation AddTaskComment($taskId: ID!, $content: String!, $authorEmail: String!) {
                addTaskComment(taskId: $taskId, content: $content, authorEmail: $authorEmail) {
                    comment {
                        id
                        content
                        authorEmail
                        task {
                            title
                        }
                    }
                }
            }
        '''

        variables = {
            'taskId': str(task.id),
            'content': 'This is a test comment',
            'authorEmail': 'commenter@test.com'
        }
        result = self.client.execute(mutation, variables=variables)

        self.assertNotIn('errors', result)
        self.assertEqual(result['data']['addTaskComment']['comment']['content'], 'This is a test comment')
        self.assertEqual(result['data']['addTaskComment']['comment']['authorEmail'], 'commenter@test.com')
        print("✓ Add task comment mutation works!")