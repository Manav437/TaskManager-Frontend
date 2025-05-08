# 📝 Taskly – Task Manager App

Taskly is a full-stack task management web application built with the **MERN** stack. It allows users to register, log in, manage their profile, and create, complete, or delete tasks. Users can also upload profile pictures and view their personalized task lists.

<img src="https://i.ibb.co/s92MQMbw/995-1x-shots-so.png"/>

## 🚀 Features

- ✅ User Registration and Login (with authentication)
- 👤 Profile Management (name, email, bio, image)
- 📋 Create, Read, Update, and Delete Tasks (CRUD)
- 📌 Mark Tasks as Complete or Incomplete
- 🖼️ Upload and display profile images
- 🔐 JWT Authentication
- 🧾 RESTful API backend
- 🌐 Deployed frontend and backend

## 🛠️ Tech Stack

**Frontend**:  
- React.js  
- Axios  
- Tailwind CSS  

**Backend**:  
- Node.js  
- Express.js  
- MongoDB (Mongoose)  
- Multer (for image uploads)  
- JSON Web Token (JWT)  
- dotenv  

**Deployment**:  
- Render (frontend and backend separately)

## 🧑‍💻 Getting Started

### Installation

#### Backend

```bash
git clone https://github.com/Manav437/TaskManager-Backend
cd taskly/backend
npm install
```

##### Create a .env file in the backend folder
```bash
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

#### Frontend
```bash
cd ../frontend
npm install
```

##### Start frontend
```bash
npm start
```

