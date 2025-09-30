"""
STATUS DEBUG - Check what status values are available
"""
from django.test import TestCase
from graphene.test import Client
from core.schema import schema
from core.models import Organization, Project, Task

class TestStatusDebug(TestCase):
    """Debug status enum values"""

    def test_available_status_values(self):
        """Check what status values are available"""
        query = '''
            query {
                __type(name: "CoreTaskStatusChoices") {
                    name
                    enumValues {
                        name
                    }
                }
            }
        '''

        client = Client(schema)
        result = client.execute(query)

        print("=== AVAILABLE TASK STATUS VALUES ===")
        if 'data' in result and result['data']['__type']:
            enum_values = result['data']['__type']['enumValues']
            for value in enum_values:
                print(f"  • {value['name']}")
        else:
            print("❌ Could not fetch status enum values")
            print("Result:", result)

    def test_create_task_with_different_statuses(self):
        """Test creating tasks with different status values"""
        organization = Organization.objects.create(
            name="Test Org",
            slug="test-org",
            contact_email="test@org.com"
        )
        project = Project.objects.create(
            name="Test Project",
            organization=organization
        )

        # Test creating task with TODO status
        task = Task.objects.create(
            title="Test Task",
            project=project,  # Added required project
            status="TODO"
        )

        print(f"Created task with status: {task.status}")
        print("✓ Task created with TODO status!")

        # Test creating task with IN_PROGRESS status
        task2 = Task.objects.create(
            title="Test Task 2",
            project=project,
            status="IN_PROGRESS"
        )

        print(f"Created task with status: {task2.status}")
        print("✓ Task created with IN_PROGRESS status!")

        # Test creating task with DONE status
        task3 = Task.objects.create(
            title="Test Task 3",
            project=project,
            status="DONE"
        )

        print(f"Created task with status: {task3.status}")
        print("✓ Task created with DONE status!")