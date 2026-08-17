PGFix — Apartment & PG Complaint Management System

Project Overview

PGFix is a full-stack web application designed to help residents of apartments and PG accommodations submit, manage, and track complaints related to facilities and maintenance.

Features

- Submit new complaints
- View submitted complaints
- Search complaints
- Filter by status
- Filter by category
- View complaint details
- Edit complaints
- Change complaint status
- Delete complaints
- Form validation
- Responsive user interface
- REST API backend

Technologies Used

Frontend

- HTML
- CSS
- JavaScript
- DOM Manipulation
- Fetch API

Backend

- Node.js
- Express.js
- REST API
- JSON
- In-memory data storage

Complaint Categories

- Water
- Electricity
- Internet
- Maintenance
- Housekeeping
- Other

Complaint Status

- Pending
- In Progress
- Resolved

API Endpoints

Method| Endpoint| Description
GET| "/api/complaints"| Get all complaints
GET| "/api/complaints/:id"| Get a specific complaint
POST| "/api/complaints"| Create a complaint
PUT| "/api/complaints/:id"| Update a complaint
DELETE| "/api/complaints/:id"| Delete a complaint

How to Run

1. Open the backend

cd backend

2. Install dependencies

npm install

3. Start the server

node server.js

The backend runs on:

"http://localhost:5000"

4. Open the frontend

Open "frontend/index.html" using Live Server.

Project Structure

pg-complaint-system/
│
├── backend/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
└── README.md

Future Improvements

- Database integration
- User authentication
- Admin dashboard
- Image upload for complaints
- Email notifications
- Complaint assignment to maintenance staff

Conclusion

PGFix demonstrates a complete basic full-stack CRUD application using HTML, CSS, JavaScript, Node.js and Express.js. The project focuses on working functionality, REST API concepts, input validation, dynamic rendering and responsive design.