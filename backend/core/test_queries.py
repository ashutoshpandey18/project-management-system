"""
GRAPHQL QUERY TESTS - Test GraphQL queries with correct field names
"""
from django.test import TestCase
from graphene.test import Client
from core.schema import schema
from core.models import Organization, Project, Task, TaskComment

class TestGraphQLQueries(TestCase):
    """Test GraphQL query operations"""

    def setUp(self):
        """Set up test data"""
        self.client = Client(schema)
        self.organization = Organization.objects.create(
            name='Test Organization',
            slug='test-org',
            contact_email='test@org.com'
        )
        self.project = Project.objects.create(
            name='Test Project',
            description='Project description',
            organization=self.organization
        )
        self.task = Task.objects.create(
            title='Test Task',
            description='Task description',
            project=self.project
        )
        self.task_comment = TaskComment.objects.create(
            content='Test comment content',
            author_email='commenter@test.com',
            task=self.task
        )
        print("✓ Test data setup complete!")

    def test_organizations_query(self):
        """Test fetching all organizations"""
        query = '''
            query {
                organizations {
                    id
                    name
                    slug
                    contactEmail
                }
            }
        '''

        result = self.client.execute(query)

        self.assertNotIn('errors', result)
        self.assertIn('organizations', result['data'])
        self.assertEqual(len(result['data']['organizations']), 1)
        self.assertEqual(result['data']['organizations'][0]['name'], 'Test Organization')
        self.assertEqual(result['data']['organizations'][0]['slug'], 'test-org')
        self.assertEqual(result['data']['organizations'][0]['contactEmail'], 'test@org.com')
        print("✓ Organizations query works!")

    def test_organization_by_slug_query(self):
        """Test fetching organization by slug"""
        query = '''
            query GetOrganizationBySlug($slug: String!) {
                organizationBySlug(slug: $slug) {
                    name
                    contactEmail
                    projectSet {
                        name
                    }
                }
            }
        '''

        variables = {'slug': 'test-org'}
        result = self.client.execute(query, variables=variables)

        self.assertNotIn('errors', result)
        self.assertEqual(result['data']['organizationBySlug']['name'], 'Test Organization')
        self.assertEqual(len(result['data']['organizationBySlug']['projectSet']), 1)
        print("✓ Organization by slug query works!")

    def test_projects_query(self):
        """Test fetching all projects"""
        query = '''
            query {
                projects {
                    id
                    name
                    description
                    organization {
                        name
                        slug
                    }
                }
            }
        '''

        result = self.client.execute(query)

        self.assertNotIn('errors', result)
        self.assertIn('projects', result['data'])
        self.assertEqual(result['data']['projects'][0]['name'], 'Test Project')
        self.assertEqual(result['data']['projects'][0]['description'], 'Project description')
        self.assertEqual(result['data']['projects'][0]['organization']['name'], 'Test Organization')
        print("✓ Projects query works!")

    def test_project_by_id_query(self):
        """Test fetching project by ID"""
        query = '''
            query GetProjectById($id: ID!) {
                projectById(id: $id) {
                    name
                    description
                    taskSet {
                        title
                    }
                }
            }
        '''

        variables = {'id': str(self.project.id)}
        result = self.client.execute(query, variables=variables)

        self.assertNotIn('errors', result)
        self.assertEqual(result['data']['projectById']['name'], 'Test Project')
        self.assertEqual(len(result['data']['projectById']['taskSet']), 1)
        print("✓ Project by ID query works!")

    def test_tasks_query(self):
        """Test fetching all tasks"""
        query = '''
            query {
                tasks {
                    id
                    title
                    description
                    status
                    project {
                        name
                    }
                }
            }
        '''

        result = self.client.execute(query)

        self.assertNotIn('errors', result)
        self.assertIn('tasks', result['data'])
        self.assertEqual(result['data']['tasks'][0]['title'], 'Test Task')
        self.assertEqual(result['data']['tasks'][0]['description'], 'Task description')
        self.assertEqual(result['data']['tasks'][0]['project']['name'], 'Test Project')
        print("✓ Tasks query works!")

    def test_task_comments_query(self):
        """Test fetching task comments with required taskId argument"""
        query = '''
            query GetTaskComments($taskId: ID!) {
                taskComments(taskId: $taskId) {
                    content
                    authorEmail
                    task {
                        title
                    }
                }
            }
        '''

        variables = {'taskId': str(self.task.id)}
        result = self.client.execute(query, variables=variables)

        self.assertNotIn('errors', result)
        self.assertIn('taskComments', result['data'])
        self.assertEqual(result['data']['taskComments'][0]['content'], 'Test comment content')
        self.assertEqual(result['data']['taskComments'][0]['authorEmail'], 'commenter@test.com')
        self.assertEqual(result['data']['taskComments'][0]['task']['title'], 'Test Task')
        print("✓ Task comments query works!")