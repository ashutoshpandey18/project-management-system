import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from django.db.models import Q
from .models import Organization, Project, Task, TaskComment

# Common Types (donos schemas ke liye)
class OrganizationType(DjangoObjectType):
    class Meta:
        model = Organization
        fields = "__all__"

class TaskCommentType(DjangoObjectType):
    class Meta:
        model = TaskComment
        fields = "__all__"

class TaskType(DjangoObjectType):
    class Meta:
        model = Task
        fields = "__all__"

class ProjectType(DjangoObjectType):
    task_count = graphene.Int()
    completed_tasks = graphene.Int()
    completion_rate = graphene.Float()

    def resolve_task_count(self, info):
        return self.task_set.count()

    def resolve_completed_tasks(self, info):
        return self.task_set.filter(status='DONE').count()

    def resolve_completion_rate(self, info):
        total = self.task_set.count()
        completed = self.task_set.filter(status='DONE').count()
        return round((completed / total) * 100, 2) if total > 0 else 0

    class Meta:
        model = Project
        fields = "__all__"

# COMMON QUERY (donos schemas ke liye)
class Query(graphene.ObjectType):
    # Organizations
    organizations = graphene.List(OrganizationType)
    organization_by_slug = graphene.Field(OrganizationType, slug=graphene.String(required=True))

    # Projects
    projects = graphene.List(ProjectType, organization_slug=graphene.String())
    project_by_id = graphene.Field(ProjectType, id=graphene.ID(required=True))

    # Tasks
    tasks = graphene.List(TaskType, project_id=graphene.ID())
    task_by_id = graphene.Field(TaskType, id=graphene.ID(required=True))

    # Task Comments
    task_comments = graphene.List(TaskCommentType, task_id=graphene.ID(required=True))

    def resolve_organizations(self, info):
        return Organization.objects.all()

    def resolve_organization_by_slug(self, info, slug):
        try:
            return Organization.objects.get(slug=slug)
        except Organization.DoesNotExist:
            return None

    def resolve_projects(self, info, organization_slug=None):
        if organization_slug:
            return Project.objects.filter(organization__slug=organization_slug)
        return Project.objects.all()

    def resolve_project_by_id(self, info, id):
        try:
            return Project.objects.get(id=id)
        except Project.DoesNotExist:
            return None

    def resolve_tasks(self, info, project_id=None):
        if project_id:
            return Task.objects.filter(project_id=project_id)
        return Task.objects.all()

    def resolve_task_by_id(self, info, id):
        try:
            return Task.objects.get(id=id)
        except Task.DoesNotExist:
            return None

    def resolve_task_comments(self, info, task_id):
        return TaskComment.objects.filter(task_id=task_id)

# COMMON MUTATIONS (donos schemas ke liye)
class CreateOrganization(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        slug = graphene.String(required=True)
        contact_email = graphene.String(required=True)

    organization = graphene.Field(OrganizationType)

    def mutate(self, info, name, slug, contact_email):
        organization = Organization(
            name=name,
            slug=slug,
            contact_email=contact_email
        )
        organization.save()
        return CreateOrganization(organization=organization)

class CreateProject(graphene.Mutation):
    class Arguments:
        organization_slug = graphene.String(required=True)
        name = graphene.String(required=True)
        description = graphene.String()
        status = graphene.String()
        due_date = graphene.String()

    project = graphene.Field(ProjectType)

    def mutate(self, info, organization_slug, name, description="", status="ACTIVE", due_date=None):
        try:
            organization = Organization.objects.get(slug=organization_slug)
        except Organization.DoesNotExist:
            raise GraphQLError("Organization not found")

        project = Project(
            organization=organization,
            name=name,
            description=description,
            status=status,
            due_date=due_date
        )
        project.save()
        return CreateProject(project=project)

class UpdateProject(graphene.Mutation):
    class Arguments:
        project_id = graphene.ID(required=True)
        name = graphene.String()
        description = graphene.String()
        status = graphene.String()
        due_date = graphene.String()

    project = graphene.Field(ProjectType)

    def mutate(self, info, project_id, name=None, description=None, status=None, due_date=None):
        try:
            project = Project.objects.get(id=project_id)
        except Project.DoesNotExist:
            raise GraphQLError("Project not found")

        if name is not None:
            project.name = name
        if description is not None:
            project.description = description
        if status is not None:
            project.status = status
        if due_date is not None:
            project.due_date = due_date

        project.save()
        return UpdateProject(project=project)

# MOCK-ONLY MUTATIONS (sirf mock data ke liye)
class CreateTask(graphene.Mutation):
    class Arguments:
        project_id = graphene.ID(required=True)
        title = graphene.String(required=True)
        description = graphene.String()
        status = graphene.String()
        assignee_email = graphene.String()
        due_date = graphene.String()

    task = graphene.Field(TaskType)

    def mutate(self, info, project_id, title, description="", status="TODO", assignee_email="", due_date=None):
        try:
            project = Project.objects.get(id=project_id)
        except Project.DoesNotExist:
            raise GraphQLError("Project not found")

        task = Task(
            project=project,
            title=title,
            description=description,
            status=status,
            assignee_email=assignee_email,
            due_date=due_date
        )
        task.save()
        return CreateTask(task=task)

class UpdateTaskStatus(graphene.Mutation):
    class Arguments:
        task_id = graphene.ID(required=True)
        status = graphene.String(required=True)

    task = graphene.Field(TaskType)

    def mutate(self, info, task_id, status):
        try:
            task = Task.objects.get(id=task_id)
        except Task.DoesNotExist:
            raise GraphQLError("Task not found")

        task.status = status
        task.save()
        return UpdateTaskStatus(task=task)

class AddTaskComment(graphene.Mutation):
    class Arguments:
        task_id = graphene.ID(required=True)
        content = graphene.String(required=True)
        author_email = graphene.String(required=True)

    comment = graphene.Field(TaskCommentType)

    def mutate(self, info, task_id, content, author_email):
        try:
            task = Task.objects.get(id=task_id)
        except Task.DoesNotExist:
            raise GraphQLError("Task not found")

        comment = TaskComment(
            task=task,
            content=content,
            author_email=author_email
        )
        comment.save()
        return AddTaskComment(comment=comment)

# SCHEMA SELECTION - Yahan choose karo konsa schema use karna hai
USE_MOCK_SCHEMA = True  # True = Mock Schema, False = Live Schema

if USE_MOCK_SCHEMA:
    # MOCK SCHEMA (Full features)
    class Mutation(graphene.ObjectType):
        create_organization = CreateOrganization.Field()
        create_project = CreateProject.Field()
        update_project = UpdateProject.Field()
        create_task = CreateTask.Field()
        update_task_status = UpdateTaskStatus.Field()
        add_task_comment = AddTaskComment.Field()

    schema = graphene.Schema(query=Query, mutation=Mutation)
    print("✅ Using MOCK SCHEMA - All features available")

else:
    # LIVE SCHEMA (Basic features only)
    class Mutation(graphene.ObjectType):
        create_organization = CreateOrganization.Field()
        create_project = CreateProject.Field()
        update_project = UpdateProject.Field()

    schema = graphene.Schema(query=Query, mutation=Mutation)
    print("✅ Using LIVE SCHEMA - Basic features only")