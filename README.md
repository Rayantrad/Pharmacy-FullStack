# CarePharma – README

## Overview
CarePharma is a web-based platform for managing pharmaceutical workflows.  
It integrates **Express.js (backend)**, **React (frontend)**, and **MySQL (database)** with secure deployment on **Railway/Render**.  
The system emphasizes **authentication**, **notification delivery**, and **scalable architecture**.


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

## ⚡ Quick Start (Run in 5 Minutes)

1. **Clone repo & install dependencies**
   ```bash
   git clone https://github.com/<your-username>/carepharma.git
   cd carepharma/backend && npm install
   cd ../frontend && npm install
   ```

2. **Set up database**
   - Install MySQL locally.  
   - Create database `pharmacy`.  
   - Add `.env` file in backend with local DB credentials.

3. **Run backend**
   ```bash
   cd backend
   npm run dev
   ```

4. **Run frontend**
   ```bash
   cd frontend
   npm start
   ```


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
