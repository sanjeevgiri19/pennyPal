
### 1. Overview

**PennyPal** is an elegant, full-stack finance management application designed to help users track expenses, manage budgets, and gain insights into their financial health. Built with simplicity, transparency, and security in mind, PennyPal empowers users to achieve financial clarity and freedom.

---

### 2. Features

- **Expense Tracking:** Keep track of all your expenses in one place with intuitive categorization and tagging.
- **Spending Analytics:** Visualize your spending habits with beautiful charts and gain insights on where your money goes.
- **User Authentication:** Secure login and session management.
- **Dashboard:** Overview of your financial statistics.
- **Responsive UI:** Modern, mobile-friendly interface.
- **Data Security:** Industry-standard security practices for user data.

---

### 3. Tech Stack

#### **Frontend**
- React 19
- Vite
- Apollo Client (GraphQL)
- Tailwind CSS
- Chart.js & react-chartjs-2
- React Router DOM
- Styled Components
- Aceternity UI
- Framer Motion

#### **Backend**
- Node.js (ES Modules)
- Express.js
- Apollo Server (GraphQL)
- MongoDB (via Mongoose)
- Passport.js (with GraphQLLocalStrategy)
- bcryptjs (for password hashing)
- dotenv, helmet, cors, express-session

---

### 4. Architecture

- **Monorepo**: Contains both `frontend` and `backend` directories.
- **Backend**: REST/GraphQL API, authentication, session management, and MongoDB integration.
- **Frontend**: SPA with React, Apollo Client for GraphQL, and modern UI/UX.
- **Authentication**: Passport.js with session-based authentication and secure password hashing.
- **State Management**: Apollo Client cache.

---

### 5. Getting Started

#### **Clone the repository**
```bash
git clone <your-repo-url>
cd pennypal
```

#### **Install dependencies**
```bash
npm install
cd frontend
npm install
cd ..
```

#### **Set up environment variables**
Create a `.env` file in the root directory (see [Environment Variables](#environment-variables)).

#### **Run the application**
- **Development (backend + frontend):**
  ```bash
  npm run dev
  ```
  This will start the backend server (with nodemon) and you can run the frontend separately:
  ```bash
  cd frontend
  npm run dev
  ```
  The frontend will be available at [http://localhost:3000](http://localhost:3000) and the backend GraphQL API at [http://localhost:9000/graphql](http://localhost:9000/graphql).

- **Production build:**
  ```bash
  npm run build
  npm start
  ```

---

### 6. Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=9000
MONGODB_URI=mongodb://localhost:27017/pennypal
SESSION_SECRET=your_session_secret
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development
```

- `PORT`: Port for the backend server (default: 9000)
- `MONGODB_URI`: MongoDB connection string
- `SESSION_SECRET`: Secret for session encryption
- `CORS_ORIGIN`: Allowed frontend origin
- `NODE_ENV`: `development` or `production`

---

### 7. Scripts

**At project root:**
- `npm run dev` — Start backend in development mode
- `npm run build` — Install dependencies and build frontend
- `npm start` — Start backend in production mode

**In `/frontend`:**
- `npm run dev` — Start frontend in development mode
- `npm run build` — Build frontend for production
- `npm run preview` — Preview production build

---

### 8. Folder Structure

```
pennypal/
  backend/
    db/
    models/
    passport/
    resolvers/
    typeDefs/
    index.js
    read.md
  frontend/
    public/
    src/
      components/
      graphql/
      pages/
      App.jsx
      main.jsx
    index.html
    package.json
    README.md
  package.json
  package-lock.json
  .gitignore
```

---

### 9. Contributing

Contributions are welcome! Please open issues and submit pull requests for new features, bug fixes, or improvements.

---

### 10. License

This project is licensed under the ISC License.

---

