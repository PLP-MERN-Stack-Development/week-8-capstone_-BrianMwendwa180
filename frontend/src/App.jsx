import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import BugsList from './pages/BugsList';
import BugDetails from './pages/BugDetails';

function PrivateRoute({ children }) {
  const { user } = React.useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/bugs"
            element={
              <PrivateRoute>
                <BugsList />
              </PrivateRoute>
            }
          />
          <Route
            path="/bugs/:id"
            element={
              <PrivateRoute>
                <BugDetails />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/bugs" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
