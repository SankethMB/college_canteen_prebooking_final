# College Canteen Pre-booking System

## Setup Instructions

### Requirements:
- Node.js and npm
- XAMPP (MySQL)
- React
- Postman (for testing APIs)

### Backend Setup
1. Open terminal in `backend/`
2. Run `npm install express cors dotenv mysql2 jsonwebtoken bcrypt`
3. Create `.env` file as shown in the example
4. Start server: `node server.js`

### Frontend Setup
1. Open terminal in `frontend/`
2. Run `npx create-react-app .` (once)
3. Run `npm install axios react-router-dom qrcode.react`
4. Replace `src/` with provided files
5. Run `npm start`

### MySQL Setup
1. Import `sql/canteen_db.sql` using phpMyAdmin (XAMPP)
2. Ensure DB credentials match `.env`

Now, access:
- `http://localhost:3000/` for frontend
- `http://localhost:5000/` for backend API
