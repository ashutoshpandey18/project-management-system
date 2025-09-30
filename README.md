🚀 ProjectFlow - Modern Project Management System
<div align="center">
https://img.shields.io/badge/ProjectFlow-Management%2520System-blue
https://img.shields.io/badge/Django-4.2-green
https://img.shields.io/badge/React-18-blue
https://img.shields.io/badge/GraphQL-Apollo-orange
https://img.shields.io/badge/TypeScript-Full%2520Coverage-blue
https://img.shields.io/badge/Tests-30%252F30%2520passing-brightgreen

A modern, scalable project management solution built with cutting-edge technologies

Features • Tech Stack • Quick Start • API Docs • Testing

</div>

## 📸 Project Screenshots

### 🧪 Backend Testing Results
<div align="center">

![Backend Testing](.//screenshots/Backend-Test.png)
*Backend Test Results - 30/30 Tests Passing Successfully*

</div>

### 🌐 GraphQL API Interface
<div align="center">

![GraphQL Playground](.//screenshots/graphql-playground.png)
*Interactive GraphQL API Playground - Test Queries & Mutations*

</div>

### 💻 Project Dashboard
<div align="center">

![Project Dashboard](.//screenshots/Project-Dashboard.png)
*Main Dashboard - Overview of All Projects & Tasks*

</div>

### ✅ Task Management
<div align="center">

![Task Management](.//screenshots/TaskManagement.png)
*Task Management Interface - Create & Organize Tasks*

</div>

### 📱 Mobile Responsive
<div align="center">

![Mobile View](.//screenshots//MobileView.png)
*Mobile Responsive Design - Perfect on All Devices*

</div>


📋 Overview
ProjectFlow is a full-stack project management application designed for modern teams. It provides real-time collaboration, intuitive task management, and powerful organization-based workspaces—all wrapped in a beautiful, responsive interface.

🎯 What Problem We Solve
Traditional project management tools are often:

❌ Overcomplicated with unnecessary features

❌ Slow and unresponsive

❌ Difficult to integrate with modern tech stacks

❌ Expensive for small teams

ProjectFlow offers:

✅ Simple yet powerful core features

✅ Lightning-fast GraphQL API

✅ Modern React TypeScript frontend

✅ Completely free and open-source

✅ 30/30 Backend Tests Passing ✅

🛠 Tech Stack
### Backend Excellence
- **Django 4.2** - Robust web framework
- **Graphene-Django** - GraphQL implementation
- **SQLite** - Development database  
- **django-cors-headers** - Cross-origin support
- **API Authentication** - Ready for JWT/Django Auth implementation ✅

Frontend Innovation
React 18 - Modern UI library

TypeScript - Type-safe development

Apollo Client - GraphQL state management

Tailwind CSS - Utility-first styling

Vite - Next-generation build tool

🚀 Quick Start
Prerequisites
Python 3.8+ 🐍

Node.js 16+ ⚡

Modern web browser 🌐

⚡ 5-Minute Setup

1. Clone & Explore

git clone https://github.com/ashutoshpandey18/project-management-system.git
cd project-management-system


2. Backend Setup

cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Setup database
python manage.py migrate

# Run tests (verify everything works)
python manage.py test

# Start development server
python manage.py runserver

🎉 Backend running at: http://localhost:8000


3. Frontend Setup

cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

🎊 Frontend running at: http://localhost:5173

4. Create Your First Data
Visit GraphQL playground: http://localhost:8000/graphql/

mutation {
  createOrganization(
    name: "My Awesome Team"
    slug: "awesome-team"
    contactEmail: "team@awesome.com"
  ) {
    organization {
      id
      name
    }
  }
}


🎨 Features
🏢 Organization Management
Create multiple organizations

Team-based access control

Isolated data per organization

📊 Project Tracking
Project lifecycle management

Progress tracking with completion metrics

Status updates (Active, Completed, On Hold)

Due date tracking

✅ Task Management
Task creation & assignment

Status workflow (TODO → IN_PROGRESS → DONE)

Assignee tracking

Due date management

💬 Collaboration
Task comments

Real-time updates

Team communication

🔍 Advanced Features
Global search across projects & tasks

Status filtering

Responsive design - Works on all devices

Type-safe development with TypeScript

📚 GraphQL API
Explore the API
Visit http://localhost:8000/graphql/ for interactive GraphQL playground.


Key Queries

# Get organization structure
{
  organizations {
    name
    slug
    contactEmail
    projectSet {
      name
      description
      taskSet {
        title
        status
        assigneeEmail
      }
    }
  }
}

# Get specific organization
{
  organizationBySlug(slug: "my-team") {
    name
    projects {
      name
    }
  }
}

Key Mutations

# Complete project creation flow
mutation CreateProjectFlow {
  createOrganization: createOrganization(
    name: "Development Team"
    slug: "dev-team"
    contactEmail: "dev@company.com"
  ) {
    organization {
      id
      name
    }
  }

  createProject: createProject(
    name: "Website Redesign"
    description: "Modern website with improved UX"
    organizationSlug: "dev-team"
  ) {
    project {
      id
      name
    }
  }

  createTask: createTask(
    projectId: "1"
    title: "Design Homepage"
    description: "Create modern homepage design"
    status: "TODO"
  ) {
    task {
      id
      title
    }
  }
}


🏗 Architecture
Backend Structure

backend/
├── core/
│   ├── models.py          # Database models (Organization, Project, Task, TaskComment)
│   ├── schema.py          # GraphQL schema & types
│   └── tests/             # Comprehensive test suite (30 tests)
│       ├── test_models.py
│       ├── test_queries.py
│       ├── test_mutations.py
│       └── test_edge_cases.py
├── config/
│   ├── settings.py        # Django configuration
│   └── tests/
│       └── test_settings.py
└── manage.py


Frontend Structure


frontend/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ProjectDashboard.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectForm.tsx
│   │   └── TaskManagement.tsx
│   ├── graphql/           # Apollo client & queries
│   │   ├── client.ts
│   │   └── queries.ts
│   ├── types/             # TypeScript definitions
│   └── utils/             # Helper functions
├── package.json
└── vite.config.ts


🧪 Testing
Backend Testing

cd backend
python manage.py test

# Or run specific test suites
python manage.py test core.tests.test_models
python manage.py test core.tests.test_queries
python manage.py test core.tests.test_mutations


🎯 Test Coverage
✅ Model Tests - Database models & relationships

✅ GraphQL Queries - All query operations

✅ GraphQL Mutations - Create, update operations

✅ Error Handling - Edge cases & validation

✅ Settings & Configuration - Django setup

Status: 30/30 Tests Passing ✅

Testing Philosophy
We believe in practical testing that actually catches bugs, not just achieving 100% coverage numbers.


Production Considerations
Database: Switch to PostgreSQL

Static Files: Configure CDN or Whitenoise

Caching: Redis for performance

Security: Environment variables for secrets

Monitoring: Logging & error tracking



Environment Setup

# Production environment variables
DEBUG=False
SECRET_KEY=your-production-secret-key
DATABASE_URL=postgresql://user:password@localhost/projectflow
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com



🤝 Contributing
We love contributions! Here's how to help:

Fork the repository

Create a feature branch (git checkout -b amazing-feature)

Commit your changes (git commit -m 'Add amazing feature')

Push to the branch (git push origin amazing-feature)

Open a Pull Request

Development Guidelines
Write clear commit messages

Add tests for new features

Update documentation

Follow existing code style

Ensure all tests pass before submitting

🎯 Roadmap
Coming Soon
🔄 Real-time notifications

📎 File attachments

🔐 User authentication & authorization

📊 Advanced analytics dashboard

📱 Mobile responsive enhancements

Future Vision
🤖 AI-powered task suggestions

🔌 Integration with popular tools (Slack, GitHub)

📈 Advanced reporting & insights

👥 Team performance analytics

🌐 Multi-language support


👨‍💻 Author
Ashutosh Pandey

🙏 Acknowledgments
Django community for excellent documentation

React team for amazing developer experience

GraphQL for flexible API design

All contributors who help improve this project

<div align="center">
⭐ Star this repository if you find it helpful!
Built with ❤️ using modern web technologies

Django • React • GraphQL • TypeScript • Tailwind CSS

⬆ Back to Top

</div>


