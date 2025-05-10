# CareMatrix - Healthcare Management System

CareMatrix is a modern healthcare management system that connects patients and doctors, providing a seamless platform for managing medical records, appointments, and telemedicine services.

## Features

### For Patients
- **Profile Management**: Update personal information, medical history, and contact details
- **Appointment Management**: Schedule and manage appointments with doctors
- **Medical Records**:
  - Track allergies and conditions
  - View and manage prescriptions
  - Maintain surgical history
  - Manage insurance information
- **Telemedicine**: Virtual consultations with healthcare providers

### For Doctors
- **Patient Management**: Access and manage patient records
- **Appointment Scheduling**: Schedule and manage patient appointments
- **Medical Records Management**: 
  - Add and update patient conditions
  - Manage prescriptions
  - Track patient allergies
  - Record surgical history
- **Telemedicine**: Conduct virtual consultations

## Tech Stack

- **Frontend**: React.js with TypeScript
- **UI Components**: Custom CSS with modern design principles
- **State Management**: React Hooks
- **Authentication**: JWT (JSON Web Tokens)
- **API Integration**: RESTful API calls

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (v6 or higher)
- Git

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone [repository-url]
   cd carematrix-ui
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory with the following variables:
   ```
   REACT_APP_API_BASE_URL=http://localhost:8080/api
   REACT_APP_SIGNUP_API_URL=http://localhost:8080/api/auth/signup
   ```

4. **Start the Development Server**
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:3000`

## Project Structure

```
carematrix-ui/
├── src/
│   ├── components/         # React components
│   ├── assets/            # Static assets
│   ├── styles/            # CSS files
│   └── utils/             # Utility functions
├── public/                # Public assets
├── package.json          # Project dependencies
└── README.md            # Project documentation
```

## Key Components

- **PatientDashboard**: Main interface for patients
- **DoctorDashboard**: Main interface for doctors
- **ProfileModal**: Profile management for both patients and doctors
- **Appointment Management**: Scheduling and managing appointments
- **Medical Records**: Managing various medical information
- **Telemedicine**: Virtual consultation interface

## API Integration

The application integrates with a backend API for:
- User authentication
- Profile management
- Appointment scheduling
- Medical records management
- Telemedicine services

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Security

- JWT-based authentication
- Secure API endpoints
- Protected routes
- Secure data transmission

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email [support@carematrix.com] or open an issue in the repository.

## Acknowledgments

- Healthcare professionals for their valuable input
- Open-source community for various tools and libraries
- Contributors and maintainers of the project
