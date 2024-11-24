# User Management System

The **User Management System** is a React-based web application for managing users in an organization. It allows users with higher roles (e.g., Super Admin, Admin) to perform actions such as editing or deleting other users based on a role hierarchy. 

The application demonstrates role-based access control and CRUD functionality with a responsive design.

---

## Features

- **Role-Based Access Control (RBAC):** Actions like edit and delete are allowed based on the user's role and their hierarchical level.
- **CRUD Operations:** 
  - View all users.
  - Edit user details.
  - Delete users from the system.
- **Responsive Design:** Fully functional and visually appealing across all screen sizes.
- **Dynamic Data:** Fetches user data from a mock server.

---

## Technologies Used

- **Frontend:** React.js
- **State Management:** React's useState and useEffect hooks
- **API Integration:** Axios for API calls
- **Styling:** Tailwind CSS
- **Mock Server:** JSON Server for simulating backend APIs

---

## Prerequisites

Before you begin, ensure you have the following installed:

1. [Node.js](https://nodejs.org/) (LTS version recommended)
2. [Git](https://git-scm.com/)
3. Package Manager: npm or yarn (npm comes with Node.js)

---

## Installation and Setup

Follow these steps to clone and run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/<repository-name>.git
cd <repository-name>
