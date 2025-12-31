# CarePharma – README

## Overview
CarePharma is a web-based platform for managing pharmaceutical workflows.  
It integrates **Express.js (backend)**, **React (frontend)**, and **MySQL (database)** with secure deployment on **Railway/Render**.  
The system emphasizes **authentication**, **notification delivery**, and **scalable architecture**.

Production link: https://pharmacy-frontend-hsql.onrender.com/

## Tech Stack
- **Frontend:** React  
- **Backend:** Express.js  
- **Database:** MySQL Community Server  
- **Deployment:** Railway / Render  
- **Email Delivery:** Gmail (local dev)  

---

## Environment Variables

### Local Development
Create a `.env` file in your backend folder with:

```env
MYSQLHOST=
MYSQLPORT=
MYSQLUSER=
MYSQLPASSWORD=
MYSQLDATABASE=
```

---

## Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/Rayantrad/Pharmacy-FullStack.git
cd carepharma
```

### 2. Backend setup
```bash
cd backend
npm install
```
- Add `.env` file with database credentials.  
- Start backend:
```bash
npm run dev
```

### 3. Frontend setup
```bash
cd frontend
npm install
npm start
```

### 4. Database setup
- Install **MySQL Community Server**.  
- Create database `pharmacy`.  
- Import schema from `/db/schema.sql`.  
- Verify connection with backend.

---


## 🚀 Deployment
- Deploy backend & frontend separately on **Railway/Render**.  
- Provision a **MySQL service** and copy credentials into environment variables.  
- Update frontend API URLs to point to backend deployment.  

---

## 📧 Email Delivery
- Local development → Gmail SMTP.   
---

## Notes
- Never commit `.env` files to GitHub.  
- Use environment variables directly in Railway/Render dashboards for production.  
- Keep database credentials secure.  

---

# Final Takeaway
CarePharma is designed for **clarity, reliability, and scalability**.  
With proper environment setup, you can run it locally in minutes or deploy seamlessly to production.  

---

# ScreenShots
1. User Registration (Sign Up) Page

<img width="975" height="492" alt="image" src="https://github.com/user-attachments/assets/5a9a0f4c-4598-4e4f-8fd4-831be3434472" />

2. Login Page

<img width="792" height="392" alt="image" src="https://github.com/user-attachments/assets/b802ee7c-d29c-42da-acda-5689de0814dd" />

3. Home Page

<img width="932" height="458" alt="image" src="https://github.com/user-attachments/assets/fc7f9d04-7922-47c1-91ed-6773927a4fc8" />
  
4. Products Page

<img width="750" height="379" alt="image" src="https://github.com/user-attachments/assets/f7307d4f-2adf-433e-af12-b3fa0b10d91f" />

5. Product Details Page

   <img width="733" height="373" alt="image" src="https://github.com/user-attachments/assets/f8d9a14a-4625-4147-a911-891cbbcc20b4" />

6. Cart Page

<img width="805" height="403" alt="image" src="https://github.com/user-attachments/assets/6f8f5c6f-e8ca-4aca-a9f0-83ae0d33dbe0" />

7. Orders / Checkout Page

   <img width="838" height="382" alt="image" src="https://github.com/user-attachments/assets/b6bce4ea-6855-471c-8393-ef5207c7701d" />

8. Admin Dashboard
<img width="866" height="408" alt="image" src="https://github.com/user-attachments/assets/da8de4e9-3feb-4f17-848a-1e8df0f79901" />

9. My Ordes Page

   <img width="1095" height="714" alt="image" src="https://github.com/user-attachments/assets/0fdd4634-a48a-47fc-9528-2f1cc82819ed" />

   
   
