"""
MODELS TESTS - Test our Django models with correct fields
"""
from django.test import TestCase
from core.models import Organization, Project, Task, TaskComment
from django.utils import timezone

class TestModels(TestCase):
    """Test cases for our Django models"""

    def test_organization_creation(self):
        """Test that we can create an Organization"""
        # Create organization with correct fields
        organization = Organization.objects.create(
            name="Test Organization",
            contact_email="test@organization.com"
        )

        # Verify it was created
        self.assertEqual(organization.name, "Test Organization")
        self.assertEqual(organization.contact_email, "test@organization.com")
        self.assertEqual(str(organization), "Test Organization")
        print("✓ Organization created successfully!")

        # Verify it's in database
        self.assertTrue(Organization.objects.filter(name="Test Organization").exists())

    def test_project_creation(self):
        """Test that we can create a Project"""
        # First create organization
        organization = Organization.objects.create(
            name="Test Org",
            contact_email="org@test.com"
        )

        # Create project with correct fields
        project = Project.objects.create(
            name="Test Project",
            description="Project description",
            status="active",
            due_date=timezone.now().date(),
            organization=organization
        )

        # Verify relationships and fields
        self.assertEqual(project.organization, organization)
        self.assertEqual(project.name, "Test Project")
        self.assertEqual(project.description, "Project description")
        self.assertEqual(project.status, "active")
        print("✓ Project created successfully!")

    def test_task_creation(self):
        """Test that we can create a Task"""
        organization = Organization.objects.create(
            name="Test Org",
            contact_email="org@test.com"
        )
        project = Project.objects.create(
            name="Test Project",
            organization=organization
        )

        task = Task.objects.create(
            title="Test Task",
            description="Task description",
            status="todo",
            assignee_email="user@test.com",
            due_date=timezone.now(),
            project=project
        )

        self.assertEqual(task.project, project)
        self.assertEqual(task.title, "Test Task")
        self.assertEqual(task.description, "Task description")
        self.assertEqual(task.status, "todo")
        self.assertEqual(task.assignee_email, "user@test.com")
        print("✓ Task created successfully!")

    def test_task_comment_creation(self):
        """Test that we can create a TaskComment"""
        organization = Organization.objects.create(
            name="Test Org",
            contact_email="org@test.com"
        )
        project = Project.objects.create(
            name="Test Project",
            organization=organization
        )
        task = Task.objects.create(
            title="Test Task",
            project=project
        )

        comment = TaskComment.objects.create(
            content="This is a test comment",
            author_email="commenter@test.com",
            task=task
        )

        self.assertEqual(comment.task, task)
        self.assertEqual(comment.content, "This is a test comment")
        self.assertEqual(comment.author_email, "commenter@test.com")
        print("✓ Task comment created successfully!")